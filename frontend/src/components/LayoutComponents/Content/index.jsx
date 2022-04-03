import React from 'react';
import { Breadcrumb } from 'antd';
import styles from './style.module.scss';

export default function Content() {
  return (
    <>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Processes</Breadcrumb.Item>
      </Breadcrumb>
      <div className={styles.sitelayoutContent}>bla bla test</div>
    </>
  );
}
