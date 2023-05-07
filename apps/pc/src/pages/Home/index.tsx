import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { useLoginCheck } from '../../hooks/useLoginCheck';
import { useCurrentUser } from '../../models/user';
import { ERouteName } from '../../routes/constants';
import { getPath } from '../../routes/utils';
import styles from './index.module.scss';

const Home = () => {
  useLoginCheck();

  const currentUser = useCurrentUser();
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Home</h1>
        <Button
          type="primary"
          danger
          className={styles.switchUser}
          onClick={() => navigate(getPath(ERouteName.Login))}
        >
          Switch User
        </Button>
      </div>
      <div className={styles.content}>
        <h3>currentUser:</h3>
        <div>id: {currentUser?.id}</div>
        <div>name: {currentUser?.name}</div>
        <div style={{ marginTop: 12 }}>
          <h3>Tabs</h3>
          <Button size="large" onClick={() => navigate(getPath(ERouteName.BuyIn))}>
            Buy in
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
