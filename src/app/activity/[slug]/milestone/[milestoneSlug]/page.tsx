'use client';

import { SectionTransition } from '@/components/section-transition';
import { notFound } from 'next/navigation';
import React, { useState } from 'react';

// Dummy data for activities (same as in src/app/activity/[slug]/page.tsx)
const activities = [
  {
    slug: 'project-alpha-ai-recommendation-engine',
    title: 'Project Alpha: AI Recommendation Engine',
    description: 'Developing a cutting-edge AI-powered recommendation system using machine learning and big data analytics. This project involves building scalable data pipelines, training complex neural networks, and deploying models in a production environment. Key technologies include TensorFlow, Apache Spark, and Kubernetes.',
    status: 'In Progress',
    date: 'Started: January 2025',
    details: [
      'Designed and implemented data ingestion pipelines.',
      'Developed and trained various machine learning models.',
      'Integrated the recommendation engine with existing user interfaces.',
      'Conducted A/B testing and performance optimization.',
    ],
    image: '/images/project-alpha.png', // Placeholder image
    milestones: [
      { milestoneSlug: 'project-inception', date: 'January 2025', title: 'Project Inception', description: 'Initial planning and team formation.' },
      { milestoneSlug: 'data-pipeline-setup', date: 'February 2025', title: 'Data Pipeline Setup', description: 'Established data ingestion and processing pipelines.' },
      { milestoneSlug: 'model-prototyping', date: 'April 2025', title: 'Model Prototyping', description: 'Developed initial machine learning model prototypes.' },
      { milestoneSlug: 'system-integration', date: 'June 2025', title: 'System Integration', description: 'Integrated the recommendation engine with the front-end application.' },
    ],
  },
  {
    slug: 'project-beta-decentralized-blockchain-app',
    title: 'Project Beta: Decentralized Blockchain App',
    description: 'Building a secure and scalable decentralized application on the Ethereum blockchain with smart contract integration. This dApp aims to revolutionize peer-to-peer transactions with enhanced transparency and security. Technologies used include Solidity, Web3.js, and Hardhat.',
    status: '70% Complete',
    date: 'Started: March 2025',
    details: [
      'Developed and audited smart contracts.',
      'Built a responsive front-end using React and Web3.js.',
      'Deployed contracts to testnets and mainnet.',
      'Implemented user authentication and wallet integration.',
    ],
    image: '/images/project-beta.png', // Placeholder image
    milestones: [
      { milestoneSlug: 'smart-contract-design', date: 'March 2025', title: 'Smart Contract Design', description: 'Designed and drafted initial smart contracts.' },
      { milestoneSlug: 'frontend-development', date: 'April 2025', title: 'Frontend Development', description: 'Started building the user interface with React.' },
      { milestoneSlug: 'security-audit', date: 'June 2025', title: 'Security Audit', description: 'Completed initial security audit of smart contracts.' },
      { milestoneSlug: 'testnet-deployment', date: 'July 2025', title: 'Testnet Deployment', description: 'Deployed the dApp to a testnet for public testing.' },
    ],
  },
  {
    slug: 'project-gamma-iot-smart-home-system',
    title: 'Project Gamma: IoT Smart Home System',
    description: 'Designing and implementing an integrated IoT smart home system for enhanced automation and energy efficiency. This project focuses on creating a seamless user experience through interconnected devices and a centralized control hub. Technologies include Raspberry Pi, MQTT, and Node.js.',
    status: 'Planning Phase',
    date: 'Started: July 2025',
    details: [
      'Researched and selected appropriate hardware components.',
      'Designed the system architecture and communication protocols.',
      'Developed firmware for various IoT devices.',
      'Planned for future integration with voice assistants.',
    ],
    image: '/images/project-gamma.png', // Placeholder image
    milestones: [
      { milestoneSlug: 'hardware-selection', date: 'July 2025', title: 'Hardware Selection', description: 'Researched and finalized hardware components.' },
      { milestoneSlug: 'system-architecture', date: 'August 2025', title: 'System Architecture', description: 'Designed the overall system architecture.' },
    ],
  },
  {
    slug: 'attended-future-of-ai-conference',
    title: 'Attended "Future of AI" Conference',
    description: 'Participated in keynotes and workshops on the latest advancements in artificial intelligence and machine learning in San Francisco. Gained insights into cutting-edge research, industry trends, and networking opportunities with leading experts.',
    date: 'August 2025',
    details: [
      'Attended sessions on Generative AI and Large Language Models.',
      'Participated in a hands-on workshop on MLOps best practices.',
      'Networked with researchers from Google AI and OpenAI.',
      'Explored new tools and frameworks for AI development.',
    ],
    image: '/images/conference.png', // Placeholder image
    milestones: [
      { milestoneSlug: 'day-1-keynote', date: 'August 1, 2025', title: 'Day 1 Keynote', description: 'Opening keynote on the future of AI.' },
      { milestoneSlug: 'mlops-workshop', date: 'August 2, 2025', title: 'MLOps Workshop', description: 'Hands-on session on MLOps.' },
      { milestoneSlug: 'networking-event', date: 'August 3, 2025', title: 'Networking Event', description: 'Met with industry leaders and researchers.' },
    ],
  },
  {
    slug: 'published-paper-optimizing-neural-networks',
    title: 'Published Paper: "Optimizing Neural Networks"',
    description: 'Authored and published a research paper in the Journal of AI Research, focusing on novel optimization techniques for deep neural networks. The paper presents a new algorithm that significantly reduces training time while maintaining model accuracy.',
    date: 'July 2025',
    details: [
      'Conducted extensive literature review on neural network optimization.',
      'Developed a novel optimization algorithm.',
      'Performed experiments on various datasets and architectures.',
      'Wrote and submitted the paper for peer review.',
    ],
    image: '/images/paper.png', // Placeholder image
    milestones: [
      { milestoneSlug: 'research-commencement', date: 'January 2025', title: 'Research Commencement', description: 'Began literature review and problem definition.' },
      { milestoneSlug: 'algorithm-development', date: 'April 2025', title: 'Algorithm Development', description: 'Developed and refined the optimization algorithm.' },
      { milestoneSlug: 'experimentation-results', date: 'June 2025', title: 'Experimentation & Results', description: 'Conducted experiments and analyzed results.' },
      { milestoneSlug: 'paper-submission', date: 'July 2025', title: 'Paper Submission', description: 'Submitted the paper to Journal of AI Research.' },
    ],
  },
  {
    slug: 'mentored-open-source-project-team',
    title: 'Mentored Open-Source Project Team',
    description: 'Guided a team of junior developers through the development lifecycle of a new open-source project, focusing on best practices and collaborative coding. Provided technical guidance, code reviews, and mentorship on software engineering principles.',
    date: 'June 2025',
    details: [
      'Assisted in project planning and task breakdown.',
      'Provided guidance on version control and collaborative workflows.',
      'Conducted regular code reviews and provided constructive feedback.',
      'Helped resolve technical challenges and debugging issues.',
    ],
    image: '/images/mentoring.png', // Placeholder image
    milestones: [
      { milestoneSlug: 'project-kick-off', date: 'June 1, 2025', title: 'Project Kick-off', description: 'Initial meeting and project setup.' },
      { milestoneSlug: 'first-code-review', date: 'June 15, 2025', title: 'First Code Review', description: 'Reviewed initial contributions and provided feedback.' },
      { milestoneSlug: 'feature-implementation', date: 'July 1, 2025', title: 'Feature Implementation', description: 'Guided team through core feature development.' },
      { milestoneSlug: 'deployment-assistance', date: 'July 15, 2025', title: 'Deployment Assistance', description: 'Assisted with project deployment and testing.' },
    ],
  },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MilestoneDetailPage = ({ params }: any) => {
  const { slug, milestoneSlug } = params;

  const activity = activities.find((act) => act.slug === slug);

  if (!activity) {
    notFound();
  }

  const milestone = activity.milestones?.find((m) => m.milestoneSlug === milestoneSlug);

  if (!milestone) {
    notFound();
  }

  interface Comment {
    id: string;
    author: string;
    text: string;
    timestamp: string;
  }

  const [comments, setComments] = useState<Comment[]>([
    { id: 'c1', author: 'John Doe', text: 'Great work on this milestone!', timestamp: '2025-08-20T10:00:00Z' },
    { id: 'c2', author: 'Jane Smith', text: 'I learned a lot from this project.', timestamp: '2025-08-21T14:30:00Z' },
  ]);
  const [newCommentText, setNewCommentText] = useState('');

  const handleAddComment = () => {
    if (newCommentText.trim() === '') return;

    const newComment: Comment = {
      id: `c${Date.now()}`,
      author: 'Anonymous', // In a real app, this would be the logged-in user's name
      text: newCommentText,
      timestamp: new Date().toISOString(),
    };

    setComments((prevComments) => [...prevComments, newComment]);
    setNewCommentText('');
  };

  return (
    <SectionTransition>
      <div className="min-h-screen bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="bg-gray-800 rounded-xl shadow-2xl p-8 md:p-12 lg:p-16 mb-8">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-yellow-400 mb-4 leading-tight">
              {milestone.title}
            </h1>
            <p className="text-gray-400 text-lg mb-6">{milestone.date}</p>
            <p className="text-gray-300 text-xl leading-relaxed mb-8">
              {milestone.description}
            </p>

            <div className="mt-10 text-center">
              <a
                href={`/activity/${slug}`}
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
              >
                Back to {activity.title}
              </a>
            </div>
          </div>

          {/* Comment Section */}
          <div className="bg-gray-800 rounded-xl shadow-2xl p-8 md:p-12 lg:p-16">
            <h2 className="text-3xl font-bold text-purple-400 mb-6">Comments</h2>

            {/* Comment List */}
            <div className="mb-8 max-h-96 overflow-y-auto pr-4">
              {comments.length === 0 ? (
                <p className="text-gray-500">No comments yet. Be the first to comment!</p>
              ) : (
                comments.map((comment) => (
                  <div key={comment.id} className="bg-gray-700 p-4 rounded-lg mb-4 shadow-md">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-blue-300">{comment.author}</span>
                      <span className="text-sm text-gray-400">{new Date(comment.timestamp).toLocaleString()}</span>
                    </div>
                    <p className="text-gray-300">{comment.text}</p>
                  </div>
                ))
              )}
            </div>

            {/* Add Comment Form */}
            <div className="border-t border-gray-700 pt-6">
              <h3 className="text-xl font-semibold text-yellow-400 mb-4">Add a Comment</h3>
              <textarea
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                rows={4}
                placeholder="Write your comment here..."
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
              ></textarea>
              <button
                onClick={handleAddComment}
                className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Post Comment
              </button>
            </div>
          </div>
        </div>
      </div>
    </SectionTransition>
  );
};

export default MilestoneDetailPage;