import React from 'react';
import { Table, Tag, Tooltip, Button, Avatar } from 'antd';
import { InfoCircleOutlined, ReloadOutlined, CloudSyncOutlined } from '@ant-design/icons';
import moment from 'moment';
import camelcaseKeys from 'camelcase-keys';
import ProcessAPIClient from 'api/clients/processes';

// TODO: Fetch the metadata from the API itself instead of hardcocking column tooltip text
const columns = [
  {
    title: () => (
      <span className="d-inline-flex">
        UID#&nbsp;
        <Tooltip
          className="align-self-center"
          title="A number assigned by the OS to refer to a user
                 (taken from /etc/passwd)"
        >
          <InfoCircleOutlined />
        </Tooltip>
      </span>
    ),
    dataIndex: 'uid',
    sorter: (a, b) => a.uid - b.uid,
    showSorterTooltip: false,
  },
  {
    title: () => (
      <span className="d-inline-flex">
        USER&nbsp;
        <Tooltip
          className="align-self-center"
          title="Username (can be UID in some OS) owning the process"
        >
          <InfoCircleOutlined />
        </Tooltip>
      </span>
    ),
    dataIndex: 'user',
    sorter: (a, b) => a.user.length - b.user.length,
    showSorterTooltip: false,
  },
  {
    title: () => (
      <span className="d-inline-flex">
        PID&nbsp;
        <Tooltip className="align-self-center" title="Process ID of the process">
          <InfoCircleOutlined />
        </Tooltip>
      </span>
    ),
    dataIndex: 'pid',
    sorter: (a, b) => a.pid - b.pid,
    showSorterTooltip: false,
  },
  {
    title: () => (
      <span className="d-inline-flex">
        %CPU&nbsp;
        <Tooltip
          className="align-self-center"
          title="CPU time used by this process (in percentage)"
        >
          <InfoCircleOutlined />
        </Tooltip>
      </span>
    ),
    dataIndex: 'cpu',
    sorter: (a, b) => parseFloat(a.cpu).toFixed(2) - parseFloat(b.cpu).toFixed(2),
    showSorterTooltip: false,
  },
  {
    title: () => (
      <span className="d-inline-flex">
        %MEM&nbsp;
        <Tooltip
          className="align-self-center"
          title="Physical memory used by this process (in percentage)"
        >
          <InfoCircleOutlined />
        </Tooltip>
      </span>
    ),
    dataIndex: 'mem',
    sorter: (a, b) => parseFloat(a.mem).toFixed(2) - parseFloat(b.mem).toFixed(2),
    showSorterTooltip: false,
  },
  {
    title: () => (
      <span className="d-inline-flex">
        VSZ&nbsp;
        <Tooltip
          className="align-self-center"
          title="Virtual memory size used by this process (in KiB)"
        >
          <InfoCircleOutlined />
        </Tooltip>
      </span>
    ),
    dataIndex: 'vsz',
    sorter: (a, b) => a.vsz - b.vsz,
    showSorterTooltip: false,
  },
  {
    title: () => (
      <span className="d-inline-flex">
        RSS&nbsp;
        <Tooltip
          className="align-self-center"
          title="Resident Set Size, the non-swappable physical
                 memory used by this process (in KiB)"
        >
          <InfoCircleOutlined />
        </Tooltip>
      </span>
    ),
    dataIndex: 'rss',
    sorter: (a, b) => a.rss - b.rss,
    showSorterTooltip: false,
  },
  {
    title: () => (
      <span className="d-inline-flex">
        TTY&nbsp;
        <Tooltip
          className="align-self-center"
          title="Terminal from which this process is started. Question mark (?) sign
                 represents that this process is not started from a terminal"
        >
          <InfoCircleOutlined />
        </Tooltip>
      </span>
    ),
    dataIndex: 'tty',
    sorter: (a, b) => a.tty.length - b.tty.length,
    showSorterTooltip: false,
  },
  {
    title: () => (
      <span className="d-inline-flex">
        STAT&nbsp;
        <Tooltip className="align-self-center" title="The process state code">
          <InfoCircleOutlined />
        </Tooltip>
      </span>
    ),
    dataIndex: 'stat',
    sorter: (a, b) => a.stat.length - b.stat.length,
    showSorterTooltip: false,
  },
  {
    title: () => (
      <span className="d-inline-flex">
        START&nbsp;
        <Tooltip className="align-self-center" title="Starting time or date of the process">
          <InfoCircleOutlined />
        </Tooltip>
      </span>
    ),
    dataIndex: 'start',
    sorter: (a, b) => a.start.localeCompare(b.start),
    render: (value) => {
      const startSplited = value.split(':');
      return moment(
        new Date(
          Date.UTC(
            moment().year(),
            moment().month(),
            moment().hours(),
            startSplited[0],
            startSplited[1],
            startSplited[2],
          ),
        ),
      ).format('HH:mm');
    },
    showSorterTooltip: false,
  },
  {
    title: () => (
      <span className="d-inline-flex">
        TIME&nbsp;
        <Tooltip className="align-self-center" title="Cumulative CPU time">
          <InfoCircleOutlined />
        </Tooltip>
      </span>
    ),
    dataIndex: 'time',
    sorter: (a, b) => a.time.localeCompare(b.time),
    showSorterTooltip: false,
  },
  {
    title: () => (
      <span className="d-inline-flex">
        UPDATED&nbsp;
        <Tooltip className="align-self-center" title="Last synced at">
          <InfoCircleOutlined />
        </Tooltip>
      </span>
    ),
    dataIndex: 'updatedAt',
    sorter: (a, b) => moment(a.updatedAt).unix() - moment(b.updatedAt).unix(),
    render: (value) => {
      return moment(value).format('DD-MM-YYYY HH:mm:ss');
    },
    showSorterTooltip: false,
    defaultSortOrder: 'descend',
  },
];

