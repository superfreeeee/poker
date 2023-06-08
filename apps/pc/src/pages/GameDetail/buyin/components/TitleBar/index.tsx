import React from 'react';
import { Input, message, Button } from 'antd';
import { TransactionOutlined } from '@ant-design/icons';
import { BuyInStatistics } from '../../model';
import StatisticsDataView from '../StatisticsDataView';
import styles from './index.module.scss';

interface ITitleBarProps {
  title: string;
  isEditable: boolean;
  amountPerhand: number;
  statisticsData: BuyInStatistics;
  handleAmountPerhandChange?: (amount: number) => void;
  enableRemove?: VoidFunction;
}

const TitleBar = ({
  title,
  isEditable,
  amountPerhand,
  statisticsData,
  enableRemove,
  handleAmountPerhandChange,
}: ITitleBarProps) => {
  return (
    <div className={styles.header}>
      <div className={styles.leftWrap}>
        <div className={styles.title}>
          {title}
          {enableRemove && (
            <Button onClick={enableRemove} className={styles.removeBtn}>
              删除
            </Button>
          )}
        </div>
        {isEditable ? (
          <div className={styles.inputForm}>
            <div>一手金额</div>
            <Input
              placeholder="Input here"
              maxLength={11}
              value={amountPerhand}
              bordered={false}
              prefix={<TransactionOutlined />}
              onChange={(e) => {
                const amount = +e.target.value;
                if (isNaN(amount)) {
                  message.error('一手金额必须为正整数');
                  return;
                }
                handleAmountPerhandChange?.(amount);
              }}
            />
          </div>
        ) : (
          <div>
            <TransactionOutlined /> 一手金额
            {amountPerhand}
          </div>
        )}
      </div>
      <StatisticsDataView
        totalPlayer={statisticsData.totalPlayer}
        totalHands={statisticsData.totalHands}
        totalAmount={statisticsData.totalAmount}
      />
    </div>
  );
};
export default TitleBar;
