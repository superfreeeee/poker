import React, { useMemo } from 'react';
import { TransactionOutlined } from '@ant-design/icons';
import Header from '../../../components/Header';
import PlayResult from '../components/PlayResult';
import StatisticsDataView from '../components/StatisticsDataView';
import initialStyles from '../components/BuyInPrepare/index.module.scss';
import { calcStatisticsData, useCurrentBuyInData } from '../model';
import mockBuyInData from './mockBuyInData.json';

const BuyInView = () => {
  // TODO
  // const buyInData = useXxxAPI();

  const currentBuyInData = useCurrentBuyInData();
  const buyInData = currentBuyInData.players.length > 0 ? currentBuyInData : mockBuyInData;

  const { amountPerhand, players: buyInPlayers } = buyInData;
  const { totalPlayer, totalHands, totalAmount } = useMemo(
    () => calcStatisticsData(buyInData),
    [buyInData],
  );

  return (
    <>
      <Header title="BuyIn Detail" back="/" style={{ alignSelf: 'stretch' }} />
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
            <PlayResult
              key={player.id}
              player={player}
              amountPerhand={amountPerhand}
              isEditable={false}
            ></PlayResult>
          ))}
        </div>
      </div>
    </>
  );
};
export default BuyInView;
