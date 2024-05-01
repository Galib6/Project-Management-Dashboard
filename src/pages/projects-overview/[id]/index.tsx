import ProjectDetails from '@modules/projects/components/ProjectDetails';
import { TabsProps } from 'antd';
import { Tabs } from 'antd/lib';
import dynamic from 'next/dynamic';

const KanbanBoard = dynamic(() => import('@modules/kanbanBoard/components/KanbanBoard'), { ssr: false });

const index = () => {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Project Details',
      children: <ProjectDetails />,
    },
    {
      key: '2',
      label: 'Kanban Board',
      children: <KanbanBoard />,
    },
  ];

  return (
    <>
      <Tabs defaultActiveKey="1" items={items} />
    </>
  );
};

export default index;
