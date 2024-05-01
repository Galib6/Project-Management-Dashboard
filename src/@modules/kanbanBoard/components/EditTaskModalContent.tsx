import { Button, Tooltip, message } from 'antd';
import { Avatar, Input } from 'antd/lib';
import { useState } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import { Id, Task } from '../type/types';

interface IProps {
  task: Task;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, content: any) => void;
}

const EditTaskModalContent: React.FC<IProps> = ({ task, deleteTask, updateTask }) => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);

  const handleSaveTask = () => {
    setLoading(true);
    setTimeout(() => {
      updateTask(task.id, { description: description ?? task.description, content: title ?? task.content });
      setLoading(false);
      message.success('Task updated successfully');
    }, 1000);
  };
  return (
    <div>
      <h1 className="text-[20px] font-bold">Task Details</h1>
      <p>Deadline: {task.deadline} </p>
      <h2 className="mt-[20px] text-[18px]">
        <span className="font-bold ">Title:</span>
        <Input variant="borderless" value={title ?? task.content} onChange={(e) => setTitle(e.target.value)} />
      </h2>
      <p className="mt-[10px] text-[14px]">
        <span className="font-bold ">Description:</span>
      </p>

      <Input.TextArea
        variant="borderless"
        rows={6}
        value={description ?? task.description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {(description || title) && (
        <Button loading={loading} danger className=" mt-[20px]" onClick={handleSaveTask}>
          Save
        </Button>
      )}

      <div className="flex justify-between mt-[30px]">
        <div className="flex justify-start gap-2 ">
          <p className="text-[16px]">Assigned Member: </p>
          <Avatar.Group>
            {task.assignedMember.map((member) => (
              <Tooltip key={member} title={member} placement="top">
                <Avatar style={{ backgroundColor: '#87d068' }}>{member?.slice(0, 1).toUpperCase()}</Avatar>
              </Tooltip>
            ))}
          </Avatar.Group>
        </div>
        <div>
          <Button
            danger
            icon={<MdDeleteForever size={24} />}
            className="flex items-center"
            onClick={() => deleteTask(task.id)}
          >
            Delete Task
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditTaskModalContent;
