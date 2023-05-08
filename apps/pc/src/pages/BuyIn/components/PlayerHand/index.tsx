import React, { FC, ChangeEvent } from 'react';
import { Button, Input } from 'antd';
import {
  DeleteOutlined,
  UserOutlined,
  RedEnvelopeOutlined,
  PlusOutlined,
  MinusOutlined,
} from '@ant-design/icons';
import { IPlayer } from '../../../../models/buyIn';
import styles from './index.module.scss';

interface IPlayerHandProps {
  player: IPlayer;
  remove: (id: string) => void;
  changeName: (id: string, name: string) => void;
  changeHand: (id: string, hand: number) => void;
}

const PlayerHand: FC<IPlayerHandProps> = (props) => {
  const { id, name, hands } = props.player;

  return (
    <>
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
                props.changeName(id, e.target.value);
              }}
            />
          </div>
        </div>
        <Button
          shape="circle"
          icon={<DeleteOutlined />}
          className={styles.btnBG}
          onClick={() => {
            props.remove(id);
          }}
        />
      </div>
      <div className={styles.secondLine}>
        <Input
          className={styles.inputDecorate}
          defaultValue={hands}
          value={hands}
          type="number"
          prefix={<RedEnvelopeOutlined />}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            // if (isNumber(e.target.value)) {
            //   params.changeHand(id, e.target.value);
            // }
            const num = Number(e.target.value);
            props.changeHand(id, num);
          }}
        />
        <div className={styles.buttonWrap}>
          <div
            className={styles.btnSplitLine}
            onClick={() => {
              props.changeHand(id, hands - 1);
            }}
          >
            <MinusOutlined />
          </div>
          <div
            onClick={() => {
              props.changeHand(id, hands + 1);
            }}
          >
            <PlusOutlined />
          </div>
        </div>
      </div>
    </>
  );
};
export default PlayerHand;
