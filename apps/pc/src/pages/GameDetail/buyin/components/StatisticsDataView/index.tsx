import React, { FC } from 'react';
import { DollarOutlined, SelectOutlined, SmileOutlined } from '@ant-design/icons';
import styles from './index.module.scss';
interface IStatisticsData {
  totalPlayer: number;
  totalHands: number;
  totalAmount: number;
}
const StatisticsDataView: FC<IStatisticsData> = ({
  totalPlayer,
  totalHands,
  totalAmount,
}: IStatisticsData) => {
  return (
    <div className={styles.container}>
      <div>
        <SmileOutlined className={styles.iconMargin} />
        总玩家数 {totalPlayer}
      </div>
      <div>
        <SelectOutlined className={styles.iconMargin} />
        总买入手数 {totalHands}
      </div>
      <div>
        <DollarOutlined className={styles.iconMargin} />
        总买入金额 {totalAmount}
      </div>
    </div>
  );
};
export default StatisticsDataView;
