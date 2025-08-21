<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\JobController;
use App\Http\Controllers\CandidateController;
use App\Http\Controllers\InterviewController;

Route::get('/', function () {
    return view('welcome');
});
Route::resource('jobs', JobController::class);
Route::resource('candidates', CandidateController::class);
Route::resource('interviews', InterviewController::class);