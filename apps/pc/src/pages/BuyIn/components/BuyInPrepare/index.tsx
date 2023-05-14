import React from 'react';
import { Input, Button, Form } from 'antd';
import { DownCircleFilled, TransactionOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import PlayerHand from '../PlayerHand';
import StatisticsDataView from '../StatisticsDataView';
import { useCurrentBuyInData } from '../../../../models/buyIn';
import styles from './index.module.scss';

const BuyInPrepare = () => {
  const {
    buyInData: { amountPerhand, players: buyInPlayers },
    statisticsData: { totalPlayer, totalHands, totalAmount },
    addPlayer,
    removePlayer,
    changePlayer,
    changeBuyInData,
  } = useCurrentBuyInData();

  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.leftWrap}>
          <div style={{ fontSize: 20 }}>初始状态</div>
          <div className={styles.inputForm}>
            <div>一手金额</div>
            <Form>
              <Form.Item
                name="amountPerhand"
                rules={[
                  {
                    required: true,
                    pattern: new RegExp(/^[1-9]\d*$/, 'g'),
                    message: '请输入正整数',
                  },
                  {
                    max:10,
                    message:'超出最大买入数量'
                  }
                ]}
              >
                <Input
                  placeholder="Input here"
                  maxLength={11}
                  value={amountPerhand}
                  bordered={false}
                  prefix={<TransactionOutlined />}
                  onChange={(e) => {
                    const amount = +e.target.value;
                    if (isNaN(amount)) {
                      return;
                    }
                    if (amount < 0) return;
                    changeBuyInData({
                      players: buyInPlayers,
                      amountPerhand: amount,
                    });
                  }}
                />
              </Form.Item>
            </Form>
          </div>
        </div>
        <StatisticsDataView
          totalPlayer={totalPlayer}
          totalHands={totalHands}
          totalAmount={totalAmount}
        />
      </div>
      <div className={styles.playerList}>
        {buyInPlayers.map((player, i) => (
          <PlayerHand
            key={player.id}
            player={player}
            onRemove={removePlayer}
            onChange={(player) => changePlayer(player, i)}
          ></PlayerHand>
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
          <Button
            className={styles.nextBtn}
            onClick={() => {
              navigate('/buyin/playing');
            }}
          >
            Start play
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BuyInPrepare;
