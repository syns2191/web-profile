'use client';

import { ProgressCircle } from '@/components/progress-circle';
import { ChipStack } from '@/components/chip-stack';
import Link from 'next/link';
import { mockActivities } from '@/libs/mock-activities';
import React from 'react';
import { useTheme } from './theme-provider';
import { ThemeSwitcher } from './theme-switcher';

export const ActivityListPageWrapper = () => {
  const { theme } = useTheme();

  const mainDivClasses = `min-h-screen w-full mx-auto relative ${theme === 'newspaper' ? 'paper-texture vintage-shadow' : ''}`;

  return (
    <div className={mainDivClasses}>
      {theme === 'newspaper' && <div className="fold-line"></div>}

      <header className="px-6 sm:px-12 py-8 border-b-2 border-[var(--color-primary-dark)] relative">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--color-primary-dark)] to-transparent opacity-20"></div>
        <div className="text-center">
          <div className="mb-2 text-xs tracking-widest text-[var(--foreground)] uppercase">Vol. MMXXIV &bull; No. 127 &bull; Price: Priceless</div>
          <h1 className="font-fraktur text-5xl sm:text-7xl text-[var(--foreground)] tracking-tight mb-2">Projects activity</h1>
          <div className="text-xs italic text-[var(--foreground)]">&quot;Veritas in Colloquium&quot;</div>
          <div className="flex justify-center items-center gap-4 mt-3 text-[var(--foreground)]">
            <span className="text-sm">Est. MMXXIV</span>
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary-light)]"></div>
            <span className="text-sm">Sunday Edition</span>
          </div>
        </div>
      </header>

      <main className="px-6 sm:px-12 py-8">
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-playfair font-black text-2xl sm:text-3xl text-[var(--foreground)]">Latest Active Project</h2>
            <div className="text-xs text-[var(--foreground)] italic">Page A1</div>
          </div>
          {mockActivities[0] && (
            <Link href={`/activity/${mockActivities[0].slug}`} key={mockActivities[0].slug}>
              <article className={`border-2 ${theme === 'newspaper' ? 'newspaper-border' : 'border-[var(--color-primary-dark)]'} p-6 bg-[var(--background)]/50 ${theme === 'newspaper' ? 'ornate-corner' : ''} hover:bg-[var(--background)]/80 transition-colors cursor-pointer`}>
                <div className="flex items-start gap-6">
                  <div className="hidden sm:block">
                    <div className="w-12 h-12 rounded-full bg-[var(--color-primary-light)] flex items-center justify-center border-2 border-[var(--color-primary-medium)]">
                      <span className="font-playfair font-bold text-[var(--foreground)]">JD</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-playfair font-bold text-xl text-[var(--foreground)] border-b border-[var(--color-primary-light)] pb-2">{mockActivities[0].title}</h3>
                      <ProgressCircle progress={mockActivities[0].progress} />
                    </div>
                    <p className="mt-4 text-[var(--foreground)] font-playfair leading-relaxed first-letter">{mockActivities[0].summary}</p>
                    <div className="mt-4 flex items-center gap-4 text-sm text-[var(--foreground)] border-t border-[var(--color-primary-light)] pt-2">
                      <span className="italic">By {mockActivities[0].author}</span>
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary-light)]"></div>
                      <span>{mockActivities[0].hoursPast}</span>
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary-light)]"></div>
                      <span>{mockActivities[0].replies}</span>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {mockActivities[0].techStack.map((tech) => (
                        <ChipStack key={tech.name} name={tech.name} icon={tech.icon} />
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          )}
        </div>

        <div className="grid gap-6">
          {mockActivities.slice(1).map((activity, idx) => (
            <Link href={`/activity/${activity.slug}`} key={`${activity.slug}_${idx}`}>
              <article className={`border-2 ${theme === 'newspaper' ? 'newspaper-border' : 'border-[var(--color-primary-dark)]'} p-6 bg-[var(--background)]/50 hover:bg-[var(--background)]/80 transition-colors ${theme === 'newspaper' ? 'ornate-corner' : ''} cursor-pointer`}>
                <div className="flex gap-6">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-playfair font-bold text-lg text-[var(--foreground)] border-b border-[var(--color-primary-light)] pb-2">{activity.title}</h3>
                      <ProgressCircle progress={activity.progress} />
                    </div>
                    <p className="mt-4 text-[var(--foreground)] font-playfair first-letter">{activity.summary}</p>
                    <div className="mt-4 flex items-center gap-4 text-sm text-[var(--foreground)] border-t border-[var(--color-primary-light)] pt-2">
                      <span className="italic">By {activity.author}</span>
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary-light)]"></div>
                      <span>{activity.hoursPast}</span>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {activity.techStack.map((tech) => (
                        <ChipStack key={tech.name} name={tech.name} icon={tech.icon} />
                      ))}
                    </div>
                  </div>
                  <div className="hidden sm:flex flex-col items-end justify-between text-[var(--foreground)]">
                    <span className="text-sm border-b border-[var(--color-primary-light)] pb-1">{activity.replies}</span>
                    <span className="text-xs italic">Last: I Hour Past</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </main>

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
