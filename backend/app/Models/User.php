<?php

// File: app/Models/User.php

namespace App\Models;

use App\Enums\UserRole;
use Filament\Models\Contracts\FilamentUser;
use Filament\Panel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements FilamentUser
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * Atribut yang dapat diisi secara massal.
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
    ];

    /**
     * Atribut yang harus disembunyikan saat serialisasi.
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Atribut yang harus di-cast ke tipe data tertentu.
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'role' => UserRole::class, // Otomatis cast ke dan dari Enum
    ];
    
    /**
     * Hanya user dengan role 'admin' yang bisa mengakses Filament Panel.
     */
    public function canAccessPanel(Panel $panel): bool
    {
        return $this->role === UserRole::ADMIN;
    }

    // === RELASI ===

    /**
     * Relasi one-to-one ke profil kandidat.
     */
    public function profile()
    {
        return $this->hasOne(Profile::class);
    }

    /**
     * Relasi one-to-one ke perusahaan (jika user adalah employer).
     */
    public function company()
    {
        return $this->hasOne(Company::class);
    }

    /**
     * Relasi one-to-many ke lamaran (jika user adalah kandidat).
     */
    public function applications()
    {
        return $this->hasMany(Application::class, 'candidate_id');
    }
    
    /**
     * Relasi many-to-many untuk pekerjaan yang disimpan.
     */
    public function savedJobs()
    {
        return $this->belongsToMany(Job::class, 'saved_jobs', 'user_id', 'job_id')->withTimestamps();
    }

        /**
     * Relasi one-to-one ke profil kandidat.
     * * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function candidate(): HasOne
    {
        return $this->hasOne(Candidate::class, 'user_id', 'user_id');
    }
    
}