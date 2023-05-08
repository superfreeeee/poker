import React, { FC, ChangeEvent } from 'react';
import { Input } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { IPlayer } from '../../../../models/buyIn';
import PlayerHandView from '../PlayerHandView';
import styles from './index.module.scss';

interface IPlayerResultProps {
  player: IPlayer;
  amoutPerHand: number;
  changeRest: (id: string, rest: number) => void;
}

const PlayResult: FC<IPlayerResultProps> = (props) => {
  const { id, hands, rest } = props.player;
  const benefit = rest - hands * props.amoutPerHand;
  return (
    <>
      <PlayerHandView player={props.player}></PlayerHandView>
      <div className={styles.restContainer}>
        <div className={styles.leftWarp}>
          <Input
            className={styles.inputDecorate}
            defaultValue={rest}
            type="number"
            prefix={<EyeOutlined />}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const num = Number(e.target.value);
              props.changeRest(id, num);
            }}
          />
        </div>
        <div className={styles.rightWrap}>盈利：{benefit}</div>
      </div>
    </>
  );
};

export default PlayResult;
