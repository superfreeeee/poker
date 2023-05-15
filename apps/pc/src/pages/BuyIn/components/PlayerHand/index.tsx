import React, { FC, ChangeEvent } from 'react';
import { Button, Form, Input } from 'antd';
import {
  DeleteOutlined,
  UserOutlined,
  RedEnvelopeOutlined,
  PlusOutlined,
  MinusOutlined,
} from '@ant-design/icons';
import useForm from 'antd/es/form/hooks/useForm';
import { IPlayer } from '../../../../models/buyIn';
import styles from './index.module.scss';

interface IPlayerHandProps {
  player: IPlayer;
  onRemove: (id: string) => void;
  onChange: (targetPlayer: IPlayer) => void;
}

const PlayerHand: FC<IPlayerHandProps> = ({ player, onRemove, onChange }: IPlayerHandProps) => {
  const { id, name, hands } = player;
  const [playerNameForm] = useForm();

  const validateHandsMax = (_rule: any, value: number) => {
    if (value > 50) {
      return Promise.reject('买入必须在0-50范围内');
    }
    return Promise.resolve();
  };

  return (
    <div className={styles.container}>
      <div className={styles.firstLine}>
        <div className={styles.inputForm}>
          <div>USERNAME</div>
          <Form name="valid" form={playerNameForm}>
            <Form.Item
              name="username"
              validateTrigger="onBlur"
              rules={[
                {
                  required: true,
                  message: '请输入用户名',
                },
              ]}
            >
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
            </Form.Item>
          </Form>
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
          <Form>
            <Form.Item
              name="hands"
              initialValue="hands"
              rules={[
                {
                  required: false,
                  pattern: new RegExp(/^[1-9]\d*$/, 'g'),
                  message: '请输入正整数',
                },
                {
                  validator: validateHandsMax,
                },
              ]}
            >
              <Input
                defaultValue={hands}
                value={hands}
                prefix={<RedEnvelopeOutlined />}
                bordered={false}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  let number = +e.target.value;
                  if (isNaN(number)) return;
                  if (number < 0) number = 0;
                  if (number > 50) number = 50;
                  onChange({ ...player, hands: number });
                }}
              />
            </Form.Item>
          </Form>
        </div>

        <div className={styles.numberBtnWrap}>
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
    </div>
  );
};
export default PlayerHand;
