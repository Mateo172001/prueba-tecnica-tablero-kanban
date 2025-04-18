'use client';

import { useState } from 'react';
import { useTasksContext } from './features/tasks/hooks/TaskContext';
import { Column } from './features/tasks/components/Column';
import { TaskModal } from './features/tasks/components/TaskModal';
import { Task } from './features/tasks/models/task';

export default function KanbanPage() {
  const { tasks, addTask, updateTask } = useTasksContext();
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);

  const handleNewTask = () => {
    setEditingTask(undefined);
    setModalOpen(true);
  };

  const handleSave = (task: Task) => {
    if (editingTask) {
      updateTask(task);
    } else {
      addTask(task);
    }
  };

  const pending = tasks.filter((task) => task.status === 'pending');
  const inProgress = tasks.filter((task) => task.status === 'in-progress');
  const completed = tasks.filter((task) => task.status === 'completed');

  return (
    <main className="p-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tablero Kanban</h1>
        <button
          onClick={handleNewTask}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
        >
          + Nueva tarea
        </button>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <Column title="Pendiente" tasks={pending} onEditTask={setEditingTask} openModal={setModalOpen} />
        <Column title="En Progreso" tasks={inProgress} onEditTask={setEditingTask} openModal={setModalOpen} />
        <Column title="Completada" tasks={completed} onEditTask={setEditingTask} openModal={setModalOpen} />
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        initialTask={editingTask}
      />
    </main>
  );
}
