import React, { FC, useRef } from 'react';
import { Button, List, Popover } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { IS_DEV } from '../../common/env';
import { BASE_URL } from '../../api/core';
import { ELocalStorageKey, getItem, setItem } from '../../common/localStorage';
import { toggleDebugOption, useDebugOptions } from '../../models/debug';
import styles from './index.module.scss';

const Devtool: FC = () => {
  const debugOptions = useDebugOptions();

  const reload = () => {
    location.reload();
  };

  const switchServer = () => {
    setItem(ELocalStorageKey.LocalServer, !getItem(ELocalStorageKey.LocalServer));
    reload();
  };

  const toggledRef = useRef(false);

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
      <Popover
        trigger={['click', 'hover']}
        content={
          <List
            size="small"
            dataSource={debugOptions}
            renderItem={(option) => {
              return (
                <List.Item
                  className={styles.loggerOption}
                  onClick={() => {
                    toggleDebugOption(option.namespace);
                    toggledRef.current = true;
                  }}
                >
                  {option.show ? <CheckOutlined /> : <div className={styles.unchecked} />}
                  {option.namespace}
                </List.Item>
              );
            }}
          />
        }
        onOpenChange={(visible) => {
          if (!visible && toggledRef.current) {
            reload();
          }
        }}
      >
        <Button type="link" onClick={switchServer}>
          控制台输出
        </Button>
      </Popover>
    </div>
  );
};

export default Devtool;
