'use client';
import { PageHeader } from '@ant-design/pro-layout';
import { apiMessages } from '@lib/constant';
import { toolbox } from '@lib/utils';
import BaseSearchTerm from '@modules/base/components/BaseSearchTerm';
import PageWrapper from '@modules/base/components/PageWrapper';
import { IBaseFilter } from '@modules/base/interfaces';
import ProjectForm from '@modules/projects/components/ProjectsForm';
import ProjectList from '@modules/projects/components/ProjectsList';
import { useProjectCreate, useProjects } from '@modules/projects/lib/hooks';

import { Button, Drawer, Form, Tag, message } from 'antd/lib';
import { useRouter } from 'next/router';
import { useState } from 'react';

const ProjectPage = () => {
  const [messageApi, messageCtx] = message.useMessage();
  const router = useRouter();
  const [createFormInstance] = Form.useForm();

  const { page = 1, limit = 10, searchTerm }: IBaseFilter = toolbox.parseQueryParams<IBaseFilter>(router.asPath);

  // query functionalities
  const { isLoading, data, isPending, isRefetching } = useProjects({
    options: {
      pagination: {
        page: Number(page),
        pageSize: Number(limit),
      },
      filters: {
        title: {
          $contains: searchTerm,
        },
      },
      //   populate: {
      //     test: {
      //       populate: 'test',
      //     },
      //     user: {
      //       populate: 'user',
      //     },
      //     image: {
      //       populate: '*',
      //     },
      //   },
    },
  });

  // Project create functionalities
  const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false);
  const createProject = useProjectCreate({
    config: {
      onSuccess: (res) => {
        if (!res?.data?.id) return;
        createFormInstance.resetFields();
        setDrawerOpen(false);
        messageApi.success(apiMessages.create);
      },
    },
  });

  return (
    <PageWrapper title="">
      {messageCtx}
      <PageHeader
        title="Project list"
        subTitle={<BaseSearchTerm />}
        tags={<Tag>Total items: {data?.meta?.pagination?.total}</Tag>}
        extra={[
          <Button key="1" type="primary" onClick={() => setDrawerOpen(true)}>
            Create
          </Button>,
        ]}
      />
      <ProjectList
        loading={isLoading || isPending || isRefetching}
        data={data?.data}
        pagination={{
          total: data?.meta?.pagination?.total,
          current: Number(page),
          pageSize: Number(limit),
          onChange: (page, limit) =>
            router.push({
              query: toolbox.toCleanObject({ ...router.query, page, limit }),
            }),
        }}
      />

      <Drawer title="Create a new project" width={600} open={isDrawerOpen} onClose={() => setDrawerOpen(false)}>
        <ProjectForm
          form={createFormInstance}
          loading={createProject.isPending}
          onFinish={async (values) =>
            createProject.mutateAsync({
              data: values as any,
            })
          }
        />
      </Drawer>
    </PageWrapper>
  );
};

export default ProjectPage;
