import { defaultTasks } from '@lib/constant';
import { Task } from '@modules/kanbanBoard/type/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

//Define type store

export type IStore = {
  taskList: Task[];
  setTaskList: (tasks: Task[]) => void;
};

export const useTaskStore = create<IStore>()(
  persist(
    (set, _get) => ({
      taskList: defaultTasks,
      setTaskList: (products: Task[]) => {
        // const { taskList } = get();
        // const product = [...taskList];
        set({ taskList: products });
      },
    }),
    { name: 'zustland-storage' },
  ),
);
