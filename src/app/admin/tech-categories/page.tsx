'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function TechCategoriesRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/admin/tech-categories/list');
  }, [router]);

  return null; // Or a loading spinner
}