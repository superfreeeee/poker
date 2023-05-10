import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Button } from 'antd';
import { CardSelectorModal } from '../../../../components/CardSelectorModal';
import { renderCardText } from '../../../../components/Card';
import { Card } from '../../../../models/card';
import { HandStage } from '../../../../models/hand';
import CompactInput from '../CompactInput';
import styles from './index.module.scss';

interface ISetPostFlopProps {
  stage: HandStage.Flop | HandStage.Turn | HandStage.River;
  stageClear: boolean;
  onConfirm?: (dealCards: Card[], potSize: number) => void;
}

export interface ISetPostFlopRef {
  estimatePotSize: (potSize: number) => void;
}

const SetPostFlop =
  // eslint-disable-next-line react/display-name, react/prop-types
  forwardRef<ISetPostFlopRef, ISetPostFlopProps>(({ stage, stageClear, onConfirm }, ref) => {
    const [dealCards, setDealCards] = useState<Card[]>([]);
    const [potSize, setPotSize] = useState(0);

    useImperativeHandle(ref, () => {
      return {
        estimatePotSize: (potSize) => setPotSize(potSize),
      };
    });

    const selectDealCards = () => {
      CardSelectorModal.open({
        count: stage === HandStage.Flop ? 3 : 1,
        selectedCards: dealCards,
        onSelect: setDealCards,
      });
    };

    const validateStageChangeParams = () => {
      switch (stage) {
        case HandStage.Flop:
          return dealCards.length === 3 && potSize > 0;

        case HandStage.Turn:
        case HandStage.River:
          return dealCards.length === 1 && potSize > 0;

        default:
          return false;
      }
    };

    return (
      <>
        <div className={styles.cardsSelector}>
          <Button type="primary" onClick={selectDealCards}>
            Select {stage}
          </Button>
          {renderCardText(dealCards, styles.cards)}
        </div>
        <CompactInput
          placeholder="Pot size"
          disabledConfirm={!stageClear || !validateStageChangeParams()}
          value={potSize}
          onValueChange={(input) => setPotSize(+input)}
          onOk={() => {
            onConfirm?.(dealCards, potSize);
            setDealCards([]);
          }}
        />
      </>
    );
  });

export default SetPostFlop;
