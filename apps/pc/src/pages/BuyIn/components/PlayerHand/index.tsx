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
import useDebounce from '../../../../hooks/useDebounce';
import styles from './index.module.scss';

interface IPlayerHandProps {
  player: IPlayer;
  onRemove: (id: string) => void;
  onChange: (targetPlayer: IPlayer) => void;
}

const PlayerHand: FC<IPlayerHandProps> = ({ player, onRemove, onChange }: IPlayerHandProps) => {
  const { id, hands } = player;

  const handleNameChange = useDebounce((e: ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...player,
      name: e.target.value,
    });
  }, 500);

  const handleHandChange = useDebounce((e: ChangeEvent<HTMLInputElement>) => {
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
  }, 500);

  return (
    <div className={styles.container}>
      <div className={styles.firstCol}>
        <div className={styles.inputForm}>
          <div>USERNAME</div>
          <Input
            prefix={<UserOutlined />}
            placeholder="Input your name"
            allowClear
            showCount
            maxLength={30}
            bordered={false}
            onChange={handleNameChange}
          />
        </div>
        <div className={styles.inputForm}>
          <div>HANDS</div>
          <Input
            defaultValue={0}
            prefix={<RedEnvelopeOutlined />}
            bordered={false}
            onChange={handleHandChange}
          />
        </div>
      </div>
      <div className={styles.secondCol}>
        <div className={styles.btnContainer}>
          <Button
            shape="circle"
            size="large"
            icon={<DeleteOutlined />}
            className={styles.btnBG}
            onClick={() => {
              onRemove(id);
            }}
          />
        </div>
        <div className={styles.numberBtnWrap}>
          <Button
            icon={<MinusOutlined />}
            className={styles.btnBG}
            onClick={() => {
              if (hands == 1) {
                message.info('买入数量不能为0');
              } else {
                onChange({ ...player, hands: hands - 1 });
              }
            }}
          ></Button>
          <Button
            icon={<PlusOutlined />}
            className={styles.btnBG}
            onClick={() => {
              if (hands == 50) {
                message.info('买入数量不能超过50');
              } else {
                onChange({ ...player, hands: hands + 1 });
              }
            }}
          ></Button>
        </div>
      </div>
    </div>
  );
};
export default PlayerHand;
