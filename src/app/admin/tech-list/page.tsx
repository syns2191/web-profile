'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function TechListRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/admin/tech-list/list');
  }, [router]);

  return null; // Or a loading spinner
}