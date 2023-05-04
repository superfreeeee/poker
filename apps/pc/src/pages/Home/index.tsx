import React from 'react';
import { useLoginCheck } from '../../hooks/useLoginCheck';
import { useCurrentUserAtom } from '../../models/user';
import styles from './index.module.scss';

const Home = () => {
  useLoginCheck();

  const [currentUser, setCurrentUser] = useCurrentUserAtom();

  return (
    <div>
      <div className={styles.header}>
        <h1>Home</h1>
        <button className={styles.switchUser} onClick={() => setCurrentUser()}>
          Switch User
        </button>
      </div>
      <div>currentUser: {JSON.stringify(currentUser)}</div>
    </div>
  );
};

export default Home;
