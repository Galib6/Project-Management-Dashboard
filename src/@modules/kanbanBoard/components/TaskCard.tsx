import { useState } from 'react';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button, Modal } from 'antd';
import { BiSolidMessageSquareEdit } from 'react-icons/bi';
import { Id, Task } from '../type/types';
import EditTaskModalContent from './EditTaskModalContent';

interface Props {
  task: Task;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, content: string) => void;
}

function TaskCard({ task, deleteTask, updateTask }: Props) {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editTaskModal, setEditTaskModal] = useState(null);

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: task.id,
    data: {
      type: 'Task',
      task,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  //   const toggleEditMode = () => {
  //     setEditMode((prev) => !prev);
  //     setMouseIsOver(false);
  //   };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="
        opacity-30
      bg-mainBackgroundColor p-2.5 h-[50px] min-h-[50px] items-center flex text-left rounded-xl border-2 hover:ring-gray-400  cursor-grab relative
      "
      />
    );
  }

  //   if (editMode) {
  //     return (
  //       <div
  //         ref={setNodeRef}
  //         style={style}
  //         {...attributes}
  //         {...listeners}
  //         className="bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-gray-400 cursor-grab relative transition-all duration-300"
  //       >
  //         <textarea
  //           className="h-[90%] w-full resize-none rounded bg-transparent text-black focus:outline-none"
  //           value={task.content}
  //           autoFocus
  //           placeholder="Task content here"
  //           onBlur={toggleEditMode}
  //           onKeyDown={(e) => {
  //             if (e.key === 'Enter' && e.shiftKey) {
  //               toggleEditMode();
  //             }
  //           }}
  //           onChange={(e) => updateTask(task.id, e.target.value)}
  //         />
  //       </div>
  //     );
  //   }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      //   onClick={toggleEditMode}
      className="bg-mainBackgroundColor p-2.5 h-[50px] min-h-[50px] items-center flex text-left rounded-sm hover:ring-2 hover:ring-inset border border-ring-gray-500 hover:ring-gray-400 cursor-grab relative task"
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
    >
      <p className="w-full my-auto overflow-x-hidden whitespace-pre-wrap line-clamp-1">{task.content}</p>

      {mouseIsOver && (
        <Button
          //   onClick={() => {
          //     deleteTask(task.id);
          //   }}

          onClick={() => {
            setEditMode(true);
            setEditTaskModal(task);
          }}
          className="absolute h-auto p-1 -translate-y-1/2 rounded stroke-black right-4 top-1/2 bg-columnBackgroundColor opacity-60 hover:opacity-100"
        >
          {/* <TrashIcon /> */}
          <BiSolidMessageSquareEdit size={24} />
        </Button>
      )}

      <Modal
        open={editTaskModal}
        afterClose={() => setEditMode(false)}
        onCancel={() => {
          setEditMode(false);
          setEditTaskModal(null);
        }}
        footer={null}
      >
        <EditTaskModalContent
          task={task}
          deleteTask={(id) => deleteTask(id)}
          updateTask={(id, content) => updateTask(id, content)}
        />
      </Modal>
    </div>
  );
}

export default TaskCard;
