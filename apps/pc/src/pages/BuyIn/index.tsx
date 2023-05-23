import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { BuyInData } from '../../models/buyIn';
import styles from './index.module.scss';

interface IBuyInProps {
  data?: BuyInData;
}

const BuyIn: FC<IBuyInProps> = () => {
  return (
    <div className={styles.container}>
      <Outlet />
    </div>
  );
};

export default BuyIn;
