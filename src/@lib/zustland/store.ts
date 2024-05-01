import { defaultTasks } from '@lib/constant';
import { Task } from '@modules/kanbanBoard/type/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

//Interface user data
export interface IUserInterface {
  id: number;
  account_type: string;
  name: string;
  email: string;
  phone?: string;
  company_name?: string;
}

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
    { name: 'cart-storage' },
  ),
);
