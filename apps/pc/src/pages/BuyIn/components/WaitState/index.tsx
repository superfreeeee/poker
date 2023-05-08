import React, { useState } from 'react';
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
  // useCurrentBuyInData,
} from '../../../../models/buyIn';
import { ERouteName } from '../../../../routes/constants';
import { getPath } from '../../../../routes/utils';
import PlayerHandView from '../PlayerHandView';
import EditState from '../EditState';
import initStateStyles from '../InitialState/index.module.scss';
import styles from './index.module.scss';

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
  // const {
  //   currentBuyInData: { amountPerhand, players: buyInPlayers },
  //   sumData,
  //   addPlayer,
  // } = useCurrentBuyInData();

  const [isEdit, setIsEdit] = useState(false);

  const [amountPerHand, setAmoutPerHand] = useAmountPerHand();
  const [buyInPlayers, setBuyInPlayers] = useBuyInPlayers();
  const sumData = calSumData(buyInPlayers, amountPerHand);
  const navigate = useNavigate();

  const reset = () => {
    setAmoutPerHand(0);
    setBuyInPlayers(defaultBuyIn);
    navigate(getPath(ERouteName.BuyInInit));
  };

  return isEdit ? (
    <EditState
      onConfirm={() => {
        console.log('confirm edit');
        setIsEdit(false);
      }}
      onCancel={() => {
        console.log('cancel edit');
        setIsEdit(false);
      }}
    />
  ) : (
    <div className={initStateStyles.container}>
      <div className={initStateStyles.title}>
        <div className={initStateStyles.leftWrap}>
          <div style={{ fontSize: 20 }}>等待状态</div>
          <div className={initStateStyles.amountSum}>
            <div>
              <DollarOutlined /> 总买入金额
            </div>
            <div>{sumData.amountSum} </div>
          </div>
        </div>

        <div className={initStateStyles.sumData}>
          <div className={initStateStyles.inputContainer}>
            <TransactionOutlined className={initStateStyles.iconMargin} /> 一手金额 {amountPerHand}
          </div>
          <div>
            <SmileOutlined className={initStateStyles.iconMargin} />
            总玩家数 {sumData.playerSum}
          </div>
          <div>
            <SelectOutlined className={initStateStyles.iconMargin} />
            总买入手数 {sumData.handSum}
          </div>
        </div>
      </div>
      <div className={initStateStyles.playerList}>
        {buyInPlayers.map((player: IPlayer) => (
          <div key={player.id} className={initStateStyles.playerContainer}>
            <PlayerHandView player={player} />
          </div>
        ))}
      </div>
      <div className={styles.buttonList}>
        <div className={styles.twoBtnContainer}>
          <div>
            <Button
              className={initStateStyles.addBtn}
              icon={<EditFilled className={initStateStyles.btnSvg} onClick={reset} />}
              onClick={() => setIsEdit(true)}
            >
              Edit Setting
            </Button>
          </div>
          <div>
            <Button
              className={initStateStyles.nextBtn}
              icon={<BackwardFilled className={initStateStyles.btnSvg} />}
              // onClick={() => navigate(getPath(ERouteName.BuyInEdit))}
              onClick={() => navigate('/buyin/prepare')}
            >
              Reset Setting
            </Button>
          </div>
        </div>
        <div>
          <Button className={styles.nextBtn} onClick={() => navigate('/buyin/settle')}>
            Enter Settlement Stage
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WaitState;
