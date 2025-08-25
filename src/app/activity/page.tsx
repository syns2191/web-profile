import { SectionTransition } from '@/components/section-transition';
import React from 'react';
import Link from 'next/link';

// Dummy data for activities (should ideally come from a shared source or API)
const activities = [
  {
    slug: 'project-alpha-ai-recommendation-engine',
    title: 'Project Alpha: AI Recommendation Engine',
    description: 'Developing a cutting-edge AI-powered recommendation system using machine learning and big data analytics.',
    status: 'In Progress',
    date: 'Started: January 2025',
  },
  {
    slug: 'project-beta-decentralized-blockchain-app',
    title: 'Project Beta: Decentralized Blockchain App',
    description: 'Building a secure and scalable decentralized application on the Ethereum blockchain with smart contract integration.',
    status: '70% Complete',
    date: 'Started: March 2025',
  },
  {
    slug: 'project-gamma-iot-smart-home-system',
    title: 'Project Gamma: IoT Smart Home System',
    description: 'Designing and implementing an integrated IoT smart home system for enhanced automation and energy efficiency.',
    status: 'Planning Phase',
    date: 'Started: July 2025',
  },
  {
    slug: 'attended-future-of-ai-conference',
    title: 'Attended "Future of AI" Conference',
    description: 'Participated in keynotes and workshops on the latest advancements in artificial intelligence and machine learning in San Francisco.',
    date: 'August 2025',
  },
  {
    slug: 'published-paper-optimizing-neural-networks',
    title: 'Published Paper: "Optimizing Neural Networks"',
    description: 'Authored and published a research paper in the Journal of AI Research, focusing on novel optimization techniques for deep neural networks.',
    date: 'July 2025',
  },
  {
    slug: 'mentored-open-source-project-team',
    title: 'Mentored Open-Source Project Team',
    description: 'Guided a team of junior developers through the development lifecycle of a new open-source project, focusing on best practices and collaborative coding.',
    date: 'June 2025',
  },
];

const ActivityPage = () => {
  return (
    <SectionTransition>
      <div className="min-h-screen bg-gray-900 text-white">
        {/* Hero Section for Title */}
        <section className="relative h-64 flex items-center justify-center bg-gradient-to-r from-purple-600 to-blue-600">
          <div className="text-center">
            <h1 className="text-5xl font-extrabold tracking-tight leading-tight mb-4">My Journey: Activities, Projects & Research</h1>
            <p className="text-xl text-gray-200">Exploring, Building, and Innovating</p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-16">
          {/* Ongoing Projects */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold text-center mb-12">Ongoing Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {activities.filter(act => act.slug.startsWith('project')).map((project, index) => (
                <Link key={index} href={`/activity/${project.slug}`} className="block bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl">
                  <div className="p-8">
                    <h3 className={`text-2xl font-bold mb-3 ${index === 0 ? 'text-purple-400' : index === 1 ? 'text-green-400' : 'text-red-400'}`}>{project.title}</h3>
                    <p className="text-gray-300 mb-4">{project.description}</p>
                    <div className="flex items-center text-sm text-gray-400">
                      {/* Placeholder SVG based on index for now */}
                      {index === 0 && <svg className="w-4 h-4 mr-2 text-blue-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l3 3a1 1 0 001.414-1.414L11 9.586V6z" clipRule="evenodd"></path></svg>}
                      {index === 1 && <svg className="w-4 h-4 mr-2 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path></svg>}
                      {index === 2 && <svg className="w-4 h-4 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm0 4a1 1 0 000 2h6a1 1 0 100-2H7zm0 4a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd"></path></svg>}
                      <span>Status: {project.status}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Research Interests */}
          <section className="mb-20">
            <h2 className="text-4xl font-bold text-center mb-12">Research Interests</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {activities.filter(act => !act.slug.startsWith('project') && !act.slug.startsWith('attended') && !act.slug.startsWith('published') && !act.slug.startsWith('mentored')).map((research, index) => (
                <Link key={index} href={`/activity/${research.slug}`} className="block bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl">
                  <div className="p-8">
                    <h3 className={`text-2xl font-bold mb-3 ${index === 0 ? 'text-teal-400' : 'text-orange-400'}`}>{research.title}</h3>
                    <p className="text-gray-300">{research.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Recent Activities (Timeline-like) */}
          <section>
            <h2 className="text-4xl font-bold text-center mb-12">Recent Activities</h2>
            <div className="relative border-l-4 border-blue-500 pl-8">
              {activities.filter(act => act.slug.startsWith('attended') || act.slug.startsWith('published') || act.slug.startsWith('mentored')).map((activity, index) => (
                <Link key={index} href={`/activity/${activity.slug}`} className="block mb-10 flex items-start group">
                  <div className="absolute w-4 h-4 bg-blue-500 rounded-full -left-2 top-1 border-2 border-white"></div>
                  <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex-grow transform transition duration-300 group-hover:scale-[1.02]">
                    <h3 className="text-xl font-semibold mb-2 text-blue-300">{activity.title}</h3>
                    <p className="text-gray-300">{activity.description}</p>
                    <span className="text-sm text-gray-500 mt-2 block">{activity.date}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <div className="mt-10 text-center">
            <Link
              href="/"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
            >
              Back to Home Profile
            </Link>
          </div>
        </div>
      </div>
    </SectionTransition>
  );
};

export default ActivityPage;
