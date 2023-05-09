import React from 'react';
import { Input, Button } from 'antd';
import {
  DownCircleFilled,
  DollarOutlined,
  SelectOutlined,
  SmileOutlined,
  TransactionOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import PlayerHand from '../PlayerHand';
import { useCurrentBuyInData } from '../../../../models/buyIn';
import styles from './index.module.scss';

const BuyInPrepare = () => {
  const {
    currentBuyInData: { amountPerhand, players: buyInPlayers },
    sumData,
    addPlayer,
    removePlayer,
    changePlayer,
    changeCurrentBuyInData,
  } = useCurrentBuyInData();

  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.leftWrap}>
          <div style={{ fontSize: 20 }}>初始状态</div>
          <div className={styles.amountSum}>
            <div>
              <DollarOutlined /> 总买入金额
            </div>
            <div>{sumData.amountSum} </div>
          </div>
        </div>

        <div className={styles.sumData}>
          <div className={styles.inputContainer}>
            <TransactionOutlined className={styles.iconMargin} /> 一手金额
            <div className={styles.inputHand}>
              <Input
                placeholder="Input here"
                maxLength={10}
                value={amountPerhand}
                bordered={false}
                onChange={(e) => {
                  const amount = +e.target.value;
                  if (isNaN(amount)) {
                    return;
                  }

                  changeCurrentBuyInData({
                    players: buyInPlayers,
                    amountPerhand: amount,
                  });
                }}
              />
            </div>
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
        {buyInPlayers.map((player, i) => (
          <div key={player.id} className={styles.playerContainer}>
            <PlayerHand
              player={player}
              onRemove={removePlayer}
              onChange={(player) => changePlayer(player, i)}
            ></PlayerHand>
          </div>
        ))}
      </div>
      <div className={styles.buttonList}>
        <div>
          <Button
            className={styles.addBtn}
            icon={<DownCircleFilled className={styles.btnSvg} />}
            onClick={addPlayer}
          >
            Add more player
          </Button>
        </div>
        <div>
          <Button className={styles.nextBtn} onClick={() => navigate('/buyin/playing')}>
            Start play
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BuyInPrepare;
