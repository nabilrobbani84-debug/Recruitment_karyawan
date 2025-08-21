<?php

namespace App\Http\Controllers\Api\V1;

use App\Enums\UserRole;
use App\Http\Controllers\Controller;
use App\Http\Resources\V1\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class AuthController 
{
    /**
     * Mendaftarkan pengguna baru (kandidat atau employer).
     */
    public function register(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'role' => ['required', Rule::enum(UserRole::class)->except(UserRole::ADMIN)],
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'],
        ]);

        // Secara otomatis membuat profil atau perusahaan kosong terkait
        if ($user->role === UserRole::CANDIDATE) {
            $user->profile()->create();
        } elseif ($user->role === UserRole::EMPLOYER) {
            // Untuk company, mungkin memerlukan data tambahan,
            // tapi untuk sekarang kita buat entri kosong yang bisa diupdate nanti.
            $user->company()->create([
                'name' => $user->name . ' Company', // Nama default
                'slug' => str()->slug($user->name . ' Company ' . uniqid()), // Slug unik default
            ]);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Registrasi berhasil.',
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => new UserResource($user),
        ], 201);
    }

    /**
     * Mengautentikasi pengguna dan mengembalikan token.
     */
    public function login(Request $request): JsonResponse
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]); 

        if (!Auth::attempt($request->only('email', 'password'))) {
            throw ValidationException::withMessages([
                'email' => ['Email atau password salah.'],
            ]);
        }

        $user = User::where('email', $request['email'])->firstOrFail();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message' => 'Login berhasil.',
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => new UserResource($user->load(['profile', 'company'])),
        ]);
    }

    /**
     * Mengambil data pengguna yang sedang terautentikasi.
     */
    public function user(Request $request): UserResource
    {
        // Memuat relasi berdasarkan role pengguna
        $user = $request->user();
        if ($user->role === UserRole::CANDIDATE) {
            $user->load('profile');
        } elseif ($user->role === UserRole::EMPLOYER) {
            $user->load('company');
        }
        
        return new UserResource($user);
    }

    /**
     * Logout pengguna (mencabut token saat ini).
     */
    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logout berhasil.']);
    }
}
