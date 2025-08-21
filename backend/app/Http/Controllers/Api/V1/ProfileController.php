<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\ProfileResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ProfileController 
{
    /**
     * Menampilkan profil milik pengguna yang sedang login.
     */
    public function show(Request $request)
    {
        /** @var User $user */
        $user = Auth::user();

        // Load relasi yang dibutuhkan
        $user->load(['profile.skills', 'profile.experiences', 'profile.educations']);

        return new ProfileResource($user);
    }

    /**
     * Membuat atau Mengupdate profil pengguna yang sedang login.
     */
    public function store(Request $request)
    {
        /** @var User $user */
        $user = Auth::user();

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users,email,' . $user->id,
            'headline' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'bio' => 'nullable|string',
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'skills' => 'nullable|array',
            'skills.*' => 'integer|exists:skills,id',
            'experiences' => 'nullable|array',
            'experiences.*.title' => 'required_with:experiences|string|max:255',
            'experiences.*.company' => 'required_with:experiences|string|max:255',
            'experiences.*.start_date' => 'required_with:experiences|date',
            'experiences.*.end_date' => 'nullable|date|after_or_equal:experiences.*.start_date',
            'educations' => 'nullable|array',
            'educations.*.school' => 'required_with:educations|string|max:255',
            'educations.*.degree' => 'required_with:educations|string|max:255',
            'educations.*.end_date' => 'required_with:educations|date',
        ]);

        DB::transaction(function () use ($user, $request, $validatedData) {
            // 1. Update data user
            $user->update($request->only('name', 'email'));

            // 2. Update atau buat profil
            $profileData = $request->only(['headline', 'location', 'bio']);
            if ($request->hasFile('avatar')) {
                // Hapus avatar lama jika ada
                if ($user->profile && $user->profile->avatar) {
                    Storage::disk('public')->delete($user->profile->avatar);
                }
                $profileData['avatar'] = $request->file('avatar')->store('avatars', 'public');
            }
            $profile = $user->profile()->updateOrCreate([], $profileData);

            // 3. Update relasi
            if (isset($validatedData['skills'])) {
                $profile->skills()->sync($validatedData['skills']);
            }
            if (isset($validatedData['experiences'])) {
                $profile->experiences()->delete();
                $profile->experiences()->createMany($validatedData['experiences']);
            }
            if (isset($validatedData['educations'])) {
                $profile->educations()->delete();
                $profile->educations()->createMany($validatedData['educations']);
            }
        });

        // Ambil kembali data lengkap setelah diupdate
        $user->load(['profile.skills', 'profile.experiences', 'profile.educations']);

        return response()->json([
            'message' => 'Profile updated successfully!',
            'data' => new ProfileResource($user)
        ]);
    }
}
