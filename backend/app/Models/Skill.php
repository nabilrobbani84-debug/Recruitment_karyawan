<?php

// File: app/Models/Skill.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Skill extends Model
{
    use HasFactory;
    protected $fillable = ['name'];

    public function jobs()
    {
        return $this->belongsToMany(Job::class, 'job_skill');
    }

    public function profiles()
    {
        return $this->belongsToMany(Profile::class, 'profile_skill');
    }
}
