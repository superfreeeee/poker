import React, { FC, ChangeEvent, ReactNode } from 'react';
import { Input, message } from 'antd';
import { RedEnvelopeOutlined, UserOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import { BuyInPlayer } from '../../../../models/buyIn';
import playerContentStyles from '../PlayerHand/index.module.scss';
import styles from './index.module.scss';

interface IFormulaItem {
  label: string;
  value: number | ReactNode;
}

interface IFormulaWithLabelProps {
  x: IFormulaItem;
  sign: string;
  y: IFormulaItem;
  z: IFormulaItem;
}

const FormulaWithLabel: FC<IFormulaWithLabelProps> = ({ x, sign, y, z }) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, auto)',
        alignItems: 'center',
      }}
    >
      <span>{x.label}</span>
      <span>{sign}</span>
      <span>{y.label}</span>
      <span>=</span>
      <span>{z.label}</span>

      <span>{x.value}</span>
      <span>{sign}</span>
      <span>{y.value}</span>
      <span>=</span>
      <span>{z.value}</span>
    </div>
  );
};

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

  const onRestChange = (e: ChangeEvent<HTMLInputElement>) => {
    const number = +e.target.value;
    if (isNaN(number)) {
      message.error('剩余金额必须为正');
      return;
    }
    onChange?.({ ...player, rest: number });
  };

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
      <FormulaWithLabel
        x={{ label: 'Hands', value: hands }}
        sign="*"
        y={{ label: 'Amount per hand', value: amountPerhand }}
        z={{ label: 'Total buy-in', value: hands * amountPerhand }}
      />
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
          <div className={classNames(playerContentStyles.inputForm, styles.input)}>
            <div className={playerContentStyles.title}>REST</div>
            <Input bordered={false} value={rest} onChange={onRestChange} />
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
