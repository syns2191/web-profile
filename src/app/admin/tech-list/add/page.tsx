'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin-layout';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import apiClient from '@/libs/api-client';

// Removed unused TechItem interface

interface TechCategory {
  id: string;
  name: string;
}

export default function AddTechItemPage() {
  const router = useRouter();
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState('');
  const [formIconUrl, setFormIconUrl] = useState('');
  const [availableCategories, setAvailableCategories] = useState<TechCategory[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiClient.get<TechCategory[]>('/api/tech-categories');
        setAvailableCategories(response.data);
      } catch (error) {
        console.error('Error fetching tech categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleAddTech = async () => {
    if (!formName || !formCategory || !formIconUrl) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      await apiClient.post('/api/tech-stack/category', {
        stackName: formName,
        category: formCategory, // Send category ID
        stackIcon: formIconUrl,
      });

      // Clear form fields
      setFormName('');
      setFormCategory('');
      setFormIconUrl('');

      router.push('/admin/tech-list/list'); // Redirect back to list
    } catch (error) {
      console.error('Error adding tech item:', error);
      alert('Failed to add tech item.');
    }
  };

  return (
    <AdminLayout>
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Add New Tech Item</h2>

      {/* Add Form */}
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
            <select
              id="techCategory"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={formCategory}
              onChange={(e) => setFormCategory(e.target.value)}
            >
              <option value="">Select a category</option>
              {availableCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
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
            onClick={handleAddTech}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add Tech
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
