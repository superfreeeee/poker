import React, { FC, ChangeEvent } from 'react';
import { Button, Input, message } from 'antd';
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
    <div className={styles.container}>
      <div className={styles.firstLine}>
        <div className={styles.inputForm}>
          <div>USERNAME</div>
          <Input
            prefix={<UserOutlined />}
            placeholder="Input your name"
            allowClear
            showCount
            maxLength={30}
            bordered={false}
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              onChange({
                ...player,
                name: e.target.value,
              });
            }}
          />
        </div>
        <div className={styles.btnContainer}>
          <Button
            shape="circle"
            icon={<DeleteOutlined />}
            className={styles.btnBG}
            onClick={() => {
              onRemove(id);
            }}
          />
        </div>
      </div>
      <div className={styles.secondLine}>
        <div className={styles.inputForm}>
          <div>HANDS</div>
          <Input
            defaultValue={0}
            value={hands}
            prefix={<RedEnvelopeOutlined />}
            bordered={false}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              let number = +e.target.value;
              if (isNaN(number)) {
                message.error('买入数量必须为正整数');
                return;
              }
              if (number > 50) {
                number = 50;
                message.info('买入数量不能超过50');
              }
              onChange({ ...player, hands: number });
            }}
          />
        </div>

        <div className={styles.numberBtnWrap}>
          <div
            className={styles.btnSplitLine}
            onClick={() => {
              if (hands == 1) {
                message.info('买入数量不能为0');
              } else {
                onChange({ ...player, hands: hands - 1 });
              }
            }}
          >
            <MinusOutlined />
          </div>
          <div
            onClick={() => {
              if (hands == 50) {
                message.info('买入数量不能超过50');
              } else {
                onChange({ ...player, hands: hands + 1 });
              }
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
