'use client';

import { apiMessages } from '@lib/constant';
import { ColumnsType } from 'antd/es/table';
import {
    Avatar,
    Button,
    Drawer,
    Form,
    Modal,
    PaginationProps,
    Popconfirm,
    Space,
    Table,
    Tooltip,
    message,
} from 'antd/lib';
import React, { useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { BiSolidMessageSquareEdit } from 'react-icons/bi';
import { RiEditBoxFill } from 'react-icons/ri';
import { useProjectDelete, useProjectUpdate } from '../lib/hooks';
import { IProject } from '../lib/interfaces';
import MemberAssignForm from './MemberAssingeForm';
import ProjectForm from './ProjectsForm';

interface IProps {
  data?: IProject[];
  loading: boolean;
  pagination?: PaginationProps;
}

const ProjectList: React.FC<IProps> = ({ data, loading, pagination }) => {
  const [messageApi, messageCtx] = message.useMessage();
  const [updateFormInstance] = Form.useForm();
  const [addNewMemberModal, setAddNewMemberModal] = useState<any>();
  const [assignMemberInstance] = Form.useForm();

  // Project delete functionalities
  const deleteProject = useProjectDelete({
    config: {
      onSuccess(res) {
        if (!res?.data?.id) return;
        messageApi.success(apiMessages.delete);
      },
    },
  });

  // Project update functionalities
  const [updateItem, setUpdateItem] = useState<IProject>(null);

  const updateProject = useProjectUpdate({
    config: {
      onSuccess: (res) => {
        if (!res?.data?.id) return;
        setUpdateItem(null);
        updateFormInstance.resetFields();
        setAddNewMemberModal(null);
        assignMemberInstance.resetFields();
        messageApi.success(apiMessages.update);
      },
    },
  });

  // Project table data source config
  const dataSource = data?.map((x) => ({
    key: x?.id,
    id: x?.id,
    title: x?.attributes?.title,
    descriptions: x?.attributes?.description,
    assignedMember: x?.attributes?.assignedMember,
  }));

  const columns: ColumnsType<(typeof dataSource)[number]> = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Descriptions',
      dataIndex: 'descriptions',
      key: 'descriptions',
    },
    {
      title: 'Assigned Member',
      dataIndex: 'assignedMember',
      key: 'assignedMember',
      render: (assignedMember, record) => (
        <Space>
          <Avatar.Group maxCount={2}>
            {assignedMember?.map((x, i) => (
              <Avatar key={i} style={{ backgroundColor: '#f56a00' }}>
                {x.slice(0, 1).toUpperCase()}
              </Avatar>
            ))}
          </Avatar.Group>
          <Tooltip title="View or Edit Project Assignees">
            <Button
              onClick={() => setAddNewMemberModal(record as any)}
              type="primary"
              shape="circle"
              icon={<BiSolidMessageSquareEdit size={20} />}
            />
          </Tooltip>
        </Space>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      render: (id) => (
        <Space>
          <Button
            className="!h-auto !p-[8px]"
            onClick={async () => }
          >
            <RiEditBoxFill size={16} />
          </Button>
          <Button
            className="!h-auto !p-[8px]"
            onClick={async () => {
              const selectedData = data?.find((x) => x.id === id);
              updateFormInstance.setFieldsValue(selectedData?.attributes);
              setUpdateItem(selectedData);
            }}
          >
            <RiEditBoxFill size={16} />
          </Button>
          <Popconfirm
            title="Are you sure to delete it?"
            onConfirm={() => deleteProject.mutate(id)}
            okText="Yes"
            cancelText="No"
            okButtonProps={{ danger: true }}
          >
            <Button
              danger
              type="primary"
              className="!w-auto !h-auto !p-[5px]"
              style={{ fontSize: 20, borderRadius: 5 }}
            >
              <AiFillDelete />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <React.Fragment>
      {messageCtx}
      <Table loading={loading} columns={columns} dataSource={dataSource} pagination={pagination} />
      <Drawer
        title="Update Project"
        width={600}
        open={updateItem?.id ? true : false}
        onClose={() => setUpdateItem({} as IProject)}
      >
        <ProjectForm
          form={updateFormInstance}
          formType="update"
          loading={updateProject.isPending}
          onFinish={(values) =>
            updateProject.mutateAsync({
              id: updateItem?.id,
              data: {
                data: values as any,
              },
            })
          }
        />
      </Drawer>
      <Modal
        footer={null}
        title="Update Project"
        width={400}
        open={!!addNewMemberModal}
        onCancel={() => setAddNewMemberModal(null)}
      >
        <MemberAssignForm
          form={assignMemberInstance}
          formType="update"
          initialValues={addNewMemberModal}
          loading={updateProject.isPending}
          onFinish={(values: any) =>
            updateProject.mutateAsync({
              id: addNewMemberModal?.id,
              data: {
                data: {
                  assignedMember: [...values.assignedMember],
                } as any,
              },
            })
          }
        />
      </Modal>
    </React.Fragment>
  );
};

export default ProjectList;
