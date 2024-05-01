'use client';
import { apiMessages } from '@lib/constant';
import { Button, Checkbox, Col, Form, Input, Row, message } from 'antd/lib';
import Image from 'next/image';
import Link from 'next/link';
import LoginThumb from 'public/images/auth-thumb.svg';
import { MdEmail, MdLock } from 'react-icons/md';
import { useLogin } from '../lib/hooks';

const Login = () => {
  const [messageApi, msgCtx] = message.useMessage();

  const loginFn = useLogin({
    config: {
      onSuccess(data) {
        if (!data?.success) return;
        // router.push(paths.console.root);
        messageApi.success(apiMessages.login);
      },
    },
  });

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
          <Image priority src={LoginThumb} alt="auth-thumb" />
        </div>
      </Col>
      <Col sm={24} md={14} lg={12}>
        <div className="flex justify-center py-10">
          <div className="xl:w-1/2 md:w-3/4 sm:w-full sm:p-6 md:p-0">
            <div className="mb-10 text-center">
              <img className="mx-auto mb-8" src="/images/logo.png" alt="logo" />
              <h2 className="text-2xl font-semibold">Welcome Back! Please Login</h2>
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

            <Form
              size="large"
              onFinish={(values) => {
                loginFn.mutateAsync(values);
              }}
            >
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
                <Button block type="primary" htmlType="submit">
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
