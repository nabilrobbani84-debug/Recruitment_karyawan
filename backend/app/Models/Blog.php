<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

/**
 * App\Models\Blog
 *
 * @property int $id
 * @property int $author_id
 * @property int $category_id
 * @property string $title
 * @property string $slug
 * @property string $content
 * @property string|null $thumbnail The path to the thumbnail file in storage.
 * @property bool $is_published
 * @property \Illuminate\Support\Carbon|null $published_at
 * @property-read \App\Models\Category $category
 * @property-read \App\Models\User $author The user who wrote the blog post.
 * @property-read string|null $thumbnail_url The full public URL to the thumbnail.
 */
class Blog extends Model
{
    use HasFactory;

    protected $fillable = [
        'author_id',
        'category_id',
        'title',
        'slug',
        'content',
        'thumbnail',
        'is_published',
        'published_at',
    ];

    protected $casts = [
        'is_published' => 'boolean',
        'published_at' => 'datetime',
    ];

    /**
     * Accessor untuk mendapatkan URL lengkap dari thumbnail.
     *
     * @return string|null
     */
    public function getThumbnailUrlAttribute(): ?string
    {
        // Menambahkan pengecekan apakah file benar-benar ada di storage.
        if ($this->thumbnail && Storage::disk('public')->exists($this->thumbnail)) {
            // PERBAIKAN: Menggunakan helper `asset()` untuk membuat URL.
            // Ini adalah cara yang paling umum dan linter-friendly, yang akan
            // menghilangkan peringatan "Call to unknown method".
            // Pastikan Anda sudah menjalankan `php artisan storage:link`.
            return asset('storage/' . $this->thumbnail);
        }

        // Berikan gambar placeholder jika tidak ada thumbnail.
        return 'https://placehold.co/600x400/e2e8f0/e2e8f0?text=No+Image';
    }

    // === RELASI ===

    /**
     * Mendapatkan kategori dari artikel blog.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Mendapatkan penulis (User) dari artikel blog.
     */
    public function author(): BelongsTo
    {
        // Pastikan 'author_id' adalah foreign key di tabel 'blogs'.
        return $this->belongsTo(User::class, 'author_id');
    }
}
