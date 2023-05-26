import React, { FC, ChangeEvent, useState } from 'react';
import { Button, Input, message } from 'antd';
import {
  DeleteOutlined,
  UserOutlined,
  RedEnvelopeOutlined,
  PlusOutlined,
  MinusOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';
import classNames from 'classnames';
import { isUndefined } from 'lodash-es';
import { BuyInPlayer } from '../../../../models/buyIn';
import { INIT_BUYIN_HANDS, MAX_BUYIN_HANDS } from '../../constants';
import styles from './index.module.scss';

interface IPlayerHandProps {
  isEditable: boolean;
  amountPerhand: number;
  player: BuyInPlayer;
  initHands?: number;
  enableDelete?: boolean; // 不可删除
  onRemove?: (id: string) => void;
  onChange?: (targetPlayer: BuyInPlayer) => void;
}

const PlayerHand: FC<IPlayerHandProps> = ({
  isEditable,
  amountPerhand,
  player,
  initHands = INIT_BUYIN_HANDS,
  enableDelete = true,
  onRemove,
  onChange,
}: IPlayerHandProps) => {
  const { id, name, hands } = player;

  const [increaseHands, setIncreaseHands] = useState<number>(0); // 该次编辑增量

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    isUndefined(onChange)
      ? null
      : onChange({
          ...player,
          name: e.target.value,
        });
  };

  return (
    <div className={styles.container}>
      <div className={styles.firstCol}>
        {isEditable ? (
          <div className={styles.inputForm}>
            <div className={styles.title}>USERNAME</div>
            <Input
              prefix={<UserOutlined className={styles.btnMargin}/>}
              value={name}
              placeholder="Input your name"
              allowClear
              showCount
              maxLength={30}
              bordered={false}
              onChange={onNameChange}
            />
          </div>
        ) : (
          <div className={styles.visibleLine}>
            <UserOutlined className={styles.btnMargin} />
            <div className={styles.title}>USERNAME</div>
            <div className={styles.content}>{player.name}</div>
          </div>
        )}

        <div className={styles.handList}>
          {isEditable ? (
            <div className={styles.inputForm}>
              <div className={styles.title}>HANDS</div>
              <Input
                value={hands}
                prefix={<RedEnvelopeOutlined className={styles.btnMargin}/>}
                bordered={false}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  let number = +e.target.value;
                  if (isNaN(number)) {
                    message.error('买入数量必须为正整数');
                    return;
                  }
                  if (number > MAX_BUYIN_HANDS) {
                    number = MAX_BUYIN_HANDS;
                    message.info('买入数量不能超过50');
                  }
                  isUndefined(onChange) ? null : onChange({ ...player, hands: number });
                }}
              />
            </div>
          ) : (
            <div className={styles.visibleLine}>
              <RedEnvelopeOutlined className={styles.btnMargin} />
              <div className={styles.title}>HANDS</div>
              <div className={styles.content}>{player.hands}</div>
            </div>
          )}
        </div>
      </div>
      <div className={styles.secondCol}>
        <div className={styles.textContiner}>
          <div>
            <ArrowRightOutlined className={classNames(styles.btnMargin, styles.amountIcon)} />
          </div>
          <div>
            <div className={styles.title}>Amount</div>
            <div className={styles.calcText}>{player.hands * amountPerhand}</div>
          </div>
          <div>
            <div className={styles.title}>=</div>
            <div className={styles.otherText}>=</div>
          </div>
          <div>
            <div className={styles.title}>HANDS</div>
            <div className={styles.calcText}>{hands}</div>
          </div>
          <div>
            <div className={styles.title}>*</div>
            <div className={styles.otherText}>*</div>
          </div>
          <div>
            <div className={styles.title}>一手金额</div>
            <div className={styles.calcText}>{amountPerhand}</div>
          </div>
        </div>
        {isEditable ? (
          <div className={styles.btnList}>
            <div className={styles.numberBtnWrap}>
              <Button
                disabled={hands <= initHands}
                icon={<MinusOutlined />}
                className={styles.btnBG}
                onClick={() => {
                  if (hands == 1) {
                    message.info('买入数量不能为0');
                  } else {
                    setIncreaseHands(increaseHands - 1);
                    isUndefined(onChange) ? null : onChange({ ...player, hands: hands - 1 });
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
                    setIncreaseHands(increaseHands + 1);
                    isUndefined(onChange) ? null : onChange({ ...player, hands: hands + 1 });
                  }
                }}
              ></Button>
            </div>
            <div>
              <Button
                disabled={!enableDelete}
                shape="circle"
                size="large"
                icon={<DeleteOutlined />}
                className={styles.btnBG}
                onClick={() => {
                  if (!isUndefined(onRemove)) {
                    onRemove(id);
                  }
                }}
              />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default PlayerHand;
