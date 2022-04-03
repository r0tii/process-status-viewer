import React from 'react';
import { Menu } from 'antd';
import styles from './style.module.scss';

export default function NavigationBar() {
  return (
    <>
      <div className={styles.logo} />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['processes']}>
        <Menu.Item key="processes">Processes</Menu.Item>
      </Menu>
    </>
  );
}
