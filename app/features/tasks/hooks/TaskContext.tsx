'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Task } from '../models/task';
import { fetchTasksFromServer } from '../services/taskService';
import { getTasks as getLocalTasks, saveTask } from '@/app/core/storage/indexedDB'

interface TasksContextType {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  updateTask: (updatedTask: Task) => void;
  addTask: (task: Task) => void;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const TasksProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const loadTasks = async () => {
      const local = await getLocalTasks();
      if (local.length > 0) {
        setTasks(local);
      } else {
        const server = await fetchTasksFromServer();
        setTasks(server);
        server.forEach(saveTask);
      }
    };
    loadTasks();
  }, []);

  const updateTask = (updated: Task) => {
    setTasks((prev) => {
      const newTasks = prev.map((task) => (task.id === updated.id ? updated : task));
      saveTask(updated);
      return newTasks;
    });
  };

  const addTask = (task: Task) => {
    setTasks((prev) => {
      saveTask(task);
      return [...prev, task];
    });
  };

  return (
    <TasksContext.Provider value={{ tasks, setTasks, updateTask, addTask }}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasksContext = () => {
  const context = useContext(TasksContext);
  if (!context) throw new Error('useTasksContext debe usarse dentro de un <TasksProvider>');
  return context;
};
