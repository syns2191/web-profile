// src/components/task-card-detail.tsx
import React, { useState } from 'react';

interface ChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

interface TaskCardDetailProps {
  task: {
    id: string;
    title: string;
    description: string;
    status: 'todo' | 'in-progress' | 'done';
  };
  onClose: () => void;
}

const TaskCardDetail: React.FC<TaskCardDetailProps> = ({ task, onClose }) => {
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([]);
  const [newItemText, setNewItemText] = useState('');

  const handleAddItem = () => {
    if (newItemText.trim() !== '') {
      const newItem: ChecklistItem = {
        id: Date.now().toString(), // Simple unique ID
        text: newItemText,
        completed: false,
      };
      setChecklistItems([...checklistItems, newItem]);
      setNewItemText('');
    }
  };

  const handleToggleItem = (id: string) => {
    setChecklistItems(checklistItems.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };
  if (!task) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
        >
          &times;
        </button>
        <h2 className="font-playfair font-bold text-2xl mb-4 text-neutral-800">{task.title}</h2>
        <p className="text-neutral-600 mb-4">{task.description}</p>

        <div className="mt-6">
          <h3 className="font-playfair font-semibold text-lg mb-2 text-neutral-700">Checklist</h3>
          <div className="space-y-2 mb-4">
            {checklistItems.length === 0 && <p className="text-neutral-500">No checklist items yet.</p>}
            {checklistItems.map((item) => (
              <div key={item.id} className="flex items-center">
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => handleToggleItem(item.id)}
                  className="mr-2"
                />
                <span className={`${item.completed ? 'line-through text-neutral-500' : 'text-neutral-800'}`}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              value={newItemText}
              onChange={(e) => setNewItemText(e.target.value)}
              placeholder="Add a checklist item"
              className="flex-grow p-2 border border-neutral-300 rounded-md mr-2"
            />
            <button
              onClick={handleAddItem}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCardDetail;
