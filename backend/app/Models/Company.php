<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Storage;

/**
 * App\Models\Company
 *
 * @property int $id
 * @property int $user_id
 * @property string $name
 * @property string $slug
 * @property string|null $description
 * @property string|null $website
 * @property string|null $logo
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Job> $jobs
 * @property-read int|null $jobs_count
 * @property-read string|null $logo_url
 */
class Company extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'slug',
        'description',
        'website',
        'logo',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    /**
     * Accessor untuk mendapatkan URL lengkap dari logo.
     */
    public function getLogoUrlAttribute(): ?string
    {
        // Menambahkan pengecekan apakah file benar-benar ada di storage.
        if ($this->logo && Storage::disk('public')->exists($this->logo)) {
            // PERBAIKAN: Menggunakan helper `asset()` untuk membuat URL.
            // Ini adalah cara yang paling umum dan linter-friendly, yang akan
            // menghilangkan peringatan "Call to unknown method".
            // Pastikan Anda sudah menjalankan `php artisan storage:link`.
            return asset('storage/' . $this->logo);
        }

        // Mengembalikan URL placeholder jika tidak ada logo
        return 'https://ui-avatars.com/api/?name=' . urlencode($this->name) . '&color=7F9CF5&background=EBF4FF';
    }

    // === RELASI ===

    /**
     * Mendapatkan user (employer) yang memiliki perusahaan ini.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Mendapatkan semua lowongan pekerjaan yang dimiliki oleh perusahaan ini.
     */
    public function jobs(): HasMany
    {
        return $this->hasMany(Job::class);
    }
}
