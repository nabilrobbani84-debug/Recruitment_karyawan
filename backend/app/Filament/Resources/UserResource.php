<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin \App\Models\User
 */
class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'role' => $this->role->value, // Mengambil nilai dari Enum
            'created_at' => $this->created_at->toDateTimeString(),

            // Secara kondisional menyertakan relasi jika sudah dimuat (eager-loaded)
            // Ini sangat efisien dan cocok dengan kode di AuthController Anda.
            'profile' => new ProfileResource($this->whenLoaded('profile')),
            'company' => new CompanyResource($this->whenLoaded('company')),
        ];
    }
}
