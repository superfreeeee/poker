import React, { FC } from 'react';
import { Button } from 'antd';
import { IS_DEV } from '../../common/env';
import { BASE_URL } from '../../api/core';
import { ELocalStorageKey, getItem, setItem } from '../../common/localStorage';
import styles from './index.module.scss';

const Devtool: FC = () => {
  const reload = () => {
    location.reload();
  };

  const switchServer = () => {
    setItem(ELocalStorageKey.LocalServer, !getItem(ELocalStorageKey.LocalServer));
    reload();
  };

  if (!IS_DEV) {
    return null;
  }

  return (
    <div className={styles.container}>
      <Button type="link" onClick={reload}>
        刷新
      </Button>
      <Button type="link" onClick={switchServer}>
        切换服务端：{new URL(BASE_URL).hostname}
      </Button>
    </div>
  );
};

export default Devtool;
