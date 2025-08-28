import { SectionTransition } from '@/components/section-transition';
import { mockActivities } from '@/libs/mock-activities';
import React from 'react';
import { notFound } from 'next/navigation';
import { MilestoneDetailPageWrapper } from '@/components/milestone-detail-page-wrapper';

interface MilestoneDetailPageProps {
  params: {
    slug: string;
    milestoneSlug: string;
  };
}

const MilestoneDetailPage = ({ params }: MilestoneDetailPageProps) => {
  const { slug, milestoneSlug } = params;

  const activity = mockActivities.find((act) => act.slug === slug);

  if (!activity) {
    notFound();
  }

  const milestone = activity.timeline.find((item) => item.slug === milestoneSlug);

  if (!milestone) {
    notFound();
  }

  return (
    <SectionTransition>
      <MilestoneDetailPageWrapper activity={activity} milestone={milestone} />
    </SectionTransition>
  );
};

export default MilestoneDetailPage;
