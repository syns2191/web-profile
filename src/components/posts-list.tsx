'use client';

import React, { useEffect, useState } from 'react';
import { fetchPosts } from '@/libs/api';
import { SectionTransition } from './section-transition';

interface Post {
  id: number;
  title: string;
  body: string;
}

export const PostsList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    getPosts();
  }, []);

  if (loading) {
    return <div className="text-center py-8 text-[var(--color-primary-dark)] dark:text-white">Loading posts...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  return (
    <SectionTransition animation="animate-slide-up">
      <section id="posts" className="py-16 md:py-24 bg-[var(--color-primary-light)] dark:bg-[var(--color-primary-medium)]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-[var(--color-primary-dark)] dark:text-white">Latest Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <div key={post.id} className="bg-white dark:bg-[var(--color-primary-dark)] p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2 text-[var(--color-primary-accent)] dark:text-white">{post.title}</h3>
                <p className="text-[var(--color-primary-dark)] dark:text-white">{post.body.substring(0, 100)}...</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SectionTransition>
  );
};
