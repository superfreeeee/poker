import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Divider } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useLoginCheck } from '../../hooks/useLoginCheck';
import GameList from './GameList';
import UserProfile from './UserProfile';
import styles from './index.module.scss';

interface IPageLinkProps {
  title: string;
  path: string;
}

const PageLink: FC<IPageLinkProps> = ({ title, path }) => {
  const navigate = useNavigate();

  return (
    <Button size="large" onClick={() => navigate(path)}>
      {title}
      <ArrowRightOutlined />
    </Button>
  );
};

const Home = () => {
  useLoginCheck();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Home</h1>
        <UserProfile />
      </div>
      <div className={styles.content}>
        <h3>Game List</h3>
        <GameList />
        <Divider />
        <h3>Dev Navigation</h3>
        <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
          <h3>Pages:</h3>
          <PageLink title="BuyIn" path="/buyin/create" />
          <PageLink title="RNG" path="/rng" />
        </div>
      </div>
    </div>
  );
};

export default Home;
