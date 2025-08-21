<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Author extends Model
{
    // Define the table name if it's different from the default model name (authors)
    protected $table = 'authors';

    // Specify the primary key column if it's not 'id'
    protected $primaryKey = 'author_id';

    // Set the primary key to be non-incrementing if needed
    public $incrementing = false;

    // Define the fields that are mass assignable
    protected $fillable = [
        'user_id',
        'name',
        'email',
        'phone_number',
        'status',  // active or inactive
    ];

    // If you don't have timestamps
    public $timestamps = false;

    /**
     * Define relationship with the User model (if each author is linked to a user)
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }

    /**
     * Define relationship with the Job model (An author can post many jobs)
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function jobs()
    {
        return $this->hasMany(Job::class, 'author_id', 'author_id');
    }

    /**
     * Optional: Status logic (if you want to automatically handle status changes)
     */
    public function activate()
    {
        $this->status = 'active';
        $this->save();
    }

    public function deactivate()
    {
        $this->status = 'inactive';
        $this->save();
    }

    // Optional: Add validation rules for the Author model
    public static $rules = [
        'user_id' => 'required|exists:users,user_id', // Assumes a users table exists
        'name' => 'required|string|max:255',
        'email' => 'required|email|max:255|unique:authors',
        'phone_number' => 'required|string|max:15',
        'status' => 'required|in:active,inactive',
    ];
}
