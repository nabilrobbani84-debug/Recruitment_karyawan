<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Job;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\V1\JobResource;

class JobController 
{
    /**
     * Menampilkan daftar semua lowongan pekerjaan yang aktif.
     */
    public function index(Request $request)
    {
        $jobs = Job::query()
            ->where('is_active', true)
            ->with(['company', 'category', 'skills'])
            ->when($request->query('search'), function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('title', 'like', "%{$search}%")
                      ->orWhere('description', 'like', "%{$search}%");
                });
            })
            ->when($request->query('category'), function ($query, $categorySlug) {
                $query->whereHas('category', fn ($q) => $q->where('slug', $categorySlug));
            })
            ->when($request->query('location'), function ($query, $location) {
                $query->where('location', 'like', "%{$location}%");
            })
            ->when($request->query('type'), function ($query, $type) {
                $query->where('type', $type);
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return JobResource::collection($jobs);
    }

    /**
     * Menampilkan detail satu lowongan pekerjaan.
     */
    public function show(Job $job)
    {
        // PERBAIKAN: Dengan PHPDoc di model Job, error 'Undefined property' akan hilang.
        if (!$job->is_active) {
            return response()->json(['message' => 'Job not found.'], 404);
        }

        $job->load(['company', 'category', 'skills']);

        $relatedJobs = Job::where('company_id', $job->company_id)
            ->where('id', '!=', $job->id)
            ->where('is_active', true)
            ->inRandomOrder()
            ->limit(3)
            ->get();

        return response()->json([
            'data' => new JobResource($job),
            'related_jobs' => JobResource::collection($relatedJobs)
        ]);
    }

    // Metode store, update, destroy sengaja tidak diimplementasikan di sini
    // karena sudah ditangani oleh EmployerDashboardController untuk keamanan.
    // Mengembalikan 403 Forbidden adalah pendekatan yang benar.

    public function store(Request $request)
    {
        return response()->json(['message' => 'Not Authorized'], 403);
    }

    public function update(Request $request, string $id)
    {
        return response()->json(['message' => 'Not Authorized'], 403);
    }

    public function destroy(string $id)
    {
        return response()->json(['message' => 'Not Authorized'], 403);
    }
}
