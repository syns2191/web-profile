'use client'
import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin-layout';
import Link from 'next/link';
import apiClient from '@/libs/api-client';

interface ProjectItem {
  _id: string;
  projectTitle: string;
  projectShortDescription: string;
  projectImage: string;
}

export default function ProjectsListPage() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiClient.get<ProjectItem[]>('/api/projects', {
          params: {
            projectTitle: ''
          }
        });
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching tech categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleDeleteClick = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await apiClient.delete(`/api/projects/${id}`);
        // If successful, update state to remove the deleted project
        setProjects(projects.filter(project => project._id !== id));
      } catch (error) {
        console.error('Error deleting project:', error);
        alert('Failed to delete project.');
      }
    }
  };

  return (
    <AdminLayout>
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Project Management</h2>

      {/* Projects List */}
      <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg border-t border-gray-100">
        <h3 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-3">Existing Projects</h3>
        <div className="mb-4">
          <Link href="/admin/projects/add">
            <button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Add New Project
            </button>
          </Link>
        </div>
        {projects.length === 0 ? (
          <p className="text-gray-600">No projects added yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Project Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Description</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {projects.map((project) => (
                  <tr key={project._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{project.projectTitle}</td>
                    <td className="px-6 py-4 whitespace-normal text-sm text-gray-600 max-w-xs overflow-hidden text-ellipsis">{project.projectShortDescription}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link href={`/admin/projects/edit/${project._id}`}>
                        <button
                          className="text-indigo-600 hover:text-indigo-700 mr-3"
                        >
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDeleteClick(project._id)}
                        className="text-red-600 hover:text-red-700"
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
