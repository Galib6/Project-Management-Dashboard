import { debounceFn, toolbox } from '@lib/utils';
import { Form, Input } from 'antd/lib';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

interface IProps {
  term?: string;
}
const BaseSearchTerm: React.FC<IProps> = ({ term = 'searchTerm' }) => {
  const router = useRouter();

  const handleChange = (value) => {
    router.push({
      query: toolbox.toCleanObject({
        ...router.query,
        [term]: value,
      }),
    });
  };

  const debouncedSearch = debounceFn(handleChange, 1000);

  const [formInstance] = Form.useForm();
  useEffect(() => {
    formInstance.setFieldValue(term, router?.query[term]);
  }, [formInstance, term, router]);

  return (
    <Form form={formInstance}>
      <Form.Item name={term} style={{ margin: 0 }}>
        <Input
          allowClear
          prefix={<AiOutlineSearch />}
          placeholder="Search..."
          onChange={(e) => {
            debouncedSearch(e?.target?.value);
          }}
        />
      </Form.Item>
    </Form>
  );
};

export default BaseSearchTerm;
