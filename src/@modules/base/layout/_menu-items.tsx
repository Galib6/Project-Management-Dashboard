import { paths } from '@lib/constant';
import { storage, toolbox } from '@lib/utils';
import { MenuProps } from 'antd/lib';
import Link from 'next/link';
import { AiOutlineDashboard, AiOutlineLogout, AiOutlineSafety, AiOutlineUser } from 'react-icons/ai';

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
    icon: <AiOutlineDashboard />,
    label: <Link href={toolbox.appendPagination(paths.projectOverview.list, 1, 5)}>Projects Overview</Link>,
  },
];

const menuItems = {
  welcomeMenu,
  mainMenu,
};

export default menuItems;
