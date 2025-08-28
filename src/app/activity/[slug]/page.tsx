import { SectionTransition } from '@/components/section-transition';
import { ChipStack } from '@/components/chip-stack';
import { mockActivities } from '@/libs/mock-activities';
import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

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
      <div className="min-h-screen w-full mx-auto paper-texture vintage-shadow relative">
        <div className="fold-line"></div>

        <header className="px-6 sm:px-12 py-8 border-b-2 border-neutral-800 relative">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-neutral-800 to-transparent opacity-20"></div>
          <div className="text-center">
            <div className="mb-2 text-xs tracking-widest text-neutral-600 uppercase">Vol. MMXXIV &bull; No. 127 &bull; Price: Priceless</div>
            <h1 className="font-fraktur text-5xl sm:text-7xl text-neutral-900 tracking-tight mb-2">{activity.title}</h1>
            <div className="text-xs italic text-neutral-600">&quot;Veritas in Colloquium&quot;</div>
            <div className="flex justify-center items-center gap-4 mt-3 text-neutral-600">
              <span className="text-sm">Est. MMXXIV</span>
              <div className="w-1.5 h-1.5 rounded-full bg-neutral-400"></div>
              <span className="text-sm">Sunday Edition</span>
            </div>
          </div>
        </header>

        <main className="px-6 sm:px-12 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <article className="mb-12">
              <div className="newspaper-border border-neutral-800 p-6 bg-white/50 ornate-corner">
                <div className="flex items-start gap-6">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="font-playfair font-black text-2xl sm:text-3xl text-neutral-900">{activity.title}</h2>
                    </div>
                    <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>{activity.fullContent}</ReactMarkdown>
                    <div className="mt-4 flex items-center gap-4 text-sm text-neutral-600 border-t border-neutral-200 pt-2">
                      <span className="italic">By {activity.author}</span>
                      <div className="w-1.5 h-1.5 rounded-full bg-neutral-400"></div>
                      <span>{activity.hoursPast}</span>
                      {activity.replies && (
                        <>
                          <div className="w-1.5 h-1.5 rounded-full bg-neutral-400"></div>
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
                <h2 className="font-playfair font-black text-2xl sm:text-3xl text-neutral-900 mb-6">Activity Timeline</h2>
                <div className="relative border-l-2 border-neutral-300 pl-6">
                  {activity.timeline.map((item: any, index: number) => (
                    <div key={index} className="mb-8 flex items-start">
                      <div className="absolute w-4 h-4 bg-neutral-800 rounded-full -left-2 top-1.5 border-2 border-white"></div>
                      <Link href={`/activity/${activity.slug}/milestone/${item.slug}`} className="flex-1 cursor-pointer hover:bg-neutral-100 p-2 rounded-md transition-colors duration-200">
                        <p className="text-sm text-neutral-600">{item.date}</p>
                        <h3 className="font-playfair font-bold text-lg text-neutral-900">{item.title}</h3>
                        <p className="text-neutral-700">{item.description}</p>
                      </Link>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside className="lg:col-span-1">
            {activity.githubActivities && activity.githubActivities.length > 0 && (
              <section className="newspaper-border border-neutral-800 p-6 bg-white/50 ornate-corner">
                <h2 className="font-playfair font-black text-2xl sm:text-3xl text-neutral-900 mb-6">GitHub Activity</h2>
                <div className="space-y-4">
                  {activity.githubActivities.map((ghActivity: any, index: number) => (
                    <div key={index} className="border-b border-neutral-200 pb-4 last:border-b-0 last:pb-0">
                      <p className="text-sm text-neutral-600">{ghActivity.date}</p>
                      <h3 className="font-playfair font-bold text-lg text-neutral-900">{ghActivity.type}: {ghActivity.repo}</h3>
                      <p className="text-neutral-700">{ghActivity.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {activity.githubIssues && activity.githubIssues.length > 0 && (
              <section className="newspaper-border border-neutral-800 p-6 bg-white/50 ornate-corner mt-8">
                <h2 className="font-playfair font-black text-2xl sm:text-3xl text-neutral-900 mb-6">GitHub Issues</h2>
                <div className="space-y-4">
                  {activity.githubIssues.map((issue: any, index: any) => (
                    <div key={index} className="border-b border-neutral-200 pb-4 last:border-b-0 last:pb-0">
                      <p className="text-sm text-neutral-600">Issue #{issue.issueNumber} - {issue.date}</p>
                      <h3 className="font-playfair font-bold text-lg text-neutral-900">{issue.title}</h3>
                      <p className={`text-sm font-bold ${issue.status === "Open" ? "text-red-600" : "text-green-600"}`}>{issue.status}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </aside>
        </main>

        <div className="flex justify-center mt-8 mb-4">
          <Link href="/board" className="inline-block bg-white/50 border-2 border-neutral-800 text-neutral-900 font-bold py-2 px-4 transition-colors duration-200 hover:bg-neutral-100 shadow-md">
            View Task Board
          </Link>
        </div>
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

export default ActivityDetailPage;
