'use client';

import { SectionTransition } from '@/components/section-transition';
import { ChipStack } from '@/components/chip-stack';
import React from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { useTheme } from './theme-provider';
import { ThemeSwitcher } from './theme-switcher';

interface ActivityPageWrapperProps {
  activity: any; // Replace 'any' with actual Activity type
}

export const ActivityPageWrapper: React.FC<ActivityPageWrapperProps> = ({ activity }) => {
  const { theme } = useTheme();

  const mainDivClasses = `min-h-screen w-full mx-auto relative ${theme === 'newspaper' ? 'paper-texture vintage-shadow' : ''}`;

  return (
    <div className={mainDivClasses}>
      {theme === 'newspaper' && <div className="fold-line"></div>}

      <header className="px-6 sm:px-12 py-8 border-b-2 border-[var(--color-primary-dark)] relative">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--color-primary-dark)] to-transparent opacity-20"></div>
        <div className="text-center">
          <div className="mb-2 text-xs tracking-widest text-[var(--foreground)] uppercase">Vol. MMXXIV &bull; No. 127 &bull; Price: Priceless</div>
          <h1 className="font-fraktur text-5xl sm:text-7xl text-[var(--foreground)] tracking-tight mb-2">{activity.title}</h1>
          <div className="text-xs italic text-[var(--foreground)]">&quot;Veritas in Colloquium&quot;</div>
          <div className="flex justify-center items-center gap-4 mt-3 text-[var(--foreground)]">
            <span className="text-sm">Est. MMXXIV</span>
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary-light)]"></div>
            <span className="text-sm">Sunday Edition</span>
          </div>
        </div>
      </header>

      <main className="px-6 sm:px-12 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <article className="mb-12">
            <div className={`border-2 ${theme === 'newspaper' ? 'newspaper-border' : 'border-[var(--color-primary-dark)]'} p-6 bg-[var(--background)]/50 ${theme === 'newspaper' ? 'ornate-corner' : ''}`}>
              <div className="flex items-start gap-6">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-playfair font-black text-2xl sm:text-3xl text-[var(--foreground)]">{activity.title}</h2>
                  </div>
                  <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>{activity.fullContent}</ReactMarkdown>
                  <div className="mt-4 flex items-center gap-4 text-sm text-[var(--foreground)] border-t border-[var(--color-primary-light)] pt-2">
                    <span className="italic">By {activity.author}</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary-light)]"></div>
                    <span>{activity.hoursPast}</span>
                    {activity.replies && (
                      <>
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary-light)]"></div>
                        <span>{activity.replies}</span>
                      </>
                    )}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {activity.techStack.map((tech: any) => (
                      <ChipStack key={tech.name} name={tech.name} icon={tech.icon} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </article>

          {activity.timeline && activity.timeline.length > 0 && (
            <section className="mt-12">
              <h2 className="font-playfair font-black text-2xl sm:text-3xl text-[var(--foreground)] mb-6">Activity Timeline</h2>
              <div className="relative border-l-2 border-[var(--color-primary-light)] pl-6">
                {activity.timeline.map((item: any, index: number) => (
                  <div key={index} className="mb-8 flex items-start">
                    <div className="absolute w-4 h-4 bg-[var(--color-primary-dark)] rounded-full -left-2 top-1.5 border-2 border-[var(--background)]"></div>
                    <Link href={`/activity/${activity.slug}/milestone/${item.slug}`} className="flex-1 cursor-pointer hover:bg-[var(--color-primary-light)] p-2 rounded-md transition-colors duration-200">
                      <p className="text-sm text-[var(--foreground)]">{item.date}</p>
                      <h3 className="font-playfair font-bold text-lg text-[var(--foreground)]">{item.title}</h3>
                      <p className="text-[var(--foreground)]">{item.description}</p>
                    </Link>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className="lg:col-span-1">
          {activity.githubActivities && activity.githubActivities.length > 0 && (
            <section className={`p-6 bg-[var(--background)]/50 ${theme === 'newspaper' ? 'newspaper-border ornate-corner' : 'border-2 border-[var(--color-primary-dark)]'}`}>
              <h2 className="font-playfair font-black text-2xl sm:text-3xl text-[var(--foreground)] mb-6">GitHub Activity</h2>
              <div className="space-y-4">
                {activity.githubActivities.map((ghActivity: any, index: number) => (
                  <div key={index} className="border-b border-[var(--color-primary-light)] pb-4 last:border-b-0 last:pb-0">
                    <p className="text-sm text-[var(--foreground)]">{ghActivity.date}</p>
                    <h3 className="font-playfair font-bold text-lg text-[var(--foreground)]">{ghActivity.type}: {ghActivity.repo}</h3>
                    <p className="text-[var(--foreground)]">{ghActivity.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activity.githubIssues && activity.githubIssues.length > 0 && (
            <section className={`p-6 bg-[var(--background)]/50 ${theme === 'newspaper' ? 'newspaper-border ornate-corner' : 'border-2 border-[var(--color-primary-dark)]'} mt-8`}>
              <h2 className="font-playfair font-black text-2xl sm:text-3xl text-[var(--foreground)] mb-6">GitHub Issues</h2>
              <div className="space-y-4">
                {activity.githubIssues.map((issue: any, index: any) => (
                  <div key={index} className="border-b border-[var(--color-primary-light)] pb-4 last:border-b-0 last:pb-0">
                    <p className="text-sm text-[var(--foreground)]">Issue #{issue.issueNumber} - {issue.date}</p>
                    <h3 className="font-playfair font-bold text-lg text-[var(--foreground)]">{issue.title}</h3>
                    <p className={`text-sm font-bold ${issue.status === "Open" ? "text-red-600" : "text-green-600"}`}> {issue.status}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </aside>
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