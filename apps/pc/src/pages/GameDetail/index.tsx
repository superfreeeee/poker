import { Alert } from 'antd';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { createLogger } from '../../common/commonLogger';
// import { renderCardText } from '../../components/Card';
// import HandActions from '../../components/HandActions';
import Header from '../../components/Header';
import { mockGameDetail } from '../../models/game/data';
import styles from './index.module.scss';

const logger = createLogger('pages/GameDetail');

const GameDetail = () => {
  const { gameId = '' } = useParams();
  const record = gameId ? mockGameDetail : null;

  useEffect(() => {
    logger.log('record', record);
  }, [record]);

  return (
    <div className={styles.container}>
      <Header title="Game Detail" back />
      {record ? (
        <div className={styles.content}>
          {JSON.stringify(record)}
          {/* <div className={styles.info}>
            <h3>Hand Id: {record.id}</h3>
            <div>Date: {new Date(record.createTime).toLocaleString()}</div>
            <div className={styles.board}>
              <h3>Board: </h3>
              {renderCardText(record.boardCards, styles.cards)}
            </div>
          </div>
          <div className={styles.actions}>
            <HandActions actions={record.actions} />
          </div> */}
        </div>
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
