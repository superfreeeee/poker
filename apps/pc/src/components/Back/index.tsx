import React, { FC } from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';

interface IBackProps {
  path?: string;
}

const Back: FC<IBackProps> = ({ path = '/' }) => {
  const navigate = useNavigate();
  return (
    <Button
      type="text"
      size="large"
      style={{ fontSize: 20 }}
      icon={<ArrowLeftOutlined />}
      onClick={() => {
        navigate(path);
      }}
    />
  );
};

export default Back;
