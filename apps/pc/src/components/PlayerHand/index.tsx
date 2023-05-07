import React from 'react';
import { ChangeEvent } from 'react';
import { IPlayer } from '../../models/buyIn';
import { Button, Input, Radio } from 'antd';
import {
  DeleteOutlined,
  UserOutlined,
  RedEnvelopeOutlined,
  PlusOutlined,
  MinusOutlined,
} from '@ant-design/icons';
import { useInput } from '../../hooks/useInput';
import styles from './index.module.scss';
import { isNumber } from '../../utils/type';

interface IPlayerHand {
  player: IPlayer;
  remove: (id: string) => void;
  changeName: (id: string, name: string) => void;
  changeHand: (id: string, hand: number) => void;
}

const PlayerHand = (params: IPlayerHand) => {
  const { id, name, hands } = params.player;
  // const [inputName, setInputName] = useInput(name);

  return (
    <div className={styles.container}>
      <div className={styles.firstLine}>
        <div className={styles.leftWrap}>
          <Button shape="circle" icon={<UserOutlined />} className={styles.btnBG} />
          <div className={styles.inputUnderLine}>
            <Input
              placeholder="Input your name"
              allowClear
              showCount
              maxLength={30}
              style={{ width: 180 }}
              defaultValue={name}
              bordered={false}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                params.changeName(id, e.target.value);
              }}
            />
          </div>
        </div>
        <Button
          shape="circle"
          icon={<DeleteOutlined />}
          className={styles.btnBG}
          onClick={() => {
            params.remove(id);
          }}
        />
      </div>
      <div className={styles.secondLine}>
        <Input
          className={styles.inputDecorate}
          defaultValue={hands}
          type="number"
          prefix={<RedEnvelopeOutlined />}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            // if (isNumber(e.target.value)) {
            //   params.changeHand(id, e.target.value);
            // }
            const num = Number(e.target.value);
            params.changeHand(id,num);
          }}
        />
        <div className={styles.buttonWrap}>
          <div
            className={styles.btnSplitLine}
            onClick={() => {
              params.changeHand(id, hands-1);
            }}
          >
            <MinusOutlined />
          </div>
          <div
            onClick={() => {
              params.changeHand(id, hands+1)
            }}
          >
            <PlusOutlined />
          </div>
        </div>
      </div>
    </div>
  );
};
export default PlayerHand;
