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
  onRemove: (id: string) => void;
  onChange: (targetPlayer: IPlayer) => void;
}

const PlayerHand: FC<IPlayerHandProps> = ({ player, onRemove, onChange }: IPlayerHandProps) => {
  const { id, name, hands } = player;

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
                onChange({
                  ...player,
                  name: e.target.value,
                });
              }}
            />
          </div>
        </div>
        <Button
          shape="circle"
          icon={<DeleteOutlined />}
          className={styles.btnBG}
          onClick={() => {
            onRemove(id);
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
            onChange({ ...player, hands: Number(e.target.value) });
          }}
        />
        <div className={styles.buttonWrap}>
          <div
            className={styles.btnSplitLine}
            onClick={() => {
              onChange({ ...player, hands: hands - 1 });
            }}
          >
            <MinusOutlined />
          </div>
          <div
            onClick={() => {
              onChange({ ...player, hands: hands + 1 });
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
