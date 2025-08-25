'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ActivitiesRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/admin/activities/list');
  }, [router]);

  return null; // Or a loading spinner
}