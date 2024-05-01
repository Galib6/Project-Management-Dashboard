'use client';

import { userName } from '@lib/constant';
import { Button, Col, Form, FormInstance, Row, Select } from 'antd/lib';
import { IProjectCreate } from '../lib/interfaces';

interface IProps {
  form: FormInstance;
  formType?: 'create' | 'update';
  initialValues?: Partial<IProjectCreate>;
  onFinish?: (values: IProjectCreate) => void;
  loading?: boolean;
}

const MemberAssignForm: React.FC<IProps> = ({ form, initialValues, onFinish, loading }) => {
  const handleOnFinish = (values) => {
    onFinish(values);
  };

  return (
    <Form size="large" layout="vertical" form={form} initialValues={initialValues} onFinish={handleOnFinish}>
      <Row gutter={{ sm: 16, md: 20, lg: 32 }}>
        <Col span={24}>
          <Form.Item
            label="name"
            name="assignedMember"
            rules={[
              {
                required: true,
                message: 'Please write name!',
              },
            ]}
          >
            <Select virtual={false} className="w-full" allowClear mode="multiple">
              {userName.map((item) => (
                <Select.Option key={item.id} value={item.name}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
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

export default MemberAssignForm;
