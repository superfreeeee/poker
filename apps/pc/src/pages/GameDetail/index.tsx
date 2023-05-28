import { Alert, Button } from 'antd';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PlusSquareOutlined } from '@ant-design/icons';
import { createLogger } from '../../common/commonLogger';
import { useGameDetailService } from '../../services/game';
import Header from '../../components/Header';
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
    navigate('/buyin/create');
  };

  return (
    <div className={styles.container}>
      <Header title="Game Detail" back />
      {gameDetail ? (
        <div className={styles.content}>
          {gameDetail.buyInData ? (
            <div></div>
          ) : (
            <Button type="primary" icon={<PlusSquareOutlined />} onClick={goCreateBuyInPage}>
              New buy-in record
            </Button>
          )}
          {JSON.stringify(gameDetail)}
        </div>
      ) : loading ? (
        <div>Loading Game Record(id={gameId})...</div>
      ) : (
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
