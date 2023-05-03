import React, { useCallback, useEffect, useState } from 'react';
import styles from './index.module.scss';
import './others';

const App = () => {
  const [state] = useState();

  useEffect(() => {
    console.log('state', state);
  }, []);

  const name = 'suprefree';
  let fullName = `__${name}`;

  if (name) {
    fullName = `${name}__`;
  }

  const greeting = useCallback(() => {
    console.log(`fullName = ${fullName}`);
  }, [fullName]);

  return (
    <div className={styles.container}>
      <h1>Poker PC</h1>
    </div>
  );
};

export default App;
