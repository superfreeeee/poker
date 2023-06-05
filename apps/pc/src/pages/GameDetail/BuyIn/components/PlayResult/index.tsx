import React, { FC, ChangeEvent } from 'react';
import { Input, message } from 'antd';
import { RedEnvelopeOutlined, UserOutlined } from '@ant-design/icons';
import { BuyInPlayer } from '../../../../../models/buyIn';
import FormulaWithLabel from '../FormulaWithLabel';
import playerContentStyles from '../PlayerHand/index.module.scss';

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

      {isEditable ? (
        <FormulaWithLabel
          x={{
            label: 'Rest',
            value: <Input bordered={false} value={rest} onChange={onRestChange} />,
          }}
          sign="-"
          y={{ label: 'Total buy-in', value: amountPerhand * hands }}
          z={{ label: 'Profit', value: benefit }}
        />
      ) : (
        <FormulaWithLabel
          x={{ label: 'Rest', value: rest }}
          sign="-"
          y={{ label: 'Total buy-in', value: amountPerhand * hands }}
          z={{ label: 'Profit', value: benefit }}
        />
      )}
    </div>
  );
};

export default PlayResult;
