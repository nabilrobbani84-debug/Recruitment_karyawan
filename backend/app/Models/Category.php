<?php

// File: app/Models/Category.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'slug'];

    public function jobs()
    {
        return $this->hasMany(Job::class);
    }

    public function blogs()
    {
        return $this->hasMany(Blog::class);
    }
}