'use client';

import React from 'react';
import Link from 'next/link';
import { useTheme } from './theme-provider';
import { ThemeSwitcher } from './theme-switcher';

import { Activity, Milestone, RelatedGithubIssue, RelatedGithubCommit, RelatedGithubPullRequest } from '@/libs/activity-types';

interface MilestoneDetailPageWrapperProps {
  activity: Activity;
  milestone: Milestone;
}

export const MilestoneDetailPageWrapper: React.FC<MilestoneDetailPageWrapperProps> = ({ activity, milestone }) => {
  const { theme } = useTheme();

  const mainDivClasses = `min-h-screen w-full mx-auto relative ${theme === 'newspaper' ? 'paper-texture vintage-shadow' : ''}`;

  return (
    <div className={mainDivClasses}>
      {theme === 'newspaper' && <div className="fold-line"></div>}

      <header className="px-6 sm:px-12 py-8 border-b-2 border-[var(--color-primary-dark)] relative">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--color-primary-dark)] to-transparent opacity-20"></div>
        <div className="text-center">
          <div className="mb-2 text-xs tracking-widest text-[var(--foreground)] uppercase">Vol. MMXXIV &bull; No. 127 &bull; Price: Priceless</div>
          <h1 className="font-fraktur text-5xl sm:text-7xl text-[var(--foreground)] tracking-tight mb-2">{milestone.title}</h1>
          <div className="text-xs italic text-[var(--foreground)]">&quot;Veritas in Colloquium&quot;</div>
          <div className="flex justify-center items-center gap-4 mt-3 text-[var(--foreground)]">
            <span className="text-sm">Est. MMXXIV</span>
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary-light)]"></div>
            <span className="text-sm">Sunday Edition</span>
          </div>
        </div>
      </header>

      <main className="px-6 sm:px-12 py-8">
        <article className="mb-12">
          <div className={`border-2 ${theme === 'newspaper' ? 'newspaper-border' : 'border-[var(--color-primary-dark)]'} p-6 bg-[var(--background)]/50 ${theme === 'newspaper' ? 'ornate-corner' : ''}`}>
            <div className="flex items-start gap-6">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-playfair font-black text-2xl sm:text-3xl text-[var(--foreground)]">{milestone.title}</h2>
                </div>
                <p className="text-sm text-[var(--foreground)] mb-4">Date: {milestone.date}</p>
                <div className="prose max-w-none text-[var(--foreground)]" dangerouslySetInnerHTML={{ __html: milestone.fullContent }} />
                <div className="mt-8">
                  <Link href={`/activity/${activity.slug}`} className="text-[var(--color-primary-accent)] hover:underline font-bold">
                    &larr; Back to {activity.title} Activity
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </article>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          {milestone.relatedGithubIssues && milestone.relatedGithubIssues.length > 0 && (
            <section className={`lg:col-span-1 p-6 bg-[var(--background)]/50 ${theme === 'newspaper' ? 'newspaper-border ornate-corner' : 'border-2 border-[var(--color-primary-dark)]'}`}>
              <h2 className="font-playfair font-black text-2xl sm:text-3xl text-[var(--foreground)] mb-6">Related Issues</h2>
              <div className="space-y-4">
                {milestone.relatedGithubIssues.map((issue: RelatedGithubIssue, index: number) => (
                  <div key={index} className="border-b border-[var(--color-primary-light)] pb-4 last:border-b-0 last:pb-0">
                    <p className="text-sm text-[var(--foreground)]">Issue #{issue.issueNumber} - {issue.date}</p>
                    <h3 className="font-playfair font-bold text-lg text-[var(--foreground)]">{issue.title}</h3>
                    <p className={`text-sm font-bold ${issue.status === "Open" ? "text-red-600" : "text-green-600"}`}> {issue.status}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {milestone.relatedGithubCommits && milestone.relatedGithubCommits.length > 0 && (
            <section className={`lg:col-span-1 p-6 bg-[var(--background)]/50 ${theme === 'newspaper' ? 'newspaper-border ornate-corner' : 'border-2 border-[var(--color-primary-dark)]'}`}>
              <h2 className="font-playfair font-black text-2xl sm:text-3xl text-[var(--foreground)] mb-6">Related Commits</h2>
              <div className="space-y-4">
                {milestone.relatedGithubCommits.map((commit: RelatedGithubCommit, index: number) => (
                  <div key={index} className="border-b border-[var(--color-primary-light)] pb-4 last:border-b-0 last:pb-0">
                    <p className="text-sm text-[var(--foreground)]">{commit.date}</p>
                    <h3 className="font-playfair font-bold text-lg text-[var(--foreground)]">{commit.repo}</h3>
                    <p className="text-[var(--foreground)]">{commit.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {milestone.relatedGithubPullRequests && milestone.relatedGithubPullRequests.length > 0 && (
            <section className={`lg:col-span-1 p-6 bg-[var(--background)]/50 ${theme === 'newspaper' ? 'newspaper-border ornate-corner' : 'border-2 border-[var(--color-primary-dark)]'}`}>
              <h2 className="font-playfair font-black text-2xl sm:text-3xl text-[var(--foreground)] mb-6">Related Pull Requests</h2>
              <div className="space-y-4">
                {milestone.relatedGithubPullRequests.map((pr: RelatedGithubPullRequest, index: number) => (
                  <div key={index} className="border-b border-[var(--color-primary-light)] pb-4 last:border-b-0 last:pb-0">
                    <p className="text-sm text-[var(--foreground)]">PR #{pr.prNumber} - {pr.date}</p>
                    <h3 className="font-playfair font-bold text-lg text-[var(--foreground)]">{pr.repo}</h3>
                    <p className="text-[var(--foreground)]">{pr.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <div className="flex justify-center mt-8 mb-4">
        <Link href="/board" className="inline-block bg-[var(--background)]/50 border-2 border-[var(--color-primary-dark)] text-[var(--foreground)] font-bold py-2 px-4 transition-colors duration-200 hover:bg-[var(--color-primary-light)] shadow-md">
          View Task Board
        </Link>
      </div>
      <footer className="px-6 sm:px-12 py-6 border-t border-[var(--color-primary-dark)] text-center text-sm text-[var(--foreground)] relative">
        <div className="flex item-center justify-center"><ThemeSwitcher /></div>
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--color-primary-dark)] to-transparent opacity-20"></div>
        <p className="font-playfair italic">&quot;All the Forum&apos;s News That&apos;s Fit to Print&quot;</p>
        <div className="mt-2 flex justify-center items-center gap-4">
          <span>Copyright © MMXXIV</span>
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary-light)]"></div>
          <span className="font-fraktur">The Daily Forum</span>
        </div>
      </footer>
    </div>
  );
};