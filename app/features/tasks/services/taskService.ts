import { Task } from '../models/task';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const fetchTasksFromServer = async (): Promise<Task[]> => {
  const res = await fetch(`${BASE_URL}/tasks`);
  if (!res.ok) throw new Error('Error al obtener tareas del servidor');
  return res.json();
};
