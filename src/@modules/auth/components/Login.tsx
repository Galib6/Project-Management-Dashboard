'use client';
import { paths } from '@lib/constant';
import { Button, Checkbox, Col, Form, Input, Row, message } from 'antd/lib';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { MdEmail, MdLock } from 'react-icons/md';

const Login = () => {
  const router = useRouter();
  const [messageApi, msgCtx] = message.useMessage();
  const [loading, setIsLoading] = useState(false);

  const handleLogin = (_values) => {
    messageApi.open({
      type: 'loading',
      content: 'Welcome! Please wait a moment...',
      duration: 1.5,
    });
    setTimeout(() => {
      setIsLoading(false);
      router.push(paths.root);
    }, 2000);
  };

  return (
    <Row className="h-full" align="middle" justify="center">
      {msgCtx}
      <Col sm={24} md={10} lg={12}>
        <div
          className="items-center justify-center hidden h-full md:flex"
          // style={{
          //   background: `url(${IMAGES.AuthBg})`,
          //   backgroundSize: 'cover',
          //   backgroundRepeat: 'round',
          // }}
        >
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

            {/* <div className="text-center">
              <Button
                loading={ssoFn.isLoading}
                onClick={() => {
                  ssoFn.mutateAsync({
                    redirectUrl: 'https://staging-vt-user.vercel.app/auth/login',
                    'x-api-key': 'abd81f8dff6aea6340aef87eccad4df4',
                    'x-api-secret': '608b13ace88bf734dae36d6686df2c4b80c333f8cc4be7c98c8667d4b8a4df28',
                  });
                }}
                type="primary"
                htmlType="submit"
              >
                Access with VisaThing
              </Button>
            </div> */}

            <Form size="large" onFinish={handleLogin}>
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
                <Link href="/">Forgot password</Link>
              </div>
              <Form.Item>
                <Button loading={loading} block type="primary" htmlType="submit">
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
