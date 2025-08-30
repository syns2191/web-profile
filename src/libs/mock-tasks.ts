type StatusTask = 'todo' | 'in-progress' | 'done';
type Task = {
  id: string;
  title: string;
  description: string;
  status: StatusTask;
};

interface Board {
  todo: Task[];
  "in-progress": Task[];
  done: Task[];
}



export const mockTasks: Board = {
  'todo': [ { id: 'task-1', title: 'Implement Trello-like board', description: 'Create the basic UI for the board with columns and cards.', status: 'todo' },
    { id: 'task-2', title: 'Add drag-and-drop functionality', description: 'Integrate @hello-pangea/dnd for reordering tasks.', status: 'todo' },
    { id: 'task-3', title: 'Link board from activity detail page', description: 'Add a button/link on the activity detail page to navigate to the board.', status: 'todo' },
  ],
  'in-progress': [
    { id: 'task-4', title: 'Design board layout', description: 'Sketch out the visual design for the columns and cards.', status: 'in-progress' },
  ],
  'done': [
    { id: 'task-5', title: 'Setup mock task data', description: 'Create mock-tasks.ts with sample task data.', status: 'done' },
    { id: 'task-6', title: 'Install drag-and-drop library', description: 'Successfully installed @hello-pangea/dnd.', status: 'done' },
  ],
};
