<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * App\Models\Education
 *
 * @property int $id
 * @property int $profile_id
 * @property string $institution
 * @property string $degree
 * @property string $field_of_study
 * @property Carbon $start_date
 * @property Carbon|null $end_date
 * @property string|null $description
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read \App\Models\Profile $profile
 */
class Education extends Model
{
    use HasFactory;

    /**
     * Atribut yang dapat diisi secara massal.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'profile_id',
        'institution',
        'degree',
        'field_of_study',
        'start_date',
        'end_date',
        'description',
    ];

    /**
     * Atribut yang harus di-cast ke tipe data tertentu.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
    ];

    /**
     * Mendapatkan profil yang memiliki riwayat pendidikan ini.
     */
    public function profile(): BelongsTo
    {
        return $this->belongsTo(Profile::class);
    }
}
