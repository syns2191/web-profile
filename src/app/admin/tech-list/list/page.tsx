'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin-layout';
import Link from 'next/link';
import apiClient from '@/libs/api-client';
import StackIcon from 'tech-stack-icons';

interface TechItem {
  _id: string;
  stack: {
    stackName: string;
    stackIcon: string;
  },
  category: {
    _id: string;
    categoryName: string;
  };
  iconUrl: string;
}

export default function TechListPage() {
  const [techList, setTechList] = useState<TechItem[]>([]);

  useEffect(() => {
    // Load tech list from localStorage on component mount
    const fetchCategories = async () => {
      try {
        const response = await apiClient.get<TechItem[]>('/api/tech-stack/category', {
          params: {
            stackName: ''
          }
        });
        setTechList(response.data);
      } catch (error) {
        console.error('Error fetching tech categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleDeleteClick = async (id: string) => {
    if (confirm('Are you sure you want to delete this tech item?')) {
      try {
        await apiClient.delete(`/api/tech-stack/category/${id}`);
        // If successful, update state to remove the deleted tech item
        setTechList(techList.filter(tech => tech._id !== id));
      } catch (error) {
        console.error('Error deleting tech item:', error);
        alert('Failed to delete tech item.');
      }
    }
  };

  return (
    <AdminLayout>
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Tech List Management</h2>

      {/* Tech List */}
      <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg border-t border-gray-100 mb-8">
        <h3 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-3">Existing Tech Items</h3>
        <div className="mb-4">
          <Link href="/admin/tech-list/add">
            <button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Add New Tech Item
            </button>
          </Link>
        </div>
        {techList.length === 0 ? (
          <p className="text-gray-600">No tech items added yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Icon</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Category</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {techList.map((tech) => (
                  <tr key={tech._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {tech.stack.stackIcon && <StackIcon className='w-8' name={tech.stack.stackIcon} />}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{tech.stack.stackName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{tech.category.categoryName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link href={`/admin/tech-list/edit/${tech._id}`}>
                        <button
                          className="text-indigo-600 hover:text-indigo-700 mr-3"
                        >
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDeleteClick(tech._id)}
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
