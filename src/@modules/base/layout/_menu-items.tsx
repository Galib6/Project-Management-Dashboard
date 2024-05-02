import { paths } from '@lib/constant';
import { storage, toolbox } from '@lib/utils';
import { MenuProps } from 'antd/lib';
import Link from 'next/link';
import { AiOutlineLogout, AiOutlineSafety, AiOutlineUser } from 'react-icons/ai';
import { BsFillKanbanFill } from 'react-icons/bs';
import { FaClipboardList } from 'react-icons/fa';
import { MdSummarize } from 'react-icons/md';

const welcomeMenu = [
  {
    key: 'Profile',
    icon: <AiOutlineUser />,
    label: 'Profile',
  },
  {
    key: 'Security',
    icon: <AiOutlineSafety />,
    label: 'Security',
  },
  {
    key: 'Logout',
    icon: <AiOutlineLogout />,
    label: 'Logout',
    onClick: () => {
      storage.clear();
      window.location.reload();
    },
  },
];

// main menu items
const mainMenu: MenuProps['items'] = [
  {
    key: paths.projectOverview.list,
    icon: <MdSummarize />,
    label: <Link href={toolbox.appendPagination(paths.projectOverview.list, 1, 5)}>Projects Overview</Link>,
  },
  {
    key: paths.TaskList.root,
    icon: <FaClipboardList />,
    label: <Link href={paths.TaskList.root}>Task List</Link>,
  },
  {
    key: paths.kanban.root,
    icon: <BsFillKanbanFill />,
    label: <Link href={paths.kanban.root}>Kanban</Link>,
  },
];

const menuItems = {
  welcomeMenu,
  mainMenu,
};

export default menuItems;
