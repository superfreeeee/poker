import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Button, List } from 'antd';
import classNames from 'classnames';
import { DeleteOutlined, MoneyCollectOutlined, UserOutlined } from '@ant-design/icons';
import { BuyInData } from '../../../../models/buyIn';
import { useBuyInDataRemoveService } from '../../../../services/buyin';
import { confirmModal } from '../utils';
import styles from './index.module.scss';

interface IProps {
  data: BuyInData;
}

const BuyInResult: FC<IProps> = ({ data }) => {
  const totalBuyIn = data.players.reduce(
    (total, player) => total + player.hands * data.amountPerhand,
    0,
  );

  const { gameId = '' } = useParams();
  const buyInRemoveService = useBuyInDataRemoveService();
  const removeBuyInData = () => {
    confirmModal({
      title: 'Remove buyIn data',
      content: 'Are you sure to remove buy-in data?',
      okText: 'Confirm',
      onOk: () => buyInRemoveService(gameId),
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        <div>
          <h3>Game Result</h3>
          <div className={styles.totalBuyIn}>Total Buy-in: {totalBuyIn}</div>
        </div>
        <div className={styles.actions}>
          <Button danger onClick={removeBuyInData}>
            <DeleteOutlined />
            删除
          </Button>
        </div>
      </div>
      <List
        dataSource={data.players}
        renderItem={(player) => {
          const playerBuyIn = player.hands * data.amountPerhand;
          const profit = player.rest - playerBuyIn;

          return (
            <List.Item className={styles.buyInPlayer}>
              <div className={styles.info}>
                <div className={styles.playerName}>
                  <UserOutlined className={styles.icon} />
                  {player.name}
                </div>
                <div className={styles.playerDetail}>
                  <div className={styles.playerId}>
                    <span className={styles.label}>ID</span>
                    {player.id.substring(0, 6)}
                  </div>
                  <div className={styles.playerBuyIn}>
                    <MoneyCollectOutlined className={styles.icon} />
                    {playerBuyIn}
                  </div>
                </div>
              </div>
              <div
                className={classNames(styles.profit, {
                  [styles.win]: profit > 0,
                  [styles.loss]: profit < 0,
                })}
              >
                {profit > 0 ? `+${profit}` : profit}
              </div>
            </List.Item>
          );
        }}
      />
    </div>
  );
};

export default BuyInResult;
