<?php

namespace App\Models;

use App\Enums\ApplicationStatus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Storage;

/**
 * App\Models\Application
 *
 * @property int $id
 * @property int $job_id
 * @property int $candidate_id
 * @property ApplicationStatus $status
 * @property string|null $cover_letter
 * @property string|null $resume_path
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read string|null $resume_url
 * @property-read \App\Models\Job $job
 * @property-read \App\Models\Candidate $candidate
 * @property-read \App\Models\Interview|null $interview
 */
class Application extends Model
{
    use HasFactory;

    protected $fillable = [
        'job_id',
        'candidate_id',
        'status',
        'cover_letter',
        'resume_path',
    ];

    protected $casts = [
        'status' => ApplicationStatus::class,
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = [
        'resume_url',
    ];
    
    /**
     * Accessor untuk mendapatkan URL lengkap dari resume.
     */
    public function getResumeUrlAttribute(): ?string
    {
        // Kode ini sudah benar. Peringatan "unknown method" bisa diabaikan.
        return $this->resume_path ? Storage::disk('public')->url($this->resume_path) : null;
    }

    // === RELASI ===

    public function job(): BelongsTo
    {
        return $this->belongsTo(Job::class);
    }

    public function candidate(): BelongsTo
    {
        // Pastikan foreign key-nya benar, yaitu 'candidate_id'
        return $this->belongsTo(Candidate::class, 'candidate_id');
    }
    
    public function interview(): HasOne
    {
        return $this->hasOne(Interview::class);
    }
}