const expandedRowRender = (row) => {
  const nestedColumns = [
    {
      title: () => (
        <span className="d-inline-flex">
          COMMAND&nbsp;
          <Tooltip
            className="align-self-center"
            title="The command with all its arguments which started this process"
          >
            <InfoCircleOutlined />
          </Tooltip>
        </span>
      ),
      dataIndex: 'command',
      render: (value) => <Tag color="blue"> {value}</Tag>,
    },
  ];

  return (
    <Table
      columns={nestedColumns}
      dataSource={[{ id: row.id, command: row.command }]}
      pagination={false}
      rowKey="id"
    />
  );
};

export default class ProcessTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      processes: [],
      isLoading: false,
      lastSync: '',
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    this.setState({ isLoading: true });
    ProcessAPIClient.getProcesses()
      .then((response) => {
        const camelCasedData = camelcaseKeys(response.data);
        this.setState({
          processes: camelCasedData,
          isLoading: false,
          lastSync:
            camelCasedData.length === 0
              ? ''
              : moment(camelCasedData[0].updatedAt).format('DD-MM-YYYY HH:mm:ss'),
        });
      })
      .catch((error) => {
        console.error(`Error in promises ${error.response}`);
      });
  };

  refetchData = () => {
    this.setState({ isLoading: true });
    ProcessAPIClient.refreshProcesses()
      .then((response) => {
        const camelCasedData = camelcaseKeys(response.data);
        this.setState({
          processes: camelCasedData,
          isLoading: false,
          lastSync:
            camelCasedData.length === 0
              ? ''
              : moment(camelCasedData[0].updatedAt).format('DD-MM-YYYY HH:mm:ss'),
        });
      })
      .catch((error) => {
        console.error(`Error in promises ${error.response}`);
      });
  };

  render() {
    const { processes, isLoading, lastSync } = this.state;
    return (
      <>
        <div className="row align-items-center">
          <div className="col-12 col-sm-6 text-center text-sm-start mb-2 mb-sm-0">
            <Button
              type="primary"
              onClick={this.refetchData}
              loading={isLoading}
              size="large"
              icon={<ReloadOutlined />}
            >
              Refresh
            </Button>
          </div>
          {lastSync && (
            <div className="col-12 col-sm-6 text-center text-sm-end">
              <Avatar
                shape="square"
                icon={<CloudSyncOutlined />}
                style={{ backgroundColor: '#a9a9a9' }}
              />
              <p className="text-muted fw-bold mb-0">Last sync:</p>
              <p className="text-muted">{lastSync}</p>
            </div>
          )}
        </div>
        <Table
          columns={columns}
          dataSource={processes}
          loading={isLoading}
          expandedRowRender={expandedRowRender}
          rowKey="id"
          pagination={{ showTotal: (total) => `Total ${total} items` }}
          scroll={{ x: true }}
        />
      </>
    );
  }
}
