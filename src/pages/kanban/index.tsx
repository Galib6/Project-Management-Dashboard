import dynamic from 'next/dynamic';

const KanbanBoard = dynamic(() => import('@modules/kanbanBoard/components/KanbanBoard'), { ssr: false });

const index = () => {
  return <KanbanBoard />;
};

export default index;
