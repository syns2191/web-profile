'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin-layout';
import { useRouter } from 'next/navigation'; // eslint-disable-line @typescript-eslint/no-unused-vars
import Link from 'next/link';
import apiClient from '@/libs/api-client';

interface TechCategory {
  _id: string;
  categoryName: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function EditTechCategoryPage({ params: { id } }: any) {
  const router = useRouter();
  const [formName, setFormName] = useState('');

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await apiClient.get<TechCategory>(`/api/skill-categories/${id}`);
        setFormName(response.data.categoryName);
      } catch (error) {
        console.error('Error fetching tech category:', error);
        alert('Failed to load category.');
        router.push('/admin/tech-categories/list'); // Redirect back if category not found or error
      }
    };
    fetchCategory();
  }, [id, router]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleUpdateCategory = async () => {
    if (!formName) {
      alert('Please fill in the category name.');
      return;
    }

    try {
      await apiClient.patch(`/api/skill-categories/${id}`, { categoryName: formName });
      router.push('/admin/tech-categories/list'); // Redirect back to list
    } catch (error) {
      console.error('Error updating tech category:', error);
      alert('Failed to update category.');
    }
  };

  return (
    <AdminLayout>
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Edit Tech Category</h2>

      {/* Edit Form */}
      <div className="bg-white p-8 rounded-lg shadow-xl mb-8 border border-gray-200">
        <div className="mb-6">
          <label htmlFor="categoryName" className="block text-gray-700 text-sm font-medium mb-2">Category Name:</label>
          <input
            type="text"
            id="categoryName"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            placeholder="e.g., Frontend Frameworks"
          />
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleUpdateCategory}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Save Changes
          </button>
          <Link href="/admin/tech-categories/list">
            <button
              className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
};

export default EditTechCategoryPage;
