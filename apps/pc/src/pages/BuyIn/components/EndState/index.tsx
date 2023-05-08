import React from 'react';
import { Button } from 'antd';
import {
  DollarOutlined,
  SelectOutlined,
  SmileOutlined,
  TransactionOutlined,
} from '@ant-design/icons';
// import { ERouteName } from '../../../../routes/constants';
// import { getPath } from '../../../../routes/utils';
// import PlayerHandView from '../PlayerHandView';
import styles from '../InitialState/index.module.scss';
import {
  BuyInPlayer,
  IPlayer,
  ISumData,
  useAmountPerHandValue,
  useBuyInPlayers,
} from '../../../../models/buyIn';
import PlayResult from '../PlayResult';
import ownStyles from './index.module.scss';

const calSumData = (players: BuyInPlayer, amoutPerHand: number): ISumData => {
  let handSum = 0;
  players.forEach((element: IPlayer) => {
    handSum += element.hands;
  });
  const sumData: ISumData = {
    playerSum: players.length,
    handSum: handSum,
    amountSum: handSum * amoutPerHand,
  };
  return sumData;
};

const calSumBenefit = (players: BuyInPlayer, amoutPerHand: number): number => {
  let sumBenefit = 0;
  players.forEach((player: IPlayer) => (sumBenefit += player.rest - player.hands * amoutPerHand));
  return sumBenefit;
};

const EndState = () => {
  const amountPerHand = useAmountPerHandValue();
  const [buyInPlayers, setBuyInPlayers] = useBuyInPlayers();

  const sumData = calSumData(buyInPlayers, amountPerHand);

  const sumBenefit = calSumBenefit(buyInPlayers, amountPerHand);

  const handleRestChange = (id: string, rest: number) => {
    const newPlayerList = buyInPlayers.slice();
    newPlayerList.forEach((player: IPlayer) => {
      if (player.id === id) player.rest = rest;
    });
    setBuyInPlayers(newPlayerList);
  };

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
            <TransactionOutlined className={styles.iconMargin} /> 一手金额 {amountPerHand}
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
        {buyInPlayers.map((player: IPlayer) => (
          <div key={player.id} className={styles.playerContainer}>
            <PlayResult
              player={player}
              amoutPerHand={amountPerHand}
              changeRest={(id, rest) => handleRestChange(id, rest)}
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
export default EndState;
