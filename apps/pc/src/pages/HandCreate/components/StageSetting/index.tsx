import { Button } from 'antd';
import React, { FC, forwardRef, RefObject, useImperativeHandle, useRef, useState } from 'react';
import { renderCardText } from '../../../../components/Card';
import { CardSelectorModal } from '../../../../components/CardSelectorModal';
import { Card } from '../../../../models/card';
import { HandBlindRecord, HandStage } from '../../../../models/hand';
import { PlayerSeat } from '../../../../models/player';
import CompactInput from '../CompactInput';
import styles from './index.module.scss';

type INextStageParams =
  | {
      stage: HandStage.Init;
      players: number;
    }
  | {
      stage: HandStage.Blinds;
      blinds: HandBlindRecord[];
      potSize: number;
    }
  | {
      stage: HandStage.PreFlop | HandStage.Showdown;
      potSize: number;
    }
  | {
      stage: HandStage.Flop | HandStage.Turn | HandStage.River;
      potSize: number;
      cards: Card[];
    };

export type IStageSettingRef = IPotSizeSettingRef;

export interface IStageSettingProps {
  stage: HandStage;
  stageClear: boolean;
  onNextStage: (params: INextStageParams) => void;
}

/**
 * Stage Setting entry
 * @param param0
 * @returns
 */
const StageSetting = forwardRef<IStageSettingRef, IStageSettingProps>(
  ({ stage, stageClear, onNextStage }, ref) => {
    const potSizeRef = useRef<IPotSizeSettingRef>(null);

    useImperativeHandle(ref, () => {
      return {
        estimatePotSize: (potSize) => potSizeRef.current?.estimatePotSize(potSize),
      };
    });

    if (stage === HandStage.Init) {
      return <InitSetting onConfirm={(players) => onNextStage({ stage, players })} />;
    }

    if (stage === HandStage.Blinds) {
      return (
        <BlindsSetting
          onConfirm={(blinds) =>
            onNextStage({
              stage,
              blinds,
              potSize: blinds.reduce((sum, { chips }) => sum + chips, 0),
            })
          }
        />
      );
    }

    if (stage === HandStage.PreFlop || stage === HandStage.Showdown) {
      return (
        <PotSizeSetting
          ref={potSizeRef}
          stageClear={stageClear}
          onConfirm={(potSize) => onNextStage({ stage, potSize })}
        />
      );
    }
    if (stage === HandStage.Flop || stage === HandStage.Turn || stage === HandStage.River) {
      return (
        <PostFlopSetting
          stage={stage}
          stageClear={stageClear}
          onConfirm={(cards, potSize) => onNextStage({ stage, cards, potSize })}
          potSizeRef={potSizeRef}
        />
      );
    }

    return <h4>No Setting for {stage} stage</h4>;
  },
);

/**
 * HandStage.Init setting
 * @param param0
 * @returns
 */
const InitSetting: FC<{ onConfirm: (players: number) => void }> = ({ onConfirm }) => {
  const [players, setPlayers] = useState(0);

  return (
    <CompactInput
      placeholder="Input pre-flop players"
      disabledConfirm={players <= 0}
      value={players}
      onValueChange={(input) => setPlayers(+input)}
      onOk={() => onConfirm(players)}
      okText="Next Stage"
    />
  );
};

const initBlinds: HandBlindRecord[] = [
  { seat: PlayerSeat.SB, type: 'SB', chips: 0.5 },
  { seat: PlayerSeat.BB, type: 'BB', chips: 1 },
];

/**
 * HandStage.Blinds setting
 * @param param0
 * @returns
 */
const BlindsSetting: FC<{ onConfirm: (blinds: HandBlindRecord[]) => void }> = ({ onConfirm }) => {
  return <Button onClick={() => onConfirm(initBlinds)}>Next</Button>;
};

interface IPotSizeSettingRef {
  estimatePotSize: (potSize: number) => void;
}

interface IPotSizeSettingProps {
  stageClear: boolean;
  disabledConfirm?: boolean;
  onConfirm: (potSize: number) => void;
}

/**
 * HandStage.PreFlop | HandStage.Showdown setting
 * @param param0
 * @returns
 */
const PotSizeSetting = forwardRef<IPotSizeSettingRef, IPotSizeSettingProps>(
  ({ stageClear, disabledConfirm = false, onConfirm }, ref) => {
    const [potSize, setPotSize] = useState(0);

    useImperativeHandle(ref, () => {
      return {
        estimatePotSize: (potSize) => setPotSize(potSize),
      };
    });

    return (
      <CompactInput
        placeholder="Pot size"
        disabledConfirm={disabledConfirm || !stageClear || potSize <= 0}
        value={potSize}
        onValueChange={(input) => setPotSize(+input)}
        onOk={() => onConfirm(potSize)}
        okText="Next Stage"
      />
    );
  },
);

/**
 * PostFlop := HandStage.Flop | HandStage.Turn | HandStage.River setting
 * @param param0
 * @returns
 */
const PostFlopSetting: FC<{
  stage: HandStage.Flop | HandStage.Turn | HandStage.River;
  stageClear: boolean;
  onConfirm: (dealCards: Card[], potSize: number) => void;
  potSizeRef: RefObject<IPotSizeSettingRef>;
}> = ({ stage, stageClear, onConfirm, potSizeRef }) => {
  const [dealCards, setDealCards] = useState<Card[]>([]);

  const selectDealCards = () => {
    CardSelectorModal.open({
      count: stage === HandStage.Flop ? 3 : 1,
      selectedCards: dealCards,
      onSelect: setDealCards,
    });
  };

  return (
    <>
      <div className={styles.cardsSelector}>
        <Button type="primary" onClick={selectDealCards}>
          Select {stage}
        </Button>
        {renderCardText(dealCards, styles.cards)}
      </div>
      <PotSizeSetting
        ref={potSizeRef}
        stageClear={stageClear}
        disabledConfirm={dealCards.length !== (stage === HandStage.Flop ? 3 : 1)}
        onConfirm={(potSize) => onConfirm(dealCards, potSize)}
      />
    </>
  );
};

export default StageSetting;
