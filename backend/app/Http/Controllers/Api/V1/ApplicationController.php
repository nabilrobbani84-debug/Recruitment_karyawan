<?php

namespace App\Http\Controllers\Api\V1;

use App\Enums\ApplicationStatus;
use App\Http\Controllers\Controller; // Pastikan use statement ini ada
use App\Http\Resources\V1\ApplicationResource;
use App\Models\Application;
use App\Models\Job;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

// --- PERBAIKAN UTAMA DI SINI ---
// Tambahkan "extends Controller" untuk mewarisi fungsionalitas dasar Laravel,
// termasuk metode authorize().
class ApplicationController extends Controller
{
    /**
     * Menampilkan daftar lamaran.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $query = Application::query();

        // Gunakan Policy untuk otorisasi
        $this->authorize('viewAny', Application::class);

        if ($user->role === 'candidate' && $user->candidate) {
            $query->where('candidate_id', $user->candidate->id)->with('job.company');
        } elseif ($user->role === 'employer' && $user->company) {
            $jobIds = $user->company->jobs()->pluck('id');
            $query->whereIn('job_id', $jobIds)->with(['candidate.user', 'job']);
        }

        $applications = $query->latest()->paginate(10);
        return ApplicationResource::collection($applications);
    }

    /**
     * Menyimpan lamaran pekerjaan baru.
     */
    public function store(Request $request, Job $job)
    {
        $user = $request->user();
        $this->authorize('apply', $job); // Gunakan JobPolicy

        $request->validate([
            'cover_letter' => 'required|string|min:50',
            'resume' => 'nullable|file|mimes:pdf,doc,docx|max:2048',
        ]);

        if ($user->candidate->applications()->where('job_id', $job->id)->exists()) {
            return response()->json(['message' => 'Anda sudah pernah melamar di pekerjaan ini.'], 409);
        }
        
        // Asumsi resume ada di CandidateProfile
        $resumePath = $user->candidate->profile->resume_path ?? null;

        if ($request->hasFile('resume')) {
            if ($resumePath) {
                Storage::disk('public')->delete($resumePath);
            }
            $resumePath = $request->file('resume')->store("resumes/{$user->candidate->id}", 'public');
            $user->candidate->profile()->update(['resume_path' => $resumePath]);
        }

        if (!$resumePath) {
            return response()->json(['message' => 'Resume tidak ditemukan. Harap unggah resume.'], 422);
        }

        $application = Application::create([
            'job_id' => $job->id,
            'candidate_id' => $user->candidate->id,
            'cover_letter' => $request->input('cover_letter'),
            'resume_path' => $resumePath,
            'status' => ApplicationStatus::PENDING,
        ]);

        return new ApplicationResource($application->load(['job.company', 'candidate.user']));
    }

    /**
     * Menampilkan detail satu lamaran.
     */
    public function show(Application $application)
    {
        $this->authorize('view', $application);
        return new ApplicationResource($application->load(['job.company', 'candidate.user', 'candidate.profile']));
    }

    /**
     * Memperbarui status lamaran (hanya untuk employer).
     */
    public function update(Request $request, Application $application)
    {
        $this->authorize('update', $application);

        $validated = $request->validate([
            'status' => ['required', Rule::enum(ApplicationStatus::class)],
        ]);

        $application->update($validated);
        
        return new ApplicationResource($application);
    }

    /**
     * Menarik (menghapus) lamaran (hanya untuk kandidat).
     */
    public function destroy(Application $application)
    {
        $this->authorize('delete', $application);
        $application->delete();
        return response()->noContent();
    }
}
