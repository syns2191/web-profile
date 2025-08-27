'use client';

import React, { useState } from 'react';
import AdminLayout from '@/components/admin-layout';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import apiClient from '@/libs/api-client';

// Removed unused TechCategory interface

export default function AddTechCategoryPage() {
  const router = useRouter();
  const [formName, setFormName] = useState('');

  // Removed useEffect for loading/saving from localStorage

  const handleAddCategory = async () => {
    if (!formName) {
      alert('Please fill in the category name.');
      return;
    }

    try {
      await apiClient.post('/api/skill-categories', { categoryName: formName });

      // Optionally, you can get the new category from the response if the API returns it
      // const newCategory: TechCategory = response.data;

      // Clear form fields
      setFormName('');
      router.push('/admin/tech-categories/list'); // Redirect back to list
    } catch (error) {
      console.error('Error adding tech category:', error);
      alert('Failed to add category.');
    }
  };

  return (
    <AdminLayout>
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Add New Tech Category</h2>

      {/* Add Form */}
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
            onClick={handleAddCategory}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add Category
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
}
