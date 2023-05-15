import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { createLogger } from '../../common/commonLogger';
import { renderCardText } from '../../components/Card';
import Header from '../../components/Header';
import { useLocalHandRecords } from '../../models/hand';
import styles from './index.module.scss';

const logger = createLogger('pages/HandRecordList');

const HandRecordList = () => {
  const { localRecords } = useLocalHandRecords();

  const navigate = useNavigate();

  useEffect(() => {
    logger.log('localRecords', localRecords);
  }, [localRecords]);

  return (
    <div className={styles.container}>
      <Header title="Hand Record List" back />
      <div className={styles.main}>
        <Button
          type="primary"
          size="large"
          icon={<PlusOutlined />}
          onClick={() => navigate('/hand/create')}
        >
          New Record
        </Button>
        <div className={styles.records}>
          {localRecords.map((record) => {
            return (
              <div
                key={record.id}
                className={styles.record}
                onClick={() => navigate(`/hand/${record.id}`)}
              >
                <h3 className={styles.title}>Hand Record: {record.id.substring(0, 6)}</h3>
                <div className={styles.time}>{new Date(record.createTime).toLocaleString()}</div>
                {renderCardText(record.boardCards, styles.cards)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HandRecordList;
