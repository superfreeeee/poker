import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import './others';

const App = () => {
  const [state] = useState();

  useEffect(() => {
    console.log('state', state);
  }, []);

  return (
    <div className={styles.container}>
      <h1>Poker PC</h1>
    </div>
  );
};

export default App;
