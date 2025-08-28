import { SectionTransition } from '@/components/section-transition';
import { mockActivities } from '@/libs/mock-activities';
import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';

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
      <div className="min-h-screen w-full mx-auto paper-texture vintage-shadow relative">
        <div className="fold-line"></div>

        <header className="px-6 sm:px-12 py-8 border-b-2 border-neutral-800 relative">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-neutral-800 to-transparent opacity-20"></div>
          <div className="text-center">
            <div className="mb-2 text-xs tracking-widest text-neutral-600 uppercase">Vol. MMXXIV &bull; No. 127 &bull; Price: Priceless</div>
            <h1 className="font-fraktur text-5xl sm:text-7xl text-neutral-900 tracking-tight mb-2">{milestone.title}</h1>
            <div className="text-xs italic text-neutral-600">&quot;Veritas in Colloquium&quot;</div>
            <div className="flex justify-center items-center gap-4 mt-3 text-neutral-600">
              <span className="text-sm">Est. MMXXIV</span>
              <div className="w-1.5 h-1.5 rounded-full bg-neutral-400"></div>
              <span className="text-sm">Sunday Edition</span>
            </div>
          </div>
        </header>

        <main className="px-6 sm:px-12 py-8">
          <article className="mb-12">
            <div className="newspaper-border border-neutral-800 p-6 bg-white/50 ornate-corner">
              <div className="flex items-start gap-6">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-playfair font-black text-2xl sm:text-3xl text-neutral-900">{milestone.title}</h2>
                  </div>
                  <p className="text-sm text-neutral-600 mb-4">Date: {milestone.date}</p>
                  <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: milestone.fullContent }} />
                  <div className="mt-8">
                    <Link href={`/activity/${slug}`} className="text-blue-600 hover:underline font-bold">
                      &larr; Back to {activity.title} Activity
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </article>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
            {milestone.relatedGithubIssues && milestone.relatedGithubIssues.length > 0 && (
              <section className="lg:col-span-1 newspaper-border border-neutral-800 p-6 bg-white/50 ornate-corner">
                <h2 className="font-playfair font-black text-2xl sm:text-3xl text-neutral-900 mb-6">Related Issues</h2>
                <div className="space-y-4">
                  {milestone.relatedGithubIssues.map((issue, index) => (
                    <div key={index} className="border-b border-neutral-200 pb-4 last:border-b-0 last:pb-0">
                      <p className="text-sm text-neutral-600">Issue #{issue.issueNumber} - {issue.date}</p>
                      <h3 className="font-playfair font-bold text-lg text-neutral-900">{issue.title}</h3>
                      <p className={`text-sm font-bold ${issue.status === "Open" ? "text-red-600" : "text-green-600"}`}>{issue.status}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {milestone.relatedGithubCommits && milestone.relatedGithubCommits.length > 0 && (
              <section className="lg:col-span-1 newspaper-border border-neutral-800 p-6 bg-white/50 ornate-corner">
                <h2 className="font-playfair font-black text-2xl sm:text-3xl text-neutral-900 mb-6">Related Commits</h2>
                <div className="space-y-4">
                  {milestone.relatedGithubCommits.map((commit, index) => (
                    <div key={index} className="border-b border-neutral-200 pb-4 last:border-b-0 last:pb-0">
                      <p className="text-sm text-neutral-600">{commit.date}</p>
                      <h3 className="font-playfair font-bold text-lg text-neutral-900">{commit.repo}</h3>
                      <p className="text-neutral-700">{commit.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {milestone.relatedGithubPullRequests && milestone.relatedGithubPullRequests.length > 0 && (
              <section className="lg:col-span-1 newspaper-border border-neutral-800 p-6 bg-white/50 ornate-corner">
                <h2 className="font-playfair font-black text-2xl sm:text-3xl text-neutral-900 mb-6">Related Pull Requests</h2>
                <div className="space-y-4">
                  {milestone.relatedGithubPullRequests.map((pr, index) => (
                    <div key={index} className="border-b border-neutral-200 pb-4 last:border-b-0 last:pb-0">
                      <p className="text-sm text-neutral-600">PR #{pr.prNumber} - {pr.date}</p>
                      <h3 className="font-playfair font-bold text-lg text-neutral-900">{pr.repo}</h3>
                      <p className="text-neutral-700">{pr.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </main>

        <footer className="px-6 sm:px-12 py-6 border-t border-neutral-800 text-center text-sm text-neutral-600 relative">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-neutral-800 to-transparent opacity-20"></div>
          <p className="font-playfair italic">&quot;All the Forum&apos;s News That&apos;s Fit to Print&quot;</p>
          <div className="mt-2 flex justify-center items-center gap-4">
            <span>Copyright © MMXXIV</span>
            <div className="w-1.5 h-1.5 rounded-full bg-neutral-400"></div>
            <span className="font-fraktur">The Daily Forum</span>
          </div>
        </footer>
      </div>
    </SectionTransition>
  );
};

export default MilestoneDetailPage;
