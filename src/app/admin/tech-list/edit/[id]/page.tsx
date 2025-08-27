'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin-layout';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import apiClient from '@/libs/api-client';
import SingleSelect from '@/components/single-select'; // Import the new component

interface TechItem {
  _id: string;
  category: {
    _id: string;
    categoryName: string;
  };
  stack: {
    _id: string;
    stackName: string;
    stackIcon: string;
  };
}

interface TechCategory {
  _id: string;
  categoryName: string;
}

interface CategoryOption {
  id: string;
  name: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function EditTechItemPage({ params }: any) {
  const router = useRouter();
  const { id } = params; // Get ID from URL
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState(''); // This will store category ID
  const [formIconUrl, setFormIconUrl] = useState('');
  const [availableCategories, setAvailableCategories] = useState<CategoryOption[]>([]);

  useEffect(() => {
    const fetchTechItemAndCategories = async () => {
      try {
        // Fetch Tech Item
        const techItemResponse = await apiClient.get<TechItem>(`/api/tech-stack/category/${id}`);
        const stackCategory: TechItem = techItemResponse.data;
        setFormName(stackCategory.stack.stackName);
        setFormCategory(stackCategory.category._id); // Set category ID
        setFormIconUrl(stackCategory.stack.stackIcon);

        // Fetch Categories
        const categoriesResponse = await apiClient.get<TechCategory[]>('/api/skill-categories', {
          params: {
            categoryName: ''
          }
        });
        const categoryData = categoriesResponse.data;
        const categoryMapped = categoryData.map((item) => ({
          id: item._id,
          name: item.categoryName
        }));
        setAvailableCategories(categoryMapped);
      } catch (error) {
        console.error('Error fetching data:', error);
        alert('Failed to load data.');
        router.push('/admin/tech-list/list');
      }
    };
    fetchTechItemAndCategories();
  }, [id, router]);

  const handleUpdateTech = async () => {
    if (!formName || !formCategory || !formIconUrl) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      await apiClient.patch(`/api/tech-stack/category/${id}`, {
        stackName: formName,
        category: formCategory, // Send category ID
        stackIcon: formIconUrl
      });
      router.push('/admin/tech-list/list'); // Redirect back to list
    } catch (error) {
      console.error('Error updating tech item:', error);
      alert('Failed to update tech item.');
    }
  };

  return (
    <AdminLayout>
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Edit Tech Item</h2>

      {/* Edit Form */}
      <div className="bg-white p-8 rounded-lg shadow-xl mb-8 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div>
            <label htmlFor="techName" className="block text-gray-700 text-sm font-medium mb-2">Name:</label>
            <input
              type="text"
              id="techName"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              placeholder="e.g., React"
            />
          </div>
          <div>
            <label htmlFor="techCategory" className="block text-gray-700 text-sm font-medium mb-2">Category:</label>
            <SingleSelect
              options={availableCategories}
              value={formCategory}
              onChange={setFormCategory}
              placeholder="Select a category"
            />
          </div>
          <div>
            <label htmlFor="techIconUrl" className="block text-gray-700 text-sm font-medium mb-2">Icon URL:</label>
            <input
              type="text"
              id="techIconUrl"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={formIconUrl}
              onChange={(e) => setFormIconUrl(e.target.value)}
              placeholder="e.g., https://example.com/icon.png"
            />
          </div>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleUpdateTech}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Save Changes
          </button>
          <Link href="/admin/tech-list/list">
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
