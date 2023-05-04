import { Button } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginCheck } from '../../hooks/useLoginCheck';
import { useCurrentUser } from '../../models/user';
import styles from './index.module.scss';

const Home = () => {
  useLoginCheck();

  const currentUser = useCurrentUser();
  const navigate = useNavigate();

  return (
    <div>
      <div className={styles.header}>
        <h1>Home</h1>
        <Button type="primary" danger className={styles.switchUser} onClick={() => navigate('/login')}>
          Switch User
        </Button>
      </div>
      <div>currentUser: {JSON.stringify(currentUser)}</div>
    </div>
  );
};

export default Home;
