'use client';

import { Button, Col, Form, FormInstance, Input, Row } from 'antd/lib';
import { IProjectCreate } from '../lib/interfaces';

interface IProps {
  form: FormInstance;
  formType?: 'create' | 'update';
  initialValues?: Partial<IProjectCreate>;
  onFinish?: (values: IProjectCreate) => void;
  loading?: boolean;
}

const ProjectForm: React.FC<IProps> = ({ form, initialValues, onFinish, loading }) => {
  const handleOnFinish = (values) => {
    onFinish(values);
  };

  return (
    <Form size="large" layout="vertical" form={form} initialValues={initialValues} onFinish={handleOnFinish}>
      <Row gutter={{ sm: 16, md: 20, lg: 32 }}>
        <Col span={24}>
          <Form.Item
            label="title"
            name="title"
            rules={[
              {
                required: true,
                message: 'Please select title!',
              },
            ]}
          >
            <Input placeholder="Select a title" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            label="description"
            name="description"
            rules={[
              {
                required: true,
                message: 'Please select description!',
              },
            ]}
          >
            <Input.TextArea placeholder="Select a description" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item className="text-right">
            <Button loading={loading} type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default ProjectForm;
