import { Alert, Button, Divider } from 'antd';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PlusSquareOutlined } from '@ant-design/icons';
import { createLogger } from '../../common/commonLogger';
import { useGameDetailService } from '../../services/game';
import { useLoginCheck } from '../../hooks/useLoginCheck';
import Header from '../../components/Header';
import BuyInResult from './buyin/BuyInResult';
import HandList from './hand/HandList';
import styles from './index.module.scss';

const logger = createLogger('pages/GameDetail');

const GameDetail = () => {
  const { gameId = '' } = useParams();

  const navigate = useNavigate();

  const { loading, gameDetail, reloadGameDetail } = useGameDetailService(gameId);

  useLoginCheck();
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
            <h4>Game Record: id={gameDetail.id}</h4>
            <h4>{new Date(gameDetail.date).toLocaleString()}</h4>
            {/* <div style={{ wordBreak: 'break-all' }}>{JSON.stringify(gameDetail)}</div> */}
          </div>

          <Divider style={{ margin: '10px 0' }} />
          {/* BuyIn data */}
          {gameDetail.buyInData ? (
            <BuyInResult data={gameDetail.buyInData} />
          ) : (
            <Button type="primary" icon={<PlusSquareOutlined />} onClick={goCreateBuyInPage}>
              Append buy-in record
            </Button>
          )}

          <Divider style={{ margin: '0 0 10px' }} />
          {/* Hand records */}
          <HandList data={gameDetail.handRecords} reloadGameDetail={reloadGameDetail} />
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
