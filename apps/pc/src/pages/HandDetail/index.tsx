import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import styles from './index.module.scss';

const HandDetail = () => {
  const { handId } = useParams();
  return (
    <div className={styles.container}>
      <Header title="Hand Detail" back="/hands" />
      <div>handId: {handId}</div>
    </div>
  );
};

export default HandDetail;
