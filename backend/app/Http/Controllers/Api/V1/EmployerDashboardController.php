<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Job;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\V1\JobResource;
use App\Http\Resources\V1\ApplicationResource;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests; // Ensure this is included

class EmployerDashboardController
{
    use AuthorizesRequests; // Add this trait for authorization functionality

    /**
     * Menampilkan daftar lowongan yang dimiliki oleh employer yang sedang login.
     */
    public function index(Request $request)
    {
        /** @var User $employer */
        $employer = Auth::user();
        $company = $employer->company;

        if (!$company) {
            return response()->json(['message' => 'Anda harus membuat profil perusahaan terlebih dahulu.'], 403);
        }

        $jobs = $company->jobs()
            ->withCount('applications')
            ->latest()
            ->paginate(10);

        return JobResource::collection($jobs);
    }

    /**
     * Menyimpan lowongan pekerjaan baru.
     */
    public function store(Request $request): JsonResponse
    {
        /** @var User $employer */
        $employer = Auth::user();
        $company = $employer->company;

        if (!$company) {
            return response()->json(['message' => 'Anda harus membuat profil perusahaan terlebih dahulu.'], 403);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'description' => 'required|string',
            'location' => 'required|string|max:255',
            'type' => 'required|string|in:Full-time,Part-time,Contract,Internship',
            'salary_range' => 'nullable|string|max:255',
            'skills' => 'nullable|array',
            'skills.*' => 'exists:skills,id',
        ]);

        $validated['company_id'] = $company->id;
        $validated['slug'] = Str::slug($validated['title'] . '-' . uniqid());

        $job = Job::create($validated);

        if (!empty($validated['skills'])) {
            $job->skills()->sync($validated['skills']);
        }

        return response()->json([
            'message' => 'Lowongan berhasil dipublikasikan!',
            'data' => new JobResource($job)
        ], 201);
    }

    /**
     * Menampilkan detail satu lowongan, termasuk daftar pelamarnya.
     * @param Job $job
     * @return JsonResponse
     */
    public function show(Job $job): JsonResponse
    {
        $this->authorize('view', $job); // This requires proper authorization policy for 'view'

        // Eager load relasi untuk mencegah N+1 query problem
        $job->load(['applications.candidate.user', 'applications.candidate.profile']);

        return response()->json([
            'job' => new JobResource($job),
            'applications' => ApplicationResource::collection($job->applications)
        ]);
    }

    /**
     * Mengupdate data lowongan pekerjaan.
     */
    public function update(Request $request, Job $job): JsonResponse
    {
        $this->authorize('update', $job);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'description' => 'required|string',
            'location' => 'required|string|max:255',
            'type' => 'required|string|in:Full-time,Part-time,Contract,Internship',
            'salary_range' => 'nullable|string|max:255',
            'is_active' => 'sometimes|boolean',
            'skills' => 'nullable|array',
            'skills.*' => 'exists:skills,id',
        ]);

        $job->update($validated);

        if (isset($validated['skills'])) {
            $job->skills()->sync($validated['skills']);
        }

        return response()->json([
            'message' => 'Lowongan berhasil diperbarui!',
            'data' => new JobResource($job->fresh()->load('skills', 'category'))
        ]);
    }

    /**
     * Menghapus lowongan pekerjaan.
     */
    public function destroy(Job $job): JsonResponse
    {
        $this->authorize('delete', $job);
        $job->delete();
        return response()->json(['message' => 'Lowongan berhasil dihapus.'], 200);
    }
}
