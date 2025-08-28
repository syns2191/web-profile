import { mockActivities } from '@/libs/mock-activities';
import React from 'react';
import { notFound } from 'next/navigation';
import { ActivityPageWrapper } from '@/components/activity-page-wrapper';
import { SectionTransition } from '@/components/section-transition';

interface ActivityDetailPageProps {
  params: {
    slug: string;
  };
}

const ActivityDetailPage = ({ params }: ActivityDetailPageProps) => {
  const { slug } = params;
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
