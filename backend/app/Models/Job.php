<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;

/**
 * App\Models\Job
 *
 * @property int $id
 * @property string $title
 * @property string $slug
 * @property int $company_id
 * @property int $category_id
 * @property string $description
 * @property string $location
 * @property string $type
 * @property string|null $salary_range
 * @property boolean $is_active
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read \App\Models\Company $company
 * @property-read \App\Models\Category $category
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Skill[] $skills
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Application[] $applications
 */
class Job extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'company_id',
        'category_id',
        'description',
        'location',
        'type',
        'salary_range',
        'is_active',
    ];

    /**
     * Atribut yang harus di-cast.
     */
    protected $casts = [
        'is_active' => 'boolean',
    ];

    // ... (semua method relasi yang sudah ada)

    public function applications(): HasMany
    {
        return $this->hasMany(Application::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function skills(): BelongsToMany
    {
        return $this->belongsToMany(Skill::class);
    }

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }
}