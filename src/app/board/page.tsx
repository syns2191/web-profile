'use client';

import React, { useState } from 'react';
import {
  DndContext,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { mockTasks } from '@/libs/mock-tasks';
import { SectionTransition } from '@/components/section-transition';
import TaskCardDetail from '@/components/task-card-detail';
import { useTheme } from '@/components/theme-provider';
import { ThemeSwitcher } from '@/components/theme-switcher';


type StatusTask = 'todo' | 'in-progress' | 'done';
type Task = {
  id: string;
  title: string;
  description: string;
  status: StatusTask
};

type Column = {
  id: string;
  title: string;
  taskIds: string[];
};

const initialColumns: Record<string, Column> = {
  'todo': {
    id: 'todo',
    title: 'To Do',
    taskIds: mockTasks.todo.map(task => task.id),
  },
  'in-progress': {
    id: 'in-progress',
    title: 'In Progress',
    taskIds: mockTasks['in-progress'].map(task => task.id),
  },
  'done': {
    id: 'done',
    title: 'Done',
    taskIds: mockTasks.done.map(task => task.id),
  },
};

const initialTasks: Record<string, Task> = {};
[...mockTasks.todo, ...mockTasks['in-progress'], ...mockTasks.done].forEach((task: Task) => {
  initialTasks[task.id] = task;
});

interface SortableTaskProps {
  task: Task;
  onClick: (task: Task) => void;
}

function SortableTask({ task, onClick }: SortableTaskProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 0,
    position: 'relative',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => onClick(task)}
      className={`bg-white/80 p-4 rounded-md shadow mb-3 vintage-shadow cursor-pointer ${isDragging ? 'border-2 border-blue-500' : ''}`}
    >
      <h3 className="font-playfair font-bold text-neutral-800">{task.title}</h3>
      <p className="text-sm text-neutral-600">{task.description}</p>
    </div>
  );
}

const BoardPage = () => {
  const [tasks, setTasks] = useState<Record<string, Task>>(initialTasks);
  const [columns, setColumns] = useState<Record<string, Column>>(initialColumns);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const { theme } = useTheme();

  const mainDivClasses = `min-h-screen w-full mx-auto relative ${theme === 'newspaper' ? 'paper-texture vintage-shadow' : ''}`;

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const findColumn = (id: string) => {
    if (id in columns) {
      return columns[id];
    }
    const task = tasks[id];
    if (task) {
      return columns[task.status];
    }
    return undefined;
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);

    const activeColumn = findColumn(activeId);
    const overColumn = findColumn(overId);

    if (!activeColumn || !overColumn || activeColumn !== overColumn) {
      // Moving between columns
      const newTasks = { ...tasks };
      const newColumns = { ...columns };

      const sourceColumn = activeColumn || findColumn(activeId);
      const destinationColumn = overColumn || findColumn(overId);

      if (!sourceColumn || !destinationColumn) return;

      const activeIndex = sourceColumn.taskIds.indexOf(activeId);
      const overIndex = destinationColumn.taskIds.indexOf(overId);

      if (sourceColumn.id === destinationColumn.id) {
        // This case should ideally be handled by the SortableContext, but as a fallback
        const newColumnTaskIds = arrayMove(sourceColumn.taskIds, activeIndex, overIndex);
        newColumns[sourceColumn.id] = {
          ...sourceColumn,
          taskIds: newColumnTaskIds,
        };
      } else {
        // Remove from source column
        newColumns[sourceColumn.id] = {
          ...sourceColumn,
          taskIds: sourceColumn.taskIds.filter((id) => id !== activeId),
        };

        // Add to destination column
        const destinationTaskIds = [...destinationColumn.taskIds];
        const finalOverIndex = overIndex === -1 ? destinationTaskIds.length : overIndex;
        destinationTaskIds.splice(finalOverIndex, 0, activeId);
        newColumns[destinationColumn.id] = {
          ...destinationColumn,
          taskIds: destinationTaskIds,
        };

        // Update task status
        newTasks[activeId] = {
          ...newTasks[activeId],
          status: destinationColumn.id as 'todo' | 'in-progress' | 'done',
        };
      }

      setTasks(newTasks);
      setColumns(newColumns);
    } else {
      // Moving within the same column
      const oldIndex = activeColumn.taskIds.indexOf(activeId);
      const newIndex = activeColumn.taskIds.indexOf(overId);

      if (oldIndex !== -1 && newIndex !== -1) {
        const newColumnTaskIds = arrayMove(activeColumn.taskIds, oldIndex, newIndex);
        setColumns((prev) => ({
          ...prev,
          [activeColumn.id]: {
            ...activeColumn,
            taskIds: newColumnTaskIds,
          },
        }));
      }
    }
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
  };

  const handleCloseCardDetail = () => {
    setSelectedTask(null);
  };

  return (
    <SectionTransition>
      <div className={mainDivClasses}>
        {theme === 'newspaper' && <div className="fold-line"></div>}

        <header className="px-6 sm:px-12 py-8 border-b-2 border-[var(--color-primary-dark)] relative">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--color-primary-dark)] to-transparent opacity-20"></div>
          <div className="text-center">
            <div className="mb-2 text-xs tracking-widest text-[var(--foreground)] uppercase">Task Management</div>
            <h1 className="font-fraktur text-5xl sm:text-7xl text-[var(--foreground)] tracking-tight mb-2">Project Board</h1>
            <div className="text-xs italic text-[var(--foreground)]">&quot;Organize Your Work, Achieve Your Goals&quot;</div>
            <div className="flex justify-center items-center gap-4 mt-3 text-[var(--foreground)]">
              <span className="text-sm">Est. MMXXIV</span>
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary-light)]"></div>
              <span className="text-sm">Sunday Edition</span>
            </div>
          </div>
        </header>

        <main className="px-6 sm:px-12 py-8">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragEnd={onDragEnd}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Object.values(columns).map((column) => (
                <div key={column.id} className={`p-6 ${theme === 'newspaper' ? 'newspaper-border ornate-corner' : 'border-2 border-[var(--color-primary-dark)]'} bg-[var(--background)]/50`}>
                  <h2 className="font-playfair font-black text-xl text-[var(--foreground)] mb-4">{column.title}</h2>
                  <SortableContext
                    id={column.id}
                    items={column.taskIds}
                  >
                    <div
                      className="min-h-[200px] p-4 rounded-md bg-[var(--color-primary-light)]"
                    >
                      {column.taskIds.map((taskId) => {
                        const task = tasks[taskId];
                        return task ? <SortableTask key={task.id} task={task} onClick={handleTaskClick} /> : null;
                      })}
                    </div>
                  </SortableContext>
                </div>
              ))}
            </div>
          </DndContext>
        </main>

        <footer className="px-6 sm:px-12 py-6 border-t border-[var(--color-primary-dark)] text-center text-sm text-[var(--foreground)] relative">
          <div className="flex item-center justify-center"><ThemeSwitcher /></div>
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--color-primary-dark)] to-transparent opacity-20"></div>
          <p className="font-playfair italic">{`All the Forum\'s News That\'s Fit to Print`}</p>
          <div className="mt-2 flex justify-center items-center gap-4">
            <span>Copyright © MMXXIV</span>
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-primary-light)]"></div>
            <span className="font-fraktur">The Daily Forum</span>
          </div>
        </footer>
      </div>
      {selectedTask && <TaskCardDetail task={selectedTask} onClose={handleCloseCardDetail} />}
    </SectionTransition>
  );
};

export default BoardPage;
