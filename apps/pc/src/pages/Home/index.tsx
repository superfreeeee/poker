import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { useLoginCheck } from '../../hooks/useLoginCheck';
import { useAddGameService, useGameListService } from '../../services/game';
import { useCurrentUser } from '../../models/user';
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

  const currentUser = useCurrentUser();
  const navigate = useNavigate();

  const addGameService = useAddGameService();
  const { gameList, updateGameList } = useGameListService();

  useEffect(() => {
    console.log('gameList', gameList);
  }, [gameList]);

  const switchUser = () => {
    navigate('/login');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Home</h1>
        <Button type="primary" danger className={styles.switchUser} onClick={switchUser}>
          Switch User
        </Button>
      </div>
      <div className={styles.content}>
        <h3>currentUser</h3>
        <div>id: {currentUser?.id}</div>
        <div>name: {currentUser?.name}</div>
        <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
          <h3>Pages:</h3>
          <PageLink title="HandRecordList" path="/hands" />
          <PageLink title="BuyIn" path="/buyin/create" />
          <PageLink title="RNG" path="/rng" />
        </div>
        <Button
          onClick={() => {
            addGameService({
              location: '万科望尚庭',
              date: Date.now(),
              comment: `userId: ${currentUser?.id}`,
            }).then(() => {
              updateGameList();
            });
          }}
        >
          Add
        </Button>
        {gameList.map((gameDetail) => {
          return (
            <div key={gameDetail.id}>
              <div>Date: {new Date(gameDetail.date).toLocaleString()}</div>
              <div>{JSON.stringify(gameDetail)}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
