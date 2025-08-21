<?php

namespace App\Http\Controllers\Api\V1;

use App\Enums\UserRole;
use App\Models\Blog;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Http\Resources\V1\BlogResource;

// PERBAIKAN: Menambahkan "extends Controller"
class BlogController extends Controller
{
    /**
     * Menampilkan daftar postingan blog yang sudah dipublikasikan.
     */
    public function index(Request $request)
    {
        $posts = Blog::query()
            ->where('is_published', true)
            ->with(['category', 'author'])
            ->when($request->query('search'), fn($query, $search) =>
                $query->where('title', 'like', "%{$search}%")
            )
            ->when($request->query('category'), fn($query, $categorySlug) =>
                $query->whereHas('category', fn($q) => $q->where('slug', $categorySlug))
            )
            ->latest('published_at')
            ->paginate(10)
            ->withQueryString();

        return BlogResource::collection($posts);
    }

    /**
     * Menampilkan satu postingan blog spesifik.
     */
    public function show(Blog $blog): BlogResource|JsonResponse
    {
        // PERBAIKAN: Menggunakan role enum untuk memeriksa admin
        $isAdmin = auth()->check() && auth()->user()->role === UserRole::ADMIN;

        if (!$blog->is_published && !$isAdmin) {
            return response()->json(['message' => 'Post not found.'], 404);
        }

        return new BlogResource($blog->load(['category', 'author']));
    }

    /**
     * Menyimpan postingan blog baru (hanya admin).
     */
    public function store(Request $request): JsonResponse
    {
        $this->authorize('create', Blog::class);

        $validated = $request->validate([
            'title' => 'required|string|max:255|unique:blogs,title',
            'content' => 'required|string',
            'category_id' => 'required|exists:blog_categories,id', // Pastikan nama tabel kategori benar
            'thumbnail' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'is_published' => 'required|boolean',
        ]);

        $validated['slug'] = Str::slug($validated['title']);
        $validated['author_id'] = Auth::id();

        if ($request->hasFile('thumbnail')) {
            $validated['thumbnail'] = $request->file('thumbnail')->store('blog-thumbnails', 'public');
        }

        if ($validated['is_published']) {
            $validated['published_at'] = now();
        }

        $blog = Blog::create($validated);

        return response()->json([
            'message' => 'Blog post created successfully.',
            'data' => new BlogResource($blog)
        ], 201);
    }

    /**
     * Memperbarui postingan blog yang ada (hanya admin).
     */
    public function update(Request $request, Blog $blog): JsonResponse
    {
        $this->authorize('update', $blog);

        $validated = $request->validate([
            'title' => 'required|string|max:255|unique:blogs,title,' . $blog->id,
            'content' => 'required|string',
            'category_id' => 'required|exists:blog_categories,id', // Pastikan nama tabel kategori benar
            'thumbnail' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'is_published' => 'required|boolean',
        ]);

        $validated['slug'] = Str::slug($validated['title']);

        if ($request->hasFile('thumbnail')) {
            if ($blog->thumbnail) {
                Storage::disk('public')->delete($blog->thumbnail);
            }
            $validated['thumbnail'] = $request->file('thumbnail')->store('blog-thumbnails', 'public');
        }

        if ($validated['is_published'] && !$blog->is_published) {
            $validated['published_at'] = now();
        } elseif (!$validated['is_published']) {
            $validated['published_at'] = null;
        }

        $blog->update($validated);

        return response()->json([
            'message' => 'Blog post updated successfully.',
            'data' => new BlogResource($blog->fresh())
        ]);
    }

    /**
     * Menghapus postingan blog (hanya admin).
     */
    public function destroy(Blog $blog): JsonResponse
    {
        $this->authorize('delete', $blog);

        if ($blog->thumbnail) {
            Storage::disk('public')->delete($blog->thumbnail);
        }

        $blog->delete();

        return response()->json(null, 204);
    }
}
