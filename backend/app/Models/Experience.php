<?php

// File: app/Models/Experience.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Experience extends Model
{
    use HasFactory;
    protected $fillable = ['profile_id', 'title', 'company', 'start_date', 'end_date', 'description'];
    
    protected $casts = [
        'start_date' => 'date:Y-m-d',
        'end_date' => 'date:Y-m-d',
    ];

    public function profile()
    {
        return $this->belongsTo(Profile::class);
    }
}