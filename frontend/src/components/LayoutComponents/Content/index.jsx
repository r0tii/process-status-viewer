import React from 'react';
import { Breadcrumb } from 'antd';
import ProcessTable from 'components/Tables/ProcessTable';
import styles from './style.module.scss';

export default function Content() {
  return (
    <>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>Processes</Breadcrumb.Item>
      </Breadcrumb>
      <div className={styles.sitelayoutContent}>
        <ProcessTable />
      </div>
    </>
  );
}
