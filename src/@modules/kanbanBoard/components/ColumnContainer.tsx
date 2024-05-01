import { SortableContext, useSortable } from '@dnd-kit/sortable';
import TrashIcon from '../icons/TrashIcon';

import { CSS } from '@dnd-kit/utilities';
import { Button } from 'antd';
import { useMemo, useState } from 'react';
import PlusIcon from '../icons/PlusIcon';
import { Column, Id, Task } from '../type/types';
import TaskCard from './TaskCard';

interface Props {
  column: Column;
  deleteColumn: (id: Id) => void;
  updateColumn: (id: Id, title: string) => void;

  createTask: (columnId: Id) => void;
  updateTask: (id: Id, content: string) => void;
  deleteTask: (id: Id) => void;
  tasks: Task[];
}

function ColumnContainer({ column, deleteColumn, updateColumn, createTask, tasks, deleteTask, updateTask }: Props) {
  const [editMode, setEditMode] = useState(false);

  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: column.id,
    data: {
      type: 'Column',
      column,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className=" bg-columnBackgroundColor opacity-40 border-2 border-gray-800 w-[300px] h-[500px]  max-h-[500px] rounded-md flex flex-col"
      ></div>
    );
  }

  return (
    <div ref={setNodeRef} style={style} className=" bg-columnBackgroundColor w-[300px] rounded-md flex flex-col">
      {/* Column title */}
      <div
        {...attributes}
        {...listeners}
        onClick={() => {
          setEditMode(true);
        }}
        className={`flex items-center justify-between px-3 py-1 font-bold border border-gray-800 border-t-[4px]  rounded-md rounded-b-none bg-mainBackgroundColor text-md cursor-grab border-columnBackgroundColor`}
      >
        <div className="flex gap-2">
          {/* <div className="flex items-center justify-center px-2 py-1 text-sm rounded-full bg-columnBackgroundColor">
            0
          </div> */}
          {!editMode && column.title}
          {editMode && (
            <input
              className="bg-white border rounded outline-none focus:ring-gray-400"
              value={column.title}
              onChange={(e) => updateColumn(column.id, e.target.value)}
              autoFocus
              onBlur={() => {
                setEditMode(false);
              }}
              onKeyDown={(e) => {
                if (e.key !== 'Enter') return;
                setEditMode(false);
              }}
            />
          )}
        </div>
        <button
          onClick={() => {
            deleteColumn(column.id);
          }}
          className="px-1 py-2 rounded stroke-gray-500 hover:stroke-black hover:bg-columnBackgroundColor"
        >
          <TrashIcon />
        </button>
      </div>

      {/* Column task container */}
      <div className="flex flex-col flex-grow gap-4 pt-[25px] overflow-x-hidden overflow-y-auto">
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} deleteTask={deleteTask} updateTask={updateTask} />
          ))}
        </SortableContext>
      </div>

      <div className="py-[30px]">
        <Button
          onClick={() => {
            createTask(column.id);
          }}
          icon={<PlusIcon />}
          className="flex items-center"
          type="dashed"
        >
          Add New Task
        </Button>
      </div>
      {/* Column footer */}
      {/* <button
        className="flex items-center gap-2 p-4 border-2 rounded-md border-columnBackgroundColor border-x-columnBackgroundColor hover:bg-mainBackgroundColor hover:text-rose-500 active:bg-black"
        onClick={() => {
          createTask(column.id);
        }}
      >
        <PlusIcon />
        Add task
      </button> */}
    </div>
  );
}

export default ColumnContainer;
