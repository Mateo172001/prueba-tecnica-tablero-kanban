import { openDB } from 'idb';
import { Task } from '@/app/features/tasks/models/task';

const DB_NAME = 'KanbanDB';
const STORE_NAME = 'tasks';

export const getDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    },
  });
};

export const saveTask = async (task: Task) => {
  const db = await getDB();
  return db.put(STORE_NAME, task);
};

export const getTasks = async (): Promise<Task[]> => {
  const db = await getDB();
  return db.getAll(STORE_NAME);
};
