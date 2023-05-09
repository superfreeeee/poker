import React, { FC, ChangeEvent } from 'react';
import { Input } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { IPlayer } from '../../../../models/buyIn';
import PlayerHandView from '../PlayerHandView';
import styles from './index.module.scss';

interface IPlayerResultProps {
  player: IPlayer;
  amoutPerHand: number;
  changeRest: (player: IPlayer) => void;
}

const PlayResult: FC<IPlayerResultProps> = ({
  player,
  amoutPerHand,
  changeRest,
}: IPlayerResultProps) => {
  const { hands, rest } = player;
  const benefit = rest - hands * amoutPerHand;
  return (
    <>
      <PlayerHandView player={player}></PlayerHandView>
      <div className={styles.restContainer}>
        <div className={styles.leftWarp}>
          <Input
            className={styles.inputDecorate}
            defaultValue={rest}
            type="number"
            prefix={<EyeOutlined />}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              changeRest({
                ...player,
                rest: Number(e.target.value),
              });
            }}
          />
        </div>
        <div className={styles.rightWrap}>盈利：{benefit}</div>
      </div>
    </>
  );
};

export default PlayResult;
