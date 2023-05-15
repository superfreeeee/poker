import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { createLogger } from '../../common/commonLogger';
import Header from '../../components/Header';
import { useLocalHandRecord } from '../../models/hand/data';
import styles from './index.module.scss';

const logger = createLogger('pages/HandDetail');

const HandDetail = () => {
  const { handId = '' } = useParams();
  const record = useLocalHandRecord(handId);

  useEffect(() => {
    logger.log('record', record);
  }, [record]);

  return (
    <div className={styles.container}>
      <Header title="Hand Detail" back="/hands" />
      <div>handId: {record?.id}</div>
    </div>
  );
};

export default HandDetail;
