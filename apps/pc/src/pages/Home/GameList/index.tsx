import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, message } from 'antd';
import { useAddGameService, useGameListService } from '../../../services/game';
import { useCurrentUser } from '../../../models/user';
import { useLoginCheck } from '../../../hooks/useLoginCheck';
import { createLogger } from '../../../common/commonLogger';
import styles from './index.module.scss';

const gameListLogger = createLogger('pages/GameList');

const GameList = () => {
  useLoginCheck();

  const navigate = useNavigate();

  const currentUser = useCurrentUser();

  const { gameList, updateGameList } = useGameListService();
  const addGameService = useAddGameService();

  useEffect(() => {
    gameListLogger.log('gameList', gameList);
  }, [gameList]);

  const viewGameDetail = (gameId: string) => {
    if (gameId) {
      navigate(`/game/${gameId}`);
    }
  };

  return (
    <div className={styles.container}>
      {/* // TODO remove mock entry */}
      <Button
        onClick={() => {
          addGameService({
            location: '万科望尚庭',
            date: Date.now(),
            comment: `userId: ${currentUser?.id} at ${new Date().toLocaleString()}`,
          }).then((success) => {
            if (success) {
              updateGameList();
            } else {
              message.error('Add game fail');
            }
          });
        }}
      >
        Fast Add New Game
      </Button>
      {gameList.map((record) => {
        return (
          <div key={record.id} className={styles.record} onClick={() => viewGameDetail(record.id)}>
            <h4>Game Record: id={record.id}</h4>
            <h4>{new Date(record.date).toLocaleString()}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default GameList;
