import React, { FC, ChangeEvent } from 'react';
import { Input, message } from 'antd';
import { RedEnvelopeOutlined, UserOutlined } from '@ant-design/icons';
import { isUndefined } from 'lodash-es';
import classNames from 'classnames';
import { useDebounceFn } from 'ahooks';
import { BuyInPlayer } from '../../../../models/buyIn';
import playerContentStyles from '../PlayerHand/index.module.scss';
import styles from "./index.module.scss";

interface IPlayerResultProps {
  player: BuyInPlayer;
  amountPerhand: number;
  onChange?: (player: BuyInPlayer) => void;
  isEditable: boolean;
}

const PlayResult: FC<IPlayerResultProps> = ({
  player,
  amountPerhand,
  onChange,
  isEditable,
}: IPlayerResultProps) => {
  const { hands, rest } = player;
  const benefit = rest - hands * amountPerhand;
  const { run: onRestChange } = useDebounceFn(
    (e: ChangeEvent<HTMLInputElement>) => {
      const number = +e.target.value;
      if (isNaN(number)) {
        message.error('剩余金额必须为正');
        return;
      }
      if (!isUndefined(onChange)) {
        onChange({ ...player, rest: number });
      }
    },
    { wait: 500 },
  );
  return (
    <div className={playerContentStyles.container}>
      <div className={playerContentStyles.visibleLine}>
        <UserOutlined className={playerContentStyles.btnMargin} />
        <div className={playerContentStyles.title}>USERNAME</div>
        <div className={playerContentStyles.content}>{player.name}</div>
      </div>
      <div className={playerContentStyles.visibleLine}>
        <RedEnvelopeOutlined className={playerContentStyles.btnMargin} />
        <div className={playerContentStyles.title}>HANDS</div>
        <div className={playerContentStyles.content}>{player.hands}</div>
      </div>
      <div className={playerContentStyles.textContiner}>
        <div>
          <div className={playerContentStyles.title}>Amount</div>
          <div className={playerContentStyles.calcText}>{player.hands * amountPerhand}</div>
        </div>
        <div>
          <div className={playerContentStyles.title}>=</div>
          <div className={playerContentStyles.otherText}>=</div>
        </div>
        <div>
          <div className={playerContentStyles.title}>HANDS</div>
          <div className={playerContentStyles.calcText}>{hands}</div>
        </div>
        <div>
          <div className={playerContentStyles.title}>*</div>
          <div className={playerContentStyles.otherText}>*</div>
        </div>
        <div>
          <div className={playerContentStyles.title}>一手金额</div>
          <div className={playerContentStyles.calcText}>{amountPerhand}</div>
        </div>
      </div>

      <div className={playerContentStyles.textContiner}>
        {isEditable ? (
          <div className={classNames(playerContentStyles.inputForm,styles.input)}>
            <div className={playerContentStyles.title}>REST</div>
            <Input bordered={false} defaultValue={rest} onChange={onRestChange} />
          </div>
        ) : (
          <div>
            <div className={playerContentStyles.title}>REST</div>
            <div className={playerContentStyles.calcText}>{player.rest}</div>
          </div>
        )}
        <div>
          <div className={playerContentStyles.title}>-</div>
          <div className={playerContentStyles.otherText}>-</div>
        </div>
        <div>
          <div className={playerContentStyles.title}>Amount</div>
          <div className={playerContentStyles.calcText}>{amountPerhand * hands}</div>
        </div>
        <div>
          <div className={playerContentStyles.title}>=</div>
          <div className={playerContentStyles.otherText}>=</div>
        </div>
        <div>
          <div className={playerContentStyles.title}>Profit and Loss</div>
          <div className={playerContentStyles.calcText}>{benefit}</div>
        </div>
      </div>
    </div>
  );
};

export default PlayResult;
