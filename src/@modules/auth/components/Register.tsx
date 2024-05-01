import { paths } from '@lib/constant';
import { Button, Col, Form, Input, Row, message } from 'antd/lib';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { BsFillPersonFill } from 'react-icons/bs';
import { MdEmail, MdLock } from 'react-icons/md';
import { IRegister } from '../lib/interfaces';

const Register = () => {
  const [loading, setIsLoading] = useState(false);
  const router = useRouter();
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = (values: IRegister) => {
    delete values.confirmPassword;
    setIsLoading(true);
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
      {contextHolder}
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
              <h2 className="text-2xl font-semibold">Create an Account!</h2>
            </div>
            <Form size="large" form={form} onFinish={onFinish}>
              <Form.Item
                name="firstName"
                rules={[
                  {
                    required: true,
                    message: 'Please input your first name',
                  },
                ]}
              >
                <Input prefix={<BsFillPersonFill />} placeholder="Your first name" type="text" />
              </Form.Item>

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
                  { required: true, message: 'Please input new password' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(getFieldValue('password'))) {
                        return Promise.resolve();
                      }
                      return new Promise((resolve, reject) => {
                        setTimeout(() => {
                          reject(new Error('Must Have 8 character and one uppercase and lowercase!'));
                        }, 1000);
                      });
                    },
                  }),
                ]}
                hasFeedback
              >
                <Input.Password prefix={<MdLock />} placeholder="Write your password" />
              </Form.Item>
              <Form.Item
                name="confirmPassword"
                rules={[
                  { required: true, message: '' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error("Passwords didn't matched"));
                    },
                  }),
                ]}
                hasFeedback
              >
                <Input.Password prefix={<MdLock />} placeholder="Please confirm your password" />
              </Form.Item>
              <Form.Item>
                <Button loading={loading} block type="primary" htmlType="submit">
                  Sign up
                </Button>
              </Form.Item>
              <p>
                Already have an account?{' '}
                <Link className="underline" href="/auth/login">
                  Log in
                </Link>
              </p>
            </Form>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Register;
