import React from 'react';
import { Button } from 'antd';
import {
  DollarOutlined,
  SelectOutlined,
  SmileOutlined,
  TransactionOutlined,
} from '@ant-design/icons';
// import PlayerHandView from '../PlayerHandView';
import styles from '../BuyInPrepare/index.module.scss';
import { useCurrentBuyInData } from '../../../../models/buyIn';
import PlayResult from '../PlayResult';
import ownStyles from './index.module.scss';

const BuyInSetttle = () => {
  const {
    currentBuyInData: { amountPerhand, players: buyInPlayers },
    sumData,
    sumBenefit,
    changePlayer,
  } = useCurrentBuyInData();

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.leftWrap}>
          <div style={{ fontSize: 20 }}>结算状态</div>
          <div className={styles.amountSum}>
            <div>
              <DollarOutlined /> 总买入金额
            </div>
            <div>{sumData.amountSum} </div>
          </div>
        </div>

        <div className={styles.sumData}>
          <div className={styles.inputContainer}>
            <TransactionOutlined className={styles.iconMargin} /> 一手金额 {amountPerhand}
          </div>
          <div>
            <SmileOutlined className={styles.iconMargin} />
            总玩家数 {sumData.playerSum}
          </div>
          <div>
            <SelectOutlined className={styles.iconMargin} />
            总买入手数 {sumData.handSum}
          </div>
        </div>
      </div>
      <div className={styles.playerList}>
        {buyInPlayers.map((player, index) => (
          <div key={player.id} className={styles.playerContainer}>
            <PlayResult
              player={player}
              amoutPerHand={amountPerhand}
              changeRest={(player) => changePlayer(player, index)}
            ></PlayResult>
          </div>
        ))}
      </div>
      <div className={ownStyles.buttonList}>
        <div className={ownStyles.resUnderLine}>最终盈余总计 {sumBenefit}</div>
        <div>
          {sumBenefit == 0 ? (
            <Button className={styles.nextBtn}>Show final result</Button>
          ) : (
            <Button className={styles.nextBtn} disabled>
              Show final result
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
export default BuyInSetttle;
