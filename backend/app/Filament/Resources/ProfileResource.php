<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\User; // Pastikan untuk mengimpor model User

/**
 * @mixin User
 */
class ProfileResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // Resource ini menerima objek User yang sudah di-load dengan relasinya
        return [
            'user' => [
                'id' => $this->id,
                'name' => $this->name,
                'email' => $this->email,
                'role' => $this->role,
            ],
            // Tidak ada perubahan di sini, ini sudah benar
            'profile' => $this->whenLoaded('profile', function () {
                return [
                    'headline' => $this->profile->headline,
                    'bio' => $this->profile->bio,
                    'location' => $this->profile->location,
                    'avatar_url' => $this->profile->avatar_url,
                    'resume_url' => $this->profile->resume_url,
                    // Koreksi kecil: Akses relasi dari $this->profile, bukan $this
                    'skills' => SkillResource::collection($this->profile->whenLoaded('skills')),
                    'experiences' => ExperienceResource::collection($this->profile->whenLoaded('experiences')),
                    'educations' => EducationResource::collection($this->profile->whenLoaded('educations')),
                ];
            }),
        ];
    }
}