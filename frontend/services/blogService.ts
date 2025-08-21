// src/services/blogService.ts

import apiClient from '@/lib/apiClient';
import type {
  BlogPostAPI,
  GetBlogPostsParams,
  PaginatedApiResponse,
  PaginatedBlogPosts,
  TransformedBlogPost,
} from '@/lib/types';

// The transformPost function remains unchanged...
const transformPost = (post: BlogPostAPI): TransformedBlogPost => {
  const wordsPerMinute = 200;
  const wordCount = post.content?.split(/\s+/).length || 0;
  const readingTimeMinutes = wordCount > 0 ? Math.ceil(wordCount / wordsPerMinute) : 0;

  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    content: post.content,
    excerpt: post.excerpt,
    category: post.category,
    tags: post.tags,
    imageUrl: post.image_url,
    authorName: post.author_name,
    authorAvatarUrl: post.author_avatar_url,
    publishedAt: new Date(post.published_at),
    readingTimeMinutes,
  };
};

/**
 * A type-safe utility function to remove null, undefined, and empty string 
 * properties from an object. It uses generics to preserve the original object's type.
 * @param obj The object to clean.
 * @returns A new object with only the valid properties, typed as a Partial of the original.
 */
const cleanParams = <T extends Record<string, unknown>>(obj: T): Partial<T> => {
  // Use reduce for a concise, functional, and type-safe implementation
  return (Object.keys(obj) as Array<keyof T>).reduce((accumulator, key) => {
    const value = obj[key];
    if (value !== undefined && value !== null && value !== '') {
      accumulator[key] = value;
    }
    return accumulator;
  }, {} as Partial<T>);
};


export const blogService = {
  async getPosts(
    params: GetBlogPostsParams = {}, 
    options?: { signal?: AbortSignal }
  ): Promise<PaginatedBlogPosts> {
    // No error here, as cleanParams now correctly infers the type
    const requestParams = cleanParams({
      page: params.page || 1,
      limit: params.limit || 9,
      sortBy: params.sortBy || 'published_at',
      order: params.order || 'desc',
      category: params.category,
      q: params.searchQuery,
    });

    try {
      const response = await apiClient.get<PaginatedApiResponse<BlogPostAPI>>('/posts', {
        params: requestParams,
        signal: options?.signal,
      });
      
      const apiData = response.data;
      if (!apiData || !apiData.data || !apiData.meta) {
        throw new Error("Invalid API response structure.");
      }

      const transformedPosts = apiData.data.map(transformPost);
      const totalPosts = apiData.meta.total;
      // Ensure limit is treated as a number
      const limit = Number(requestParams.limit ?? 9);

      return {
        posts: transformedPosts,
        totalPosts: totalPosts,
        totalPages: Math.ceil(totalPosts / limit),
        currentPage: Number(requestParams.page ?? 1),
        hasNextPage: Number(requestParams.page ?? 1) * limit < totalPosts,
        hasPrevPage: Number(requestParams.page ?? 1) > 1,
      };

    } catch (error) {
      console.error("Error fetching blog posts:", error);
      throw error;
    }
  },

  async getPostBySlug(slug: string): Promise<TransformedBlogPost | null> {
    try {
      const response = await apiClient.get<BlogPostAPI[]>('/posts', { params: { slug } });
      const postData = response.data?.[0];

      if (!postData) {
        return null;
      }
      return transformPost(postData);
    } catch (error) {
      console.error(`Error fetching blog post with slug ${slug}:`, error);
      throw error;
    }
  },

  async getCategories(options?: { signal?: AbortSignal }): Promise<string[]> {
    try {
      const response = await apiClient.get<string[]>('/categories', {
        signal: options?.signal,
      });
      return response.data || [];
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error; 
    }
  }
};