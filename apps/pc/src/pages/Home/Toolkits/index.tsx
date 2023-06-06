import { ArrowRightOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginCheck } from '../../../hooks/useLoginCheck';

const Toolkits = () => {
  const navigate = useNavigate();
  useLoginCheck();

  return (
    <div>
      {/* 随机数生成器 */}
      <Button size="large" onClick={() => navigate('/toolkit/rng')} style={{ height: 'unset' }}>
        <div>RNG</div>
        <div>Random Number Generator</div>
        <ArrowRightOutlined />
      </Button>
      {/* 胜率计算器 */}
      <Button size="large" style={{ height: 'unset' }}>
        <div>Win rate</div>
        <div>Calculator</div>
        <ArrowRightOutlined />
      </Button>
    </div>
  );
};

export default Toolkits;
