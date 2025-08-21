<?php

// File: app/Models/Interview.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Interview extends Model
{
    use HasFactory;

    protected $fillable = [
        'application_id',
        'schedule_date',
        'location', // Bisa berupa URL (Google Meet) atau alamat fisik
        'notes',
    ];

    protected $casts = [
        'schedule_date' => 'datetime',
    ];

    public function application()
    {
        return $this->belongsTo(Application::class);
    }
}
