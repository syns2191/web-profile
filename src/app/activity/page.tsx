import { SectionTransition } from '@/components/section-transition';
import { ActivityListPageWrapper } from '@/components/activity-list-page-wrapper';
import React from 'react';

const ActivityPage = () => {
  return (
    <SectionTransition>
      <ActivityListPageWrapper />
    </SectionTransition>
  );
};

export default ActivityPage;
