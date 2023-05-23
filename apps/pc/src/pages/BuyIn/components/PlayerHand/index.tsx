import React, { FC, ChangeEvent, useState } from 'react';
import { Button, Input, message } from 'antd';
import {
  DeleteOutlined,
  UserOutlined,
  RedEnvelopeOutlined,
  PlusOutlined,
  MinusOutlined,
} from '@ant-design/icons';
import { useDebounceFn } from 'ahooks';
import { BuyInPlayer } from '../../../../models/buyIn';
import styles from './index.module.scss';

interface IPlayerHandProps {
  player: BuyInPlayer;
  isValidOperated: boolean;
  onRemove: (id: string) => void;
  onChange: (targetPlayer: BuyInPlayer) => void;
}

const PlayerHand: FC<IPlayerHandProps> = ({
  player,
  isValidOperated,
  onRemove,
  onChange,
}: IPlayerHandProps) => {
  const { id, name, hands } = player;

  const [upper, setUpper] = useState(0);

  const { run } = useDebounceFn(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange({
        ...player,
        name: e.target.value,
      });
    },
    { wait: 500 },
  );

  return (
    <div className={styles.container}>
      <div className={styles.firstCol}>
        <div className={styles.inputForm}>
          <div>USERNAME</div>
          <Input
            prefix={<UserOutlined />}
            defaultValue={name}
            placeholder="Input your name"
            allowClear
            showCount
            maxLength={30}
            bordered={false}
            onChange={run}
          />
        </div>
        <div className={styles.inputForm}>
          <div>HANDS</div>
          <Input
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
      </div>
      <div className={styles.secondCol}>
        <div className={styles.btnContainer}>
          <Button
            disabled={isValidOperated}
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
            disabled={isValidOperated && upper <= 0}
            icon={<MinusOutlined />}
            className={styles.btnBG}
            onClick={() => {
              if (hands == 1) {
                message.info('买入数量不能为0');
              } else {
                setUpper(upper - 1);
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
                setUpper(upper + 1);
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
