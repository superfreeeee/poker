import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { useLoginCheck } from '../../hooks/useLoginCheck';
import { useCurrentUser } from '../../models/user';
import { CardText } from '../../components/Card';
import { ECardSuit } from '../../common/card';
import CardTable from '../../components/CardTable';
import { useSelectCards } from '../../components/CardTable/useSelectCards';
import styles from './index.module.scss';

const Home = () => {
  useLoginCheck();

  const currentUser = useCurrentUser();
  const navigate = useNavigate();

  const { selectedCards, select } = useSelectCards(3);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Home</h1>
        <Button
          type="primary"
          danger
          className={styles.switchUser}
          onClick={() => navigate('/login')}
        >
          Switch User
        </Button>
      </div>
      <div className={styles.content}>
        <h3>currentUser:</h3>
        <div>id: {currentUser?.id}</div>
        <div>name: {currentUser?.name}</div>
        <div style={{ marginTop: 12 }}>
          <h3>Tabs</h3>
          {/* <Button size="large" onClick={() => navigate(getPath(ERouteName.BuyIn))}> */}
          <Button size="large" onClick={() => navigate('/buyin/prepare')}>
            Buy in
          </Button>
        </div>
        <div>
          <h2>Home test</h2>
          <CardText suit={ECardSuit.Spade} num={'A'} />
          <CardText suit={ECardSuit.Heart} num={'Q'} />
          <CardText suit={ECardSuit.Diamond} num={'T'} />
          <CardText suit={ECardSuit.Club} num={'3'} />
          <CardTable selectedCards={selectedCards} onClick={select} />
        </div>
      </div>
    </div>
  );
};

export default Home;
