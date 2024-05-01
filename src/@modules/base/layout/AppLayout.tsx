'use client';
import { Dropdown, Grid, Layout, Menu } from 'antd/lib';
import { usePathname } from 'next/navigation';
import { Router } from 'next/router';
import React, { useState } from 'react';
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai';
import menuItems from './_menu-items';

interface IFProps {
  children: any;
  router?: Router;
}
const AppLayout: React.FC<IFProps> = ({ children }) => {
  const screens = Grid.useBreakpoint();
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const pathname = usePathname();
  const styles = {
    sider: {
      boxShadow: '0 0 20px #0815420d',
      borderRight: '1px solid #ecf3fa',
      overflow: 'auto',
      height: '100vh',
      position: 'fixed',
      left: !screens.md && isCollapsed ? '-100%' : 0,
      zIndex: 9,
    },

    header: {
      position: 'fixed',
      width: '100%',
      background: '#fff',
      padding: '0 14px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      zIndex: 8,
      paddingLeft: !screens.md ? (isCollapsed ? 20 : 220) : isCollapsed ? 100 : 220,
      right: 0,
      boxShadow: '0 0 20px #0815420d',
      borderBottom: '1px solid #ecf3fa',
    },
    layout: {
      background: '#f6f8fa',
      marginLeft: !screens.md ? 0 : isCollapsed ? 80 : 200,
      padding: 14,
      paddingTop: 0,
    },

    content: {
      borderRadius: 5,
      padding: 14,
      minHeight: 280,
      background: '#fff',
      marginTop: 77,
      marginLeft: 0,
      marginRight: 14,
    },
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Sider
        theme="light"
        trigger={null}
        collapsible
        collapsed={isCollapsed}
        style={styles.sider as any}
        breakpoint="md"
        onBreakpoint={(broken) => {
          if (broken === true) {
            setIsCollapsed(true);
          }
        }}
      >
        <div
          style={{
            margin: 15,
            marginBottom: 30,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {isCollapsed ? (
            <img className="logo" src="/images/logo-sm.png" style={{ width: 50 }} alt="logo" />
          ) : (
            <img className="logo" src="/images/logo.png" style={{ width: 180 }} alt="logo" />
          )}
        </div>

        <Menu
          theme="light"
          mode="inline"
          style={{ borderRight: 0 }}
          defaultSelectedKeys={[String(pathname)]}
          defaultOpenKeys={[String(pathname)]}
          items={menuItems.mainMenu}
        />
      </Layout.Sider>

      <Layout style={styles.layout as any}>
        <Layout.Header style={styles.header as any}>
          <div className="flex items-center justify-between w-full">
            <div style={{ fontSize: 22, cursor: 'pointer' }} onClick={() => setIsCollapsed(!isCollapsed)}>
              {isCollapsed ? <AiOutlineMenuFold /> : <AiOutlineMenuUnfold />}
            </div>

            <div className="">
              <Dropdown.Button menu={{ items: menuItems.welcomeMenu, style: { width: 150 } }}>Welcome</Dropdown.Button>
            </div>
          </div>
        </Layout.Header>
        <Layout.Content style={styles.content as any}>{children}</Layout.Content>
        <Layout.Footer className="pb-[10px]">
          <p className="text-center">
            Made With ❤️ By{' '}
            <a
              href="https://uniclienttechnologies.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              Uniclient Technologies
            </a>
          </p>
        </Layout.Footer>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
