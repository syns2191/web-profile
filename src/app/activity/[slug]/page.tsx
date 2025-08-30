import { mockActivities } from '@/libs/mock-activities';
import React from 'react';
import { notFound } from 'next/navigation';
import { ActivityPageWrapper } from '@/components/activity-page-wrapper';
import { SectionTransition } from '@/components/section-transition';

interface ActivityDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const ActivityDetailPage = async ({ params }: ActivityDetailPageProps) => {
  const { slug } = await params;
  const activity = mockActivities.find((act) => act.slug === slug);

  if (!activity) {
    notFound();
  }

  return (
    <SectionTransition>
      <ActivityPageWrapper activity={activity} />
    </SectionTransition>
  );
};

export default ActivityDetailPage;
