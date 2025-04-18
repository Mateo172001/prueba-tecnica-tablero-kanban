export type TaskStatus = 'pending' | 'in-progress' | 'completed';

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  user: string;
}
