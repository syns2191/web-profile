'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProjectsRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/admin/projects/list');
  }, [router]);

  return null; // Or a loading spinner
}