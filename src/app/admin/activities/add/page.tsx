'use client';

import React, { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import AdminLayout from '@/components/admin-layout';
import MultiSelectCheckbox from '@/components/multi-select-checkbox';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import apiClient from '@/libs/api-client';

const SimpleMdeReact = dynamic(() => import('react-simplemde-editor'), { ssr: false });
import 'easymde/dist/easymde.min.css';
import '@/styles/easymde-custom.css'; // Our custom styles

interface ProjectItem {
  id: string;
  name: string;
}

// Removed unused ActivityItem interface

export default function AddActivityPage() {
  const router = useRouter();
  const [availableProjects, setAvailableProjects] = useState<ProjectItem[]>([]);
  const [formTitle, setFormTitle] = useState('');
  const [formSlug, setFormSlug] = useState('');
  const [formDate, setFormDate] = useState('');
  const [formContent, setFormContent] = useState('');
  const [selectedProjectIds, setSelectedProjectIds] = useState<string[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await apiClient.get<ProjectItem[]>('/api/projects');
        setAvailableProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    fetchProjects();
  }, []);

  const handleAddActivity = async () => {
    if (!formTitle || !formSlug || !formDate || !formContent) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      await apiClient.post('/api/activities', {
        title: formTitle,
        slug: formSlug,
        date: formDate,
        content: formContent,
        relatedProjectIds: selectedProjectIds,
      });

      // Clear form fields
      setFormTitle('');
      setFormSlug('');
      setFormDate('');
      setFormContent('');
      setSelectedProjectIds([]);

      router.push('/admin/activities/list'); // Redirect back to list
    } catch (error) {
      console.error('Error adding activity:', error);
      alert('Failed to add activity.');
    }
  };

  const mdeOptions: EasyMDE.Options = useMemo(() => {
    return {
      spellChecker: false,
      autofocus: true,
      placeholder: "Write your activity content here...",
      status: ["autosave", "lines", "words", "cursor"], // Enable status bar
      toolbar: [
        "bold", "italic", "heading", "|", "quote", "unordered-list", "ordered-list", "|",
        "link", "image", "code", "horizontal-rule", "strikethrough", "|",
        "preview", "side-by-side", "fullscreen", "|", "guide"
      ],
    };
  }, []);

  return (
    <AdminLayout>
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Add New Activity</h2>

      {/* Add Form */}
      <div className="bg-white p-8 rounded-lg shadow-xl mb-8 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="activityTitle" className="block text-gray-700 text-sm font-medium mb-2">Title:</label>
            <input
              type="text"
              id="activityTitle"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              placeholder="e.g., New Feature Launch"
            />
          </div>
          <div>
            <label htmlFor="activitySlug" className="block text-gray-700 text-sm font-medium mb-2">Slug:</label>
            <input
              type="text"
              id="activitySlug"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={formSlug}
              onChange={(e) => setFormSlug(e.target.value)}
              placeholder="e.g., new-feature-launch"
            />
          </div>
          <div>
            <label htmlFor="activityDate" className="block text-gray-700 text-sm font-medium mb-2">Date:</label>
            <input
              type="date"
              id="activityDate"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={formDate}
              onChange={(e) => setFormDate(e.target.value)}
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="activityContent" className="block text-gray-700 text-sm font-medium mb-2">Content (Markdown):</label>
            <SimpleMdeReact
              value={formContent}
              onChange={setFormContent}
              options={mdeOptions}
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="relatedProjects" className="block text-gray-700 text-sm font-medium mb-2">Related Projects:</label>
            <MultiSelectCheckbox
              options={availableProjects}
              selectedValues={selectedProjectIds}
              onChange={setSelectedProjectIds}
              placeholder="Select related projects"
            />
            {availableProjects.length === 0 && (
              <p className="text-sm text-gray-500 mt-2">No projects available. Add some in &apos;Projects&apos; first.</p>
            )}
          </div>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleAddActivity}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add Activity
          </button>
          <Link href="/admin/activities/list">
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
