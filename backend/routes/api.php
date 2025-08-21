<?php

use Illuminate\Support\Facades\Route;
// PERBAIKAN: Semua namespace controller diperbarui untuk menunjuk ke direktori Api/V1
use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\JobController;
use App\Http\Controllers\Api\V1\CompanyController;
use App\Http\Controllers\Api\V1\CandidateDashboardController;
use App\Http\Controllers\Api\V1\EmployerDashboardController;
use App\Http\Controllers\Api\V1\ApplicationController;
use App\Http\Controllers\Api\V1\ProfileController;
// DITAMBAHKAN: Menambahkan BlogController yang belum terhubung
use App\Http\Controllers\Api\V1\BlogController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Public Routes
Route::prefix('v1')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

    Route::get('/jobs', [JobController::class, 'index']);
    Route::get('/jobs/{job:slug}', [JobController::class, 'show']);
    
    Route::get('/companies', [CompanyController::class, 'index']);
    Route::get('/companies/{company:slug}', [CompanyController::class, 'show']);
    
    // Route untuk Blog
    Route::get('/blogs', [BlogController::class, 'index']);
    Route::get('/blogs/{blog:slug}', [BlogController::class, 'show']);
});

// Authenticated Routes
Route::prefix('v1')->middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    // Candidate Specific Routes
    Route::prefix('candidate')->middleware('role:candidate')->group(function () {
        Route::get('/dashboard/applications', [CandidateDashboardController::class, 'applications']);
        Route::get('/dashboard/saved-jobs', [CandidateDashboardController::class, 'savedJobs']);
        Route::get('/profile', [ProfileController::class, 'show']);
        Route::post('/profile', [ProfileController::class, 'update']); // Menggunakan POST untuk kemudahan upload file
    });
    
    // Employer Specific Routes
    Route::prefix('employer')->middleware('role:employer')->group(function () {
        Route::apiResource('dashboard/jobs', EmployerDashboardController::class);
        Route::get('dashboard/jobs/{job}/applicants', [EmployerDashboardController::class, 'applicants']);

        // DITAMBAHKAN: Rute untuk mengelola profil perusahaan
        Route::post('/company', [CompanyController::class, 'store']);
        Route::post('/company/{company}', [CompanyController::class, 'update']); // Menggunakan POST untuk kemudahan upload file
        Route::delete('/company/{company}', [CompanyController::class, 'destroy']);
    });

    // General Authenticated Actions for Applications
    Route::post('/jobs/{job}/apply', [ApplicationController::class, 'store'])->middleware('role:candidate');
    Route::get('/applications/{application}', [ApplicationController::class, 'show']);
    Route::put('/applications/{application}', [ApplicationController::class, 'update']);
    Route::delete('/applications/{application}', [ApplicationController::class, 'destroy']);

    // DITAMBAHKAN: Admin-only routes for managing blog posts
    Route::prefix('admin')->middleware('role:admin')->group(function () {
        Route::post('/blogs', [BlogController::class, 'store']);
        Route::post('/blogs/{blog}', [BlogController::class, 'update']); // Menggunakan POST untuk file upload
        Route::delete('/blogs/{blog}', [BlogController::class, 'destroy']);
    });
});
