'use client';
import { toolbox } from '@lib/utils';
import { useTaskStore } from '@lib/zustland/store';
import PageWrapper from '@modules/base/components/PageWrapper';
import { Avatar, Input, Select, Space, Tag } from 'antd/lib';
import Table, { ColumnsType } from 'antd/lib/table';
import { useState } from 'react';
import { IoIosSearch } from 'react-icons/io';

const ProjectDetails = () => {
  const taskStore = useTaskStore();
  const { taskList } = taskStore;
  const [loading, setLoading] = useState(false);

  const [task, setTask] = useState(taskList.slice(0, 10));

  const handleSearch = (value: string) => {
    setLoading(true);

    setTimeout(() => {
      if (value) {
        const filteredData = taskList.filter((x) =>
          x.content.toString()?.toLowerCase()?.includes(value?.toLowerCase()),
        );
        setTask(filteredData);
        // Hide loading state
      }
      setLoading(false);
      return;
    }, 1000);
  };
  const handleSearchByStatus = (value: string) => {
    setLoading(true);

    setTimeout(() => {
      if (value) {
        const filteredData = taskList.filter((x) =>
          x?.columnId?.toString()?.toLowerCase()?.includes(value?.toLowerCase()),
        );
        setTask(filteredData);

        // Hide loading state
      }
      setLoading(false);
      return;
    }, 1000);
  };

  // Project table data source config
  const dataSource = task?.map((x) => ({
    key: x?.id,
    id: x?.id,
    description: x?.description,
    content: x?.content,
    deadline: x?.deadline,
    status: x?.columnId,
    assignedMember: x?.assignedMember,
  }));

  const columns: ColumnsType<(typeof dataSource)[number]> = [
    {
      title: 'content',
      dataIndex: 'content',
      key: 'content',
      render: (content) => <p className="line-clamp-2 max-w-[200px]">{content}</p> ?? '-',
    },
    {
      title: 'description',
      dataIndex: 'description',
      key: 'description',
      render: (description) => <p className="line-clamp-2 max-w-[400px]">{description}</p> ?? '-',
    },
    {
      title: 'status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'doing' ? 'warning' : status === 'done' ? 'success' : 'pink'}>{status}</Tag>
      ),
    },
    {
      title: 'Assigned Member',
      dataIndex: 'assignedMember',
      key: 'assignedMember',
      render: (assignedMember) => (
        <Space>
          <Avatar.Group maxCount={2}>
            {assignedMember?.map((x, i) => (
              <Avatar key={i} style={{ backgroundColor: '#f56a00' }}>
                {x.slice(0, 1).toUpperCase()}
              </Avatar>
            ))}
          </Avatar.Group>
        </Space>
      ),
    },
  ];

  return (
    <PageWrapper title="">
      <div className="flex items-center justify-between my-[30px]">
        <div className="text-[18px] mt-[25px]">
          <h1 className="font-bold">Project Task List</h1>
        </div>

        <div className="space-x-[10px] flex items-center">
          <Input
            suffix={<IoIosSearch />}
            className="w-[250px]"
            placeholder="Search here"
            onChange={(e) => handleSearch(e.target.value)}
          />
          <Select
            allowClear
            className="w-[250px]"
            placeholder="Search with status"
            onChange={(v) => handleSearchByStatus(v)}
          >
            {toolbox
              .removeDuplicateObjectsByProperty(
                taskList.map((col) => ({ id: col.columnId, title: col.columnId })),
                'title',
              )
              .map((col) => (
                <Select.Option key={col.id}>{col.title}</Select.Option>
              ))}
          </Select>
        </div>
      </div>

      <Table loading={loading} columns={columns} dataSource={dataSource} pagination={false} />
    </PageWrapper>
  );
};

export default ProjectDetails;
