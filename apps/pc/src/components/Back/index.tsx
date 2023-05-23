import React, { FC } from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';

interface IBackProps {
  path?: string;
  beforeNavigate?: () => Promise<boolean> | boolean;
}

const Back: FC<IBackProps> = ({ path = '/', beforeNavigate }) => {
  const navigate = useNavigate();
  return (
    <Button
      type="text"
      size="large"
      style={{ fontSize: 20 }}
      icon={<ArrowLeftOutlined />}
      onClick={async () => {
        if (!beforeNavigate) {
          return navigate(path);
        }

        const enable = await beforeNavigate();
        if (enable) {
          navigate(path);
        }
      }}
    />
  );
};

export default Back;
