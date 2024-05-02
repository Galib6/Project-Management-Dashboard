import ProjectDetails from '@modules/projects/components/ProjectDetails';
import { useProject } from '@modules/projects/lib/hooks';
import { Avatar, Badge, Descriptions, DescriptionsProps, Tabs, TabsProps, Tooltip } from 'antd/lib';
import dayjs from 'dayjs';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const KanbanBoard = dynamic(() => import('@modules/kanbanBoard/components/KanbanBoard'), { ssr: false });

const Index = () => {
  const router = useRouter();
  const { data } = useProject({ id: (router?.query?.id as string) ?? null });
  const DescriptionItems: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'Title',
      children: <p className="max-w-[250px]">{data?.data?.attributes?.title}</p>,
    },
    {
      key: '2',
      label: 'Dead Line',
      children: dayjs(data?.data?.attributes?.createdAt).format('DD/MM/YYYY HH:mm A'),
    },
    {
      key: '3',
      label: 'Running',
      children: 'YES',
    },
    {
      key: '4',
      label: 'Assigned Member',
      children: (
        <Avatar.Group maxCount={2}>
          {data?.data?.attributes?.assignedMember?.map((x, i) => (
            <Tooltip key={i} title={x} placement="top">
              <Avatar style={{ backgroundColor: '#f56a00' }}>{x.slice(0, 1).toUpperCase()}</Avatar>
            </Tooltip>
          ))}
        </Avatar.Group>
      ),
    },
    {
      key: '5',
      label: 'Priority',
      children: 'Medium',
      span: 2,
    },
    {
      key: '6',
      label: 'Status',
      children: <Badge status="processing" text="On going" />,
      span: 3,
    },

    {
      key: '4',
      label: 'Description',
      children: <p className="max-w-[450px]">{data?.data?.attributes?.description}</p>,
    },
  ];
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Project Details',
      children: (
        <>
          <Descriptions title="Project details" bordered items={DescriptionItems} />
          <ProjectDetails />
        </>
      ),
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

export default Index;
