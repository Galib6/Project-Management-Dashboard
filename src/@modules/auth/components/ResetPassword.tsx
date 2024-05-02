'use client';
import { storage } from '@lib/utils';
import { Button, Col, Form, Input, Row, notification } from 'antd/lib';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MdLock } from 'react-icons/md';
import { useResetPassword } from '../lib/hooks';

const ResetPassword = () => {
  const router = useRouter();
  const { token } = router?.query;

  const ResetPasswordFn = useResetPassword({
    config: {
      onSuccess(data) {
        if (!data?.user?.id) return;
        storage.setToken(data?.jwt);
        notification.success({
          message: 'Password reset successfully',
        });
        router.push('/');
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
              <h2 className="text-2xl font-semibold">Reset your password!</h2>
            </div>
            <Form size="large" onFinish={(v) => ResetPasswordFn.mutateAsync({ ...v, code: token })}>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: 'Please input new password' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(getFieldValue('password'))) {
                        return Promise.resolve();
                      }
                      return new Promise((_resolve, reject) => {
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
                name="passwordConfirmation"
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
                <Button loading={ResetPasswordFn?.isPending} block type="primary" htmlType="submit">
                  Submit
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

export default ResetPassword;
