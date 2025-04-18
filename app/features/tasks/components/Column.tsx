'use client';

import React from 'react';
import { Task } from '../models/task';
import { TaskCard } from './TaskCard';

interface Props {
  title: string;
  tasks: Task[];
  onEditTask: (task: Task) => void;
  openModal: (open: boolean) => void;
}

export const Column = ({ title, tasks, onEditTask, openModal }: Props) => {
  const handleEdit = (task: Task) => {
    onEditTask(task);
    openModal(true);
  };

  return (
    <div className="flex-1 bg-gray-100 p-4 rounded-md min-w-[250px]">
      <h2 className="font-bold text-lg mb-4">{title}</h2>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onEdit={handleEdit} />
      ))}
    </div>
  );
};
