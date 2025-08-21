<?php
// app/Http/Controllers/Api/V1/CandidateDashboardController.php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use App\Models\Application;
use App\Models\User;
use App\Http\Resources\V1\ApplicationResource;
use App\Http\Resources\V1\JobResource;

class CandidateDashboardController
{
    /**
     * Mengambil daftar semua lamaran pekerjaan yang telah dikirim oleh kandidat.
     */
    public function applications(Request $request)
    {
        /** @var User $candidate */
        $candidate = Auth::user();

        // Diubah dari ->candidateProfile menjadi ->profile
        if (!$candidate->profile) {
            return response()->json(['message' => 'Hanya kandidat yang dapat mengakses halaman ini.'], 403);
        }

        // Diubah dari ->candidateProfile menjadi ->profile
        $applications = Application::where('candidate_id', $candidate->profile->id)
            ->with(['job.company'])
            ->latest()
            ->paginate(10);

        return ApplicationResource::collection($applications);
    }

    /**
     * Mengambil daftar pekerjaan yang disimpan oleh kandidat.
     */
    public function savedJobs(Request $request)
    {
        /** @var User $candidate */
        $candidate = Auth::user();

        if (method_exists($candidate, 'savedJobs')) {
            $savedJobs = $candidate->savedJobs()->with('company')->latest()->paginate(10);
            return JobResource::collection($savedJobs);
        }

        return response()->json(['message' => 'Fitur pekerjaan tersimpan tidak aktif.'], 404);
    }

    /**
     * Mengambil ringkasan data untuk tampilan utama dashboard.
     */
    public function summary(Request $request): JsonResponse
    {
        /** @var User $candidate */
        $candidate = Auth::user();

        // Diubah dari ->candidateProfile menjadi ->profile
        if (!$candidate->profile) {
            return response()->json(['message' => 'Hanya kandidat yang dapat mengakses halaman ini.'], 403);
        }

        // Diubah dari ->candidateProfile menjadi ->profile
        $candidateProfileId = $candidate->profile->id;

        $totalApplications = Application::where('candidate_id', $candidateProfileId)->count();
        $interviewInvites = Application::where('candidate_id', $candidateProfileId)->where('status', 'interview')->count();
        $savedJobsCount = method_exists($candidate, 'savedJobs') ? $candidate->savedJobs()->count() : 0;

        return response()->json([
            'data' => [
                'total_applications' => $totalApplications,
                'interview_invites' => $interviewInvites,
                'saved_jobs' => $savedJobsCount,
            ]
        ]);
    }
}