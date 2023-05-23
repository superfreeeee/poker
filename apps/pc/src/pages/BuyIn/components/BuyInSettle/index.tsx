import React, { FC } from 'react';
import { Button } from 'antd';
import { TransactionOutlined } from '@ant-design/icons';
import StatisticsDataView from '../StatisticsDataView';
import { useCurrentBuyInData } from '../../../../models/buyIn';
import PlayResult from '../PlayResult';
import initialStyles from '../BuyInPrepare/index.module.scss';
import styles from './index.module.scss';

interface IBuyInSettleProps {
  enterNextState: () => void;
}
const BuyInSettle: FC<IBuyInSettleProps> = ({ enterNextState }: IBuyInSettleProps) => {
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
          <Button
            className={initialStyles.nextBtn}
            onClick={() => enterNextState()}
            disabled={totalBenefit != 0}
          >
            Show final result
          </Button>
        </div>
      </div>
    </div>
  );
};
export default BuyInSettle;
