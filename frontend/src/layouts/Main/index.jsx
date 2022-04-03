import React from 'react';
import { Layout } from 'antd';
import NavigationBar from 'components/LayoutComponents/NavigationBar';
import Content from 'components/LayoutComponents/Content';
import styles from './style.module.scss';

export default function MainLayout() {
  return (
    <Layout className="layout">
      <Layout.Header>
        <NavigationBar />
      </Layout.Header>
      <Layout.Content className={styles.layoutContent}>
        <Content />
      </Layout.Content>
      <Layout.Footer className={styles.layoutFooter}>
        It&apos;s mine, it&apos;s yours, it&apos;s ours. ©2022
        <br />
        Created with React
      </Layout.Footer>
    </Layout>
  );
}
