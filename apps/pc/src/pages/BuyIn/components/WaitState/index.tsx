import React from 'react';
import { Button } from 'antd';
import {
  DollarOutlined,
  SelectOutlined,
  SmileOutlined,
  TransactionOutlined,
  EditFilled,
  BackwardFilled,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import {
  IPlayer,
  BuyInPlayer,
  ISumData,
  useAmountPerHand,
  useBuyInPlayers,
  defaultBuyIn,
} from '../../../../models/buyIn';
import { ERouteName } from '../../../../routes/constants';
import { getPath } from '../../../../routes/utils';
import PlayerHandView from '../PlayerHandView';
import styles from '../InitialState/index.module.scss';
import ownStyles from './index.module.scss';

const calSumData = (details: BuyInPlayer, amoutPerHand: number): ISumData => {
  let handSum = 0;
  details.forEach((element: IPlayer) => {
    handSum += element.hands;
  });
  const sumData: ISumData = {
    playerSum: details.length,
    handSum: handSum,
    amountSum: handSum * amoutPerHand,
  };
  return sumData;
};

const WaitState = () => {
  const [amountPerHand, setAmoutPerHand] = useAmountPerHand();
  const [buyInPlayers, setBuyInPlayers] = useBuyInPlayers();
  const sumData = calSumData(buyInPlayers, amountPerHand);
  const navigate = useNavigate();

  const reset = () => {
    setAmoutPerHand(0);
    setBuyInPlayers(defaultBuyIn);
    navigate(getPath(ERouteName.BuyInInit));
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.leftWrap}>
          <div style={{ fontSize: 20 }}>等待状态</div>
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
            <PlayerHandView player={player} />
          </div>
        ))}
      </div>
      <div className={ownStyles.buttonList}>
        <div className={ownStyles.twoBtnContainer}>
          <div>
            <Button
              className={styles.addBtn}
              icon={<EditFilled className={styles.btnSvg} onClick={reset} />}
            >
              Edit Setting
            </Button>
          </div>
          <div>
            <Button
              className={styles.nextBtn}
              icon={<BackwardFilled className={styles.btnSvg} />}
              onClick={() => navigate(getPath(ERouteName.BuyInEdit))}
            >
              Reset Setting
            </Button>
          </div>
        </div>
        <div>
          <Button className={ownStyles.nextBtn}> Enter Settlement Stage</Button>
        </div>
      </div>
    </div>
  );
};

export default WaitState;
