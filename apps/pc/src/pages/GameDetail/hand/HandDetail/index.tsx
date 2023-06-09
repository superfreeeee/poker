import { Alert } from 'antd';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { createLogger } from '../../../../common/commonLogger';
import { renderCardText } from '../../../../components/Card';
import Header from '../../../../components/Header';
import { HandRecord } from '../../../../models/hand';
import HandActions from '../HandActions';
import { useHandDetailService } from '../../../../services/hand';
import styles from './index.module.scss';

const logger = createLogger('pages/HandDetail');

const HandDetail = () => {
  const { gameId = '', handId = '' } = useParams();
  const { handDetail } = useHandDetailService(gameId, handId);
  const record: HandRecord | null = handDetail;

  useEffect(() => {
    logger.log('record', record);
  }, [record]);

  return (
    <div className={styles.container}>
      <Header title="Hand Detail" back=".." />
      {record ? (
        <div className={styles.content}>
          <div className={styles.info}>
            <h3>Hand Id: {record.id}</h3>
            <div>Date: {new Date(record.createTime).toLocaleString()}</div>
            <div className={styles.board}>
              <h3>Board: </h3>
              {renderCardText(record.boardCards, styles.cards)}
            </div>
          </div>
          <div className={styles.actions}>
            <HandActions actions={record.actions} />
          </div>
        </div>
      ) : (
        <div className={styles.content}>
          <Alert
            type="error"
            showIcon
            message={<h4>Hand not exists</h4>}
            description={`Hand Id: ${handId}`}
            style={{ width: '100%' }}
          />
        </div>
      )}
    </div>
  );
};

export default HandDetail;
