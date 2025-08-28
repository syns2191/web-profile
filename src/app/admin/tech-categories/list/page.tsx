'use client';

import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin-layout';
import Link from 'next/link';
import apiClient from '@/libs/api-client';

interface TechCategory {
  _id: string;
  categoryName: string;
}

export default function TechCategoriesListPage() {
  const [categories, setCategories] = useState<TechCategory[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiClient.get<TechCategory[]>('/api/skill-categories', {
          params: {
            categoryName: ''
          }
        });
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching tech categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleDeleteClick = async (id: string) => {
    if (confirm('Are you sure you want to delete this category?')) {
      try {
        await apiClient.delete(`/api/tech-categories/${id}`);
        setCategories(categories.filter(cat => cat._id !== id));
      } catch (error) {
        console.error('Error deleting tech category:', error);
        alert('Failed to delete category.');
      }
    }
  };

  return (
    <AdminLayout>
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Tech Category Management</h2>

      {/* Categories List */}
      <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg border-t border-gray-100 mb-8">
        <h3 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-3">Existing Categories</h3>
        <div className="mb-4">
          <Link href="/admin/tech-categories/add">
            <button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Add New Category
            </button>
          </Link>
        </div>
        {categories.length === 0 ? (
          <p className="text-gray-600">No categories added yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Name</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {categories.map((category) => (
                  <tr key={category._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{category.categoryName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link href={`/admin/tech-categories/edit/${category._id}`}>
                        <button
                          className="text-indigo-600 hover:text-indigo-700 mr-3"
                        >
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDeleteClick(category._id)}
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
