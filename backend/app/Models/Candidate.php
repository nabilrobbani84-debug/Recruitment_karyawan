<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Candidate extends Model
{
    protected $table = 'candidates';
    protected $primaryKey = 'candidate_id';
    public $incrementing = false;
    protected $fillable = [
        'user_id', 
        'address',
        'phone_number',
        'cv', 
        'status',
    ];
    public $timestamps = false;

    // Relationship with User
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }
}
