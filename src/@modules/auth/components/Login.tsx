'use client';
import { ENV } from '@lib/config';
import { apiMessages, paths } from '@lib/constant';
import { storage } from '@lib/utils';
import { Button, Checkbox, Col, Form, Input, Row, message } from 'antd/lib';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MdEmail, MdLock } from 'react-icons/md';
import { useLogin } from '../lib/hooks';

const Login = () => {
  const router = useRouter();
  const [messageApi, msgCtx] = message.useMessage();
  const redirectUrl = router.query?.redirectUrl?.toString();

  const loginFn = useLogin({
    config: {
      onSuccess(data) {
        if (!data?.user?.id) return;
        storage.setToken(data?.jwt);
        messageApi.loading(apiMessages.login);
        router.push(redirectUrl?.replace(ENV.NEXT_PUBLIC_BASE_URL, '') || paths.projectOverview.list);
      },
    },
  });

  return (
    <Row className="h-full" align="middle" justify="center">
      {msgCtx}
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
              <h2 className="text-2xl font-semibold">Please Login!</h2>
            </div>
            <Form size="large" onFinish={loginFn.mutateAsync}>
              <Form.Item
                name="identifier"
                rules={[
                  {
                    required: true,
                    message: 'Please input your email!',
                  },
                ]}
              >
                <Input prefix={<MdEmail />} placeholder="Email" type="email" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    // min: 6,
                    message: 'Please input your password!',
                  },
                ]}
              >
                <Input.Password prefix={<MdLock />} placeholder="Password" />
              </Form.Item>
              <div className="flex justify-between mb-6">
                <Checkbox>Remember me</Checkbox>
                <Link className="underline" href="/auth/forgot-password">
                  Forgot password?
                </Link>
              </div>
              <Form.Item>
                <Button loading={loginFn?.isPending} block type="primary" htmlType="submit">
                  Sign in
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

export default Login;
