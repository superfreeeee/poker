import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Tabs, TabsProps } from 'antd';
import { useLoginCheck } from '../../hooks/useLoginCheck';
import GameList from './GameList';
import UserProfile from './UserProfile';
import styles from './index.module.scss';
import Toolkits from './Toolkits';

enum HomeTab {
  GameList = 'GameList',
  Statistics = 'Statistics',
  Toolkits = 'Toolkits',
  Setting = 'Setting',
}

const Home = () => {
  useLoginCheck();

  const tabItems: TabsProps['items'] = [
    { key: HomeTab.GameList, label: HomeTab.GameList, children: <GameList /> },
    { key: HomeTab.Statistics, label: HomeTab.Statistics, children: <div>Statistics page</div> },
    { key: HomeTab.Toolkits, label: HomeTab.Toolkits, children: <Toolkits /> },
    { key: HomeTab.Setting, label: HomeTab.Setting, children: <div>Setting page</div> },
  ];

  const [searchParams, setSearchParams] = useSearchParams();

  const onTabChange = (activeKey: HomeTab) => {
    searchParams.set('tab', activeKey);
    setSearchParams(searchParams);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Home</h1>
        <UserProfile />
      </div>
      <div className={styles.content}>
        <Tabs
          activeKey={searchParams.get('tab') ?? HomeTab.GameList}
          items={tabItems}
          onChange={onTabChange}
          style={{ height: '100%' }}
        />
      </div>
    </div>
  );
};

export default Home;
