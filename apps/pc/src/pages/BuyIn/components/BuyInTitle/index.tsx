import React, { FC } from 'react';
import { DollarOutlined } from '@ant-design/icons';
import styles from './index.module.scss';

interface IBuyInTitleProps {
  title: string;
  totalAmount: number;
}

const BuyInTitle: FC<IBuyInTitleProps> = ({ title, totalAmount }) => {
  return (
    <div className={styles.leftWrap}>
      <div style={{ fontSize: 20 }}>{title}</div>
      <div className={styles.amountSum}>
        <div>
          <DollarOutlined /> 总买入金额
        </div>
        <div>{totalAmount}</div>
      </div>
    </div>
  );
};

export default BuyInTitle;
