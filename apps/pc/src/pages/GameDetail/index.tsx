import { Alert, Button, Divider } from 'antd';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PlusSquareOutlined } from '@ant-design/icons';
import { createLogger } from '../../common/commonLogger';
import { useGameDetailService } from '../../services/game';
import BuyInView from '../BuyIn/BuyInView';
import Header from '../../components/Header';
import HandList from './HandList';
import styles from './index.module.scss';

const logger = createLogger('pages/GameDetail');

const GameDetail = () => {
  const { gameId = '' } = useParams();

  const navigate = useNavigate();

  const { gameDetail, loading } = useGameDetailService(gameId);

  useEffect(() => {
    logger.log('gameDetail', gameDetail);
  }, [gameDetail]);

  const goCreateBuyInPage = () => {
    navigate('./buyin/create');
  };

  return (
    <div className={styles.container}>
      <Header title="Game Detail" back />
      {gameDetail ? (
        // 1. Game record
        <div className={styles.content}>
          {/* GameInfo */}
          <div>
            <h3>Game Info</h3>
            <div style={{ wordBreak: 'break-all' }}>{JSON.stringify(gameDetail)}</div>
          </div>
          <Divider />
          {/* BuyIn data */}
          {gameDetail.buyInData ? (
            <div>
              {/* // TODO show buyInData Detail */}
              <BuyInView data={gameDetail.buyInData} />
            </div>
          ) : (
            <Button type="primary" icon={<PlusSquareOutlined />} onClick={goCreateBuyInPage}>
              Append buy-in record
            </Button>
          )}
          <Divider />
          {/* Hand records */}
          <HandList />
        </div>
      ) : loading ? (
        // 2. Loading
        <div>Loading Game Record(id={gameId})...</div>
      ) : (
        // 3. Not found / error
        <div className={styles.content}>
          <Alert
            type="error"
            showIcon
            message={<h4>Game not exists</h4>}
            description={`Game Id: ${gameId}`}
            style={{ width: '100%' }}
          />
        </div>
      )}
    </div>
  );
};

export default GameDetail;
