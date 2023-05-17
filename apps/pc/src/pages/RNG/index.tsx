import { Button } from 'antd';
import React, { useRef } from 'react';
import Header from '../../components/Header';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import styles from './index.module.scss';
import { useRng } from './useRng';

/**
 * RandomNumberGenerator
 * @returns
 */
const RNG = () => {
  useDocumentTitle('RNG by @youxian/poker');

  const contentRef = useRef<HTMLSpanElement>(null);

  const { num, rolling } = useRng((num) => {
    if (contentRef.current) {
      contentRef.current.textContent = `${num}`;
    }
  });

  return (
    <div className={styles.container}>
      <Header title="RNG" back />
      <Button className={styles.btn} onClick={rolling}>
        <span ref={contentRef}>{useRef(num).current}</span>
      </Button>
    </div>
  );
};

export default RNG;
