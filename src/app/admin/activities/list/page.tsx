'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin-layout';
import Link from 'next/link';
import apiClient from '@/libs/api-client';

interface ProjectItem {
  id: string;
  name: string;
}

interface ActivityItem {
  id: string;
  title: string;
  slug: string;
  date: string;
  content: string;
  relatedProjectIds: string[];
}

export default function ActivitiesListPage() {
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [availableProjects, setAvailableProjects] = useState<ProjectItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Activities
        const activitiesResponse = await apiClient.get<ActivityItem[]>('/api/activities');
        setActivities(activitiesResponse.data);

        // Fetch Available Projects
        const projectsResponse = await apiClient.get<ProjectItem[]>('/api/projects');
        setAvailableProjects(projectsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleDeleteClick = async (id: string) => {
    if (confirm('Are you sure you want to delete this activity?')) {
      try {
        await apiClient.delete(`/api/activities/${id}`);
        // If successful, update state to remove the deleted activity
        setActivities(activities.filter(activity => activity.id !== id));
      } catch (error) {
        console.error('Error deleting activity:', error);
        alert('Failed to delete activity.');
      }
    }
  };

  const getProjectNames = (projectIds: string[]) => {
    return projectIds.map(id => availableProjects.find(project => project.id === id)?.name || 'Unknown').join(', ');
  };

  return (
    <AdminLayout>
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Activity Management</h2>

      {/* Activities List */}
      <div className="bg-white p-8 rounded-lg shadow-xl border border-gray-200">
        <h3 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-3">Existing Activities</h3>
        <div className="mb-4">
          <Link href="/admin/activities/add">
            <button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Add New Activity
            </button>
          </Link>
        </div>
        {activities.length === 0 ? (
          <p className="text-gray-600">No activities added yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Related Projects</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {activities.map((activity) => (
                  <tr key={activity.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{activity.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{activity.slug}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{activity.date}</td>
                    <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">{getProjectNames(activity.relatedProjectIds)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link href={`/admin/activities/edit/${activity.id}`}>
                        <button
                          className="text-indigo-600 hover:text-indigo-900 mr-3"
                        >
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDeleteClick(activity.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
