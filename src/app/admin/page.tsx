'use client';

import React from 'react';
import AdminLayout from '@/components/admin-layout';

interface ProjectStats {
  totalProjects: number;
  completedProjects: number;
  inProgressProjects: number;
}

interface UserStats {
  totalUsers: number;
  newUsersToday: number;
  newUsersThisWeek: number;
  totalChatConversations: number;
}

interface RecentActivityItem {
  id: string;
  description: string;
  timestamp: string;
}

// Dummy Data for Dashboard Stats
const dummyProjectStats: ProjectStats = {
  totalProjects: 15,
  completedProjects: 10,
  inProgressProjects: 5,
};

const dummyUserStats: UserStats = {
  totalUsers: 1234,
  newUsersToday: 5,
  newUsersThisWeek: 35,
  totalChatConversations: 128,
};

const dummyRecentActivities: RecentActivityItem[] = [
  { id: 'act1', description: 'User &apos;John Doe&apos; logged in.', timestamp: '2025-08-25T10:30:00Z' },
  { id: 'act2', description: 'New project &apos;Portfolio V2&apos; added.', timestamp: '2025-08-25T09:15:00Z' },
  { id: 'act3', description: 'User &apos;Jane Smith&apos; registered.', timestamp: '2025-08-24T18:00:00Z' },
  { id: 'act4', description: 'Chat conversation with &apos;Alice&apos; started.', timestamp: '2025-08-24T14:45:00Z' },
  { id: 'act5', description: 'Project &apos;AI Engine&apos; status updated.', timestamp: '2025-08-23T11:00:00Z' },
];

export default function AdminDashboardPage() {
  return (
    <AdminLayout>
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Dashboard Overview</h2>

      {/* Project Statistics */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Project Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600">Total Projects</p>
              <p className="text-2xl font-bold text-blue-800">{dummyProjectStats.totalProjects}</p>
            </div>
            <svg className="h-8 w-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-1.25-3M15 10V5l-3-3-3 3v5m9 0a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h12a3 3 0 013 3v3z"></path></svg>
          </div>
          <div className="bg-green-50 p-4 rounded-lg flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600">Completed Projects</p>
              <p className="text-2xl font-bold text-green-800">{dummyProjectStats.completedProjects}</p>
            </div>
            <svg className="h-8 w-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-600">In Progress</p>
              <p className="text-2xl font-bold text-yellow-800">{dummyProjectStats.inProgressProjects}</p>
            </div>
            <svg className="h-8 w-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
        </div>
      </div>

      {/* User Engagement Statistics */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">User Engagement</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-purple-50 p-4 rounded-lg flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600">Total Users</p>
              <p className="text-2xl font-bold text-purple-800">{dummyUserStats.totalUsers}</p>
            </div>
            <svg className="h-8 w-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.165-1.294-.478-1.863C16.161 15.91 15.507 15 14.5 15h-5c-.998 0-1.652.91-2.022 1.137-.313.569-.478 1.21-.478 1.863v2m0 0H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.165-1.294.478-1.863C7.839 15.91 8.493 15 9.5 15h5c.998 0 1.652.91 2.022 1.137.313.569.478 1.21.478 1.863v2M15 9a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          </div>
          <div className="bg-red-50 p-4 rounded-lg flex items-center justify-between">
            <div>
              <p className="text-sm text-red-600">New Users Today</p>
              <p className="text-2xl font-bold text-red-800">{dummyUserStats.newUsersToday}</p>
            </div>
            <svg className="h-8 w-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM12 14c-1.49 0-2.92.6-4 1.667V19h8v-3.333C14.92 14.6 13.49 14 12 14z"></path></svg>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg flex items-center justify-between">
            <div>
              <p className="text-sm text-orange-600">New Users This Week</p>
              <p className="text-2xl font-bold text-orange-800">{dummyUserStats.newUsersThisWeek}</p>
            </div>
            <svg className="h-8 w-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.165-1.294-.478-1.863C16.161 15.91 15.507 15 14.5 15h-5c-.998 0-1.652.91-2.022 1.137-.313.569-.478 1.21-.478 1.863v2m0 0H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.165-1.294.478-1.863C7.839 15.91 8.493 15 9.5 15h5c.998 0 1.652.91 2.022 1.137.313.569.478 1.21.478 1.863v2M15 9a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          </div>
          <div className="bg-teal-50 p-4 rounded-lg flex items-center justify-between">
            <div>
              <p className="text-sm text-teal-600">Total Chat Conversations</p>
              <p className="text-2xl font-bold text-teal-800">{dummyUserStats.totalChatConversations}</p>
            </div>
            <svg className="h-8 w-8 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Recent Activity</h3>
        <ul>
          {dummyRecentActivities.map((activity) => (
            <li key={activity.id} className="mb-2 pb-2 border-b border-gray-200 last:border-b-0">
              <p className="text-gray-800">{activity.description} <span className="text-gray-500 text-sm">{new Date(activity.timestamp).toLocaleString()}</span></p>
            </li>
          ))}
        </ul>
      </div>
    </AdminLayout>
  );
}
