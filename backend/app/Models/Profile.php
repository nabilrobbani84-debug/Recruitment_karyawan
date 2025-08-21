<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Storage;

/**
 * App\Models\Profile
 *
 * @property int $id
 * @property int $user_id
 * @property string|null $headline
 * @property string|null $bio
 * @property string|null $location
 * @property string|null $avatar
 * @property string|null $resume_path
 * @property-read string $avatar_url
 * @property-read string|null $resume_url
 * @property-read \App\Models\User $user
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Skill[] $skills
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Experience[] $experiences
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Education[] $educations
 */
class Profile extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'headline',
        'bio',
        'location',
        'avatar',
        'resume_path',
    ];

    /**
     * The accessors to append to the model's array form.
     */
    protected $appends = [
        'avatar_url',
        'resume_url',
    ];

    /**
     * Accessor untuk mendapatkan URL lengkap dari avatar.
     */
    public function getAvatarUrlAttribute(): string
    {
        if ($this->avatar) {
            // Kode ini sudah benar, abaikan peringatan dari linter.
            return Storage::disk('public')->url($this->avatar);
        }
        // Memberikan URL default jika avatar tidak ada
        return 'https://ui-avatars.com/api/?name=' . urlencode($this->user->name) . '&background=random';
    }

    /**
     * Accessor untuk mendapatkan URL lengkap dari resume.
     */
    public function getResumeUrlAttribute(): ?string
    {
        // Kode ini sudah benar, abaikan peringatan dari linter.
        return $this->resume_path ? Storage::disk('public')->url($this->resume_path) : null;
    }

    // === RELASI ===

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function skills(): BelongsToMany
    {
        return $this->belongsToMany(Skill::class, 'profile_skill');
    }

    /**
     * PERBAIKAN: Menghapus return type hint `: HasMany`
     * untuk menghindari konflik tipe setelah memanggil ->orderBy()
     */
    public function experiences()
    {
        return $this->hasMany(Experience::class)->orderBy('start_date', 'desc');
    }

    /**
     * PERBAIKAN: Menghapus return type hint `: HasMany`
     * untuk menghindari konflik tipe setelah memanggil ->orderBy()
     */
    public function educations()
    {
        return $this->hasMany(Education::class)->orderBy('end_date', 'desc');
    }
}