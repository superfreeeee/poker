import React, { FC } from 'react';
import { Button } from 'antd';
import {
  SelectOutlined,
  SmileOutlined,
  TransactionOutlined,
  EditFilled,
  BackwardFilled,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { IPlayer, useCurrentBuyInData } from '../../../../models/buyIn';
import PlayerHandView from '../PlayerHandView';
import BuyInTitle from '../BuyInTitle';
import initStateStyles from '../BuyInPrepare/index.module.scss';
import styles from './index.module.scss';

interface IContentProps {
  enterEdit: () => void;
}

const Content: FC<IContentProps> = ({ enterEdit }: IContentProps) => {
  const {
    currentBuyInData: { amountPerhand, players: buyInPlayers },
    sumData,
    changeCurrentBuyInData,
  } = useCurrentBuyInData();
  const navigate = useNavigate();

  const reset = () => {
    changeCurrentBuyInData({
      amountPerhand: 0,
      players: [],
    });
    navigate('/buyin/prepare');
  };

  return (
    <div className={styles.container}>
      <div className={initStateStyles.header}>
        <BuyInTitle title="等待状态" totalAmount={sumData.amountSum} />
        <div className={initStateStyles.sumData}>
          <div className={initStateStyles.inputContainer}>
            <TransactionOutlined className={initStateStyles.iconMargin} /> 一手金额 {amountPerhand}
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
              icon={<EditFilled className={initStateStyles.btnSvg} />}
              onClick={() => {
                enterEdit();
              }}
            >
              Edit Setting
            </Button>
          </div>
          <div>
            <Button
              className={initStateStyles.nextBtn}
              icon={<BackwardFilled className={initStateStyles.btnSvg} />}
              // onClick={() => navigate(getPath(ERouteName.BuyInEdit))}
              onClick={() => {
                reset();
              }}
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

export default Content;
