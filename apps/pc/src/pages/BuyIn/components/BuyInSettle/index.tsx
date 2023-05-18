import React, { useState } from 'react';
import { Button } from 'antd';
import { TransactionOutlined } from '@ant-design/icons';
import PlayResultView from '../PlayResultView';
import StatisticsDataView from '../StatisticsDataView';
import { useCurrentBuyInData } from '../../../../models/buyIn';
import PlayResult from '../PlayResult';
import initialStyles from '../BuyInPrepare/index.module.scss';
import styles from './index.module.scss';

const BuyInSetttle = () => {
  const [isEdit, setEdit] = useState(true);
  const {
    buyInData: { amountPerhand, players: buyInPlayers },
    statisticsData: { totalPlayer, totalHands, totalAmount },
    totalBenefit,
    changePlayer,
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
      {isEdit ? (
        <>
          <div className={initialStyles.playerList}>
            {buyInPlayers.map((player, i) => (
              <PlayResult
                key={player.id}
                player={player}
                amoutPerHand={amountPerhand}
                onChange={(player) => changePlayer(player, i)}
              ></PlayResult>
            ))}
          </div>
          <div className={styles.buttonList}>
            <div className={styles.resUnderLine}>最终盈余总计 {totalBenefit}</div>
            <div>
              {totalBenefit == 0 ? (
                <Button className={initialStyles.nextBtn} onClick={() => setEdit(false)}>
                  Show final result
                </Button>
              ) : (
                <Button className={initialStyles.nextBtn} disabled>
                  Show final result
                </Button>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={initialStyles.playerList}>
            {buyInPlayers.map((player) => (
              <PlayResultView
                key={player.id}
                player={player}
                amoutPerhand={amountPerhand}
              ></PlayResultView>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
export default BuyInSetttle;
