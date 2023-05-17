import React, { FC } from 'react';
import { Button, Modal } from 'antd';
import { TransactionOutlined, EditFilled, BackwardFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { IPlayer, useCurrentBuyInData } from '../../../../../models/buyIn';
import PlayerHandView from '../../PlayerHandView';
import StatisticsDataView from '../../StatisticsDataView';
import initialStyles from '../../BuyInPrepare/index.module.scss';
import styles from './index.module.scss';

interface IContentProps {
  enterEdit: () => void;
}

const Content: FC<IContentProps> = ({ enterEdit }: IContentProps) => {
  const {
    buyInData: { amountPerhand, players: buyInPlayers },
    statisticsData: { totalPlayer, totalHands, totalAmount },
    changeBuyInData,
  } = useCurrentBuyInData();
  const navigate = useNavigate();

  const reset = () => {
    Modal.confirm({
      title: 'Reset buyIn data',
      content: 'Are you sure to reset buy-in data?',
      centered: true,
      closable: true,
      maskClosable: true,
      okButtonProps: {
        type: 'primary',
        danger: true,
      },
      okText: 'Reset',
      onOk: () => {
        changeBuyInData({
          amountPerhand: 0,
          players: [],
        });
        navigate('/buyin/prepare');
      },
    });
  };

  return (
    <div className={initialStyles.container}>
      <div className={initialStyles.header}>
        <div className={initialStyles.leftWrap}>
          <div style={{ fontSize: 20 }}>等待状态</div>
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
        {buyInPlayers.map((player: IPlayer) => (
          <PlayerHandView key={player.id} player={player} />
        ))}
      </div>
      <div className={styles.buttonList}>
        <div className={styles.twoBtnContainer}>
          <div>
            <Button
              className={styles.nextBtn}
              icon={<BackwardFilled className={initialStyles.btnSvg} />}
              // onClick={() => navigate(getPath(ERouteName.BuyInEdit))}
              onClick={() => {
                reset();
              }}
            >
              Reset Setting
            </Button>
          </div>
          <div>
            <Button
              className={initialStyles.addBtn}
              icon={<EditFilled className={initialStyles.btnSvg} />}
              onClick={() => {
                enterEdit();
              }}
            >
              Edit Setting
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
