import React from 'react';
import { TransactionOutlined } from '@ant-design/icons';
import StatisticsDataView from '../components/StatisticsDataView';
import { useCurrentBuyInData } from '../../../models/buyIn';
import initialStyles from '../components/BuyInPrepare/index.module.scss';
import PlayResultView from './PlayResultView/index';

const BuyInView = () => {
  const {
    buyInData: { amountPerhand, players: buyInPlayers },
    statisticsData: { totalPlayer, totalHands, totalAmount },
  } = useCurrentBuyInData();
  return (
    <div className={initialStyles.container}>
      <div className={initialStyles.header}>
        <div className={initialStyles.leftWrap}>
          <div style={{ fontSize: 20 }}>结算状态</div>
          <div>
            <TransactionOutlined className={initialStyles.iconMargin} /> 一手金额 {amountPerhand}
          </div>
        </div>

        <StatisticsDataView
          totalPlayer={totalPlayer}
          totalHands={totalHands}
          totalAmount={totalAmount}
        />
      </div>
      <div className={initialStyles.playerList}>
        {buyInPlayers.map((player) => (
          <PlayResultView
            key={player.id}
            player={player}
            amoutPerhand={amountPerhand}
          ></PlayResultView>
        ))}
      </div>
    </div>
  );
};
export default BuyInView;
