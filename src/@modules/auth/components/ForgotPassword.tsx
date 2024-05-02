'use client';
import { Button, Col, Form, Input, Row, notification } from 'antd/lib';
import Image from 'next/image';
import Link from 'next/link';
import { MdEmail } from 'react-icons/md';
import { useForgotPassword } from '../lib/hooks';

const ForgotPassword = () => {
  const forgotPasswordFn = useForgotPassword({
    config: {
      onSuccess(data) {
        if (!data?.ok) return;
        notification.success({
          message: 'Email sent successfully',
        });
      },
    },
  });

  return (
    <Row className="h-full" align="middle" justify="center">
      <Col sm={24} md={10} lg={12}>
        <div className="items-center justify-center hidden h-full md:flex">
          <Image
            priority
            width={500}
            height={500}
            src="https://res.cloudinary.com/dxthattjv/image/upload/v1714540789/16640_4b00293902.jpg"
            alt="auth-thumb"
          />
        </div>
      </Col>
      <Col sm={24} md={14} lg={12}>
        <div className="flex justify-center py-10">
          <div className="xl:w-1/2 md:w-3/4 sm:w-full sm:p-6 md:p-0">
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-semibold">Please write your email!</h2>
            </div>
            <Form size="large" onFinish={forgotPasswordFn.mutateAsync}>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Please input your email!',
                  },
                ]}
              >
                <Input prefix={<MdEmail />} placeholder="Email" type="email" />
              </Form.Item>
              <Form.Item>
                <Button loading={forgotPasswordFn?.isPending} block type="primary" htmlType="submit">
                  Send Email
                </Button>
              </Form.Item>
              <p>
                Don't have an account?{' '}
                <Link className="underline" href="/auth/register">
                  Register
                </Link>
              </p>
            </Form>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default ForgotPassword;
