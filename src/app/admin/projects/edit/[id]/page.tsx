'use client'
import { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import MultiSelectCheckbox from '@/components/multi-select-checkbox';
import AdminLayout from '@/components/admin-layout';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const SimpleMdeReact = dynamic(() => import('react-simplemde-editor'), { ssr: false });
import 'easymde/dist/easymde.min.css';
import EasyMDE from 'easymde';
import apiClient from '@/libs/api-client';

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
}

interface TechOptionLis {
  id: string;
  name: string;
}

interface ProjectItem {
  _id: string;
  projectTitle: string;
  projectShortDescription: string;
  projectTeachStack: {
    _id: string;
    stackName: string;
    stackIcon: string;
  }[]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function EditProjectPage({ params }: any) {
  const router = useRouter();
  const { id } = params; // Get ID from URL
  const [availableTechs, setAvailableTechs] = useState<TechOptionLis[]>([]);
  const [formName, setFormName] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [selectedTechIds, setSelectedTechIds] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Project Details
        const projectResponse = await apiClient.get<ProjectItem>(`/api/projects/${id}`);
        const project: ProjectItem = projectResponse.data;
        setFormName(project.projectTitle);
        setFormDescription(project.projectShortDescription);
        const selectedTechs = project.projectTeachStack.map((item) => item._id);
        setSelectedTechIds(selectedTechs);

        // Fetch Available Technologies
        const techListResponse = await apiClient.get<TechItem[]>('/api/tech-stack/category');
        const dataMapped = techListResponse.data.map((item) => ({
          id: item._id,
          name: item.stack.stackName
        }));
        setAvailableTechs(dataMapped);
      } catch (error) {
        console.error('Error fetching data:', error);
        alert('Failed to load project or technologies.');
        router.push('/admin/projects/list');
      }
    };
    fetchData();
  }, [id, router]);

  const handleUpdateProject = async () => {
    if (!formName || !formDescription) {
      alert('Please fill in project name and description.');
      return;
    }

    try {
      await apiClient.patch(`/api/projects/${id}`, {
        projectTitle: formName,
        projectShortDescription: formDescription,
        projectTeachStack: selectedTechIds
      });

      router.push('/admin/projects/list'); // Redirect back to list
    } catch (error) {
      console.error('Error updating project:', error);
      alert('Failed to update project.');
    }
  };

  const mdeOptions: EasyMDE.Options = useMemo(() => {
    return {
      spellChecker: false,
      autofocus: true,
      placeholder: "Write your project description here...",
      status: ["autosave", "lines", "words", "cursor"], // Enable status bar
      toolbar: [
        "bold", "italic", "heading", "quote", "unordered-list", "ordered-list",
        "link", "image", "code", "horizontal-rule", "strikethrough",
        "preview", "side-by-side", "fullscreen", "guide"
      ],
    };
  }, []);

  return (
    <AdminLayout>
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Edit Project</h2>

      {/* Edit Form */}
      <div className="bg-white p-8 rounded-lg shadow-xl mb-8 border border-gray-200">
        <div className="grid grid-cols-1 gap-6 mb-6">
          <div>
            <label htmlFor="projectName" className="block text-gray-700 text-sm font-medium mb-2">Project Name:</label>
            <input
              type="text"
              id="projectName"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              placeholder="e.g., My Awesome Portfolio"
            />
          </div>
          <div>
            <label htmlFor="projectDescription" className="block text-gray-700 text-sm font-medium mb-2">Description:</label>
            <SimpleMdeReact
              value={formDescription}
              onChange={setFormDescription}
              options={mdeOptions}
            />
          </div>
          <div>
            <label htmlFor="projectTechs" className="block text-gray-700 text-sm font-medium mb-2">Technologies Used:</label>
            <MultiSelectCheckbox
              options={availableTechs}
              selectedValues={selectedTechIds}
              onChange={setSelectedTechIds}
              placeholder="Select technologies"
            />
            {availableTechs.length === 0 && (
              <p className="text-sm text-gray-500 mt-2">No technologies available. Add some in &apos;Tech List&apos; first.</p>
            )}
          </div>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleUpdateProject}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Save Changes
          </button>
          <Link href="/admin/projects/list">
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
