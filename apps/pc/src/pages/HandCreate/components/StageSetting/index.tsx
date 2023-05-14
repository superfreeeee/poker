import React, { FC, useEffect, useState } from 'react';
import { Button } from 'antd';
import { renderCardText } from '../../../../components/Card';
import { CardSelectorModal } from '../../../../components/CardSelectorModal';
import { Card } from '../../../../models/card';
import { HandBlindRecord, HandStage, PostFlopHandStage } from '../../../../models/hand';
import { PlayerSeat } from '../../../../models/player';
import { getNextStage } from '../../hooks/useHandStage';
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
    }
  | {
      stage: HandStage.PreFlop | HandStage.Showdown;
      potSize: number;
      cards?: Card[];
    }
  | {
      stage: HandStage.Flop | HandStage.Turn | HandStage.River;
      potSize: number;
      cards: Card[];
    };

export interface IStageSettingProps {
  currentStage: HandStage;
  estimatePotSize: number;
  stageClear: boolean;
  onNextStage: (params: INextStageParams) => void;
}

/**
 * Stage Setting entry
 * @param param0
 * @returns
 */
const StageSetting = ({
  currentStage,
  estimatePotSize,
  stageClear,
  onNextStage,
}: IStageSettingProps) => {
  if (currentStage === HandStage.Init) {
    return <InitSetting onConfirm={(players) => onNextStage({ stage: currentStage, players })} />;
  }

  if (currentStage === HandStage.Blinds) {
    return <BlindsSetting onConfirm={(blinds) => onNextStage({ stage: currentStage, blinds })} />;
  }

  if (currentStage === HandStage.River) {
    return (
      <PotSizeSetting
        estimatePotSize={estimatePotSize}
        stageClear={stageClear}
        onConfirm={(potSize) => onNextStage({ stage: HandStage.Showdown, potSize })}
      />
    );
  }

  if (
    currentStage === HandStage.PreFlop ||
    currentStage === HandStage.Flop ||
    currentStage === HandStage.Turn
  ) {
    return (
      <PostFlopSetting
        key={currentStage}
        currentStage={currentStage}
        estimatePotSize={estimatePotSize}
        stageClear={stageClear}
        onConfirm={(nexStage, cards, potSize) => onNextStage({ stage: nexStage, cards, potSize })}
      />
    );
  }

  return <h4>No Setting for {currentStage} stage</h4>;
};

interface IInitSettingProps {
  onConfirm: (players: number) => void;
}

/**
 * HandStage.Init setting
 * @param param0
 * @returns
 */
const InitSetting: FC<IInitSettingProps> = ({ onConfirm }) => {
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

interface IBlindsSettingProps {
  onConfirm: (blinds: HandBlindRecord[]) => void;
}

/**
 * HandStage.Blinds setting
 * @param param0
 * @returns
 */
const BlindsSetting: FC<IBlindsSettingProps> = ({ onConfirm }) => {
  return <Button onClick={() => onConfirm(initBlinds)}>Next</Button>;
};

interface IPotSizeSettingProps {
  estimatePotSize: number;
  stageClear: boolean;
  disabledConfirm?: boolean;
  onConfirm: (potSize: number) => void;
}

/**
 * HandStage.PreFlop | HandStage.Showdown setting
 * @param param0
 * @returns
 */
const PotSizeSetting: FC<IPotSizeSettingProps> = ({
  estimatePotSize,
  stageClear,
  disabledConfirm = false,
  onConfirm,
}) => {
  const [potSize, setPotSize] = useState(estimatePotSize);

  useEffect(() => {
    setPotSize(estimatePotSize);
  }, [estimatePotSize]);

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
};

/**
 * PostFlop := HandStage.PreFlop | HandStage.Flop | HandStage.Turn | HandStage.River setting
 * @param param0
 * @returns
 */
const PostFlopSetting: FC<{
  currentStage: HandStage.PreFlop | HandStage.Flop | HandStage.Turn | HandStage.River;
  estimatePotSize: number;
  stageClear: boolean;
  onConfirm: (nextStage: PostFlopHandStage, dealCards: Card[], potSize: number) => void;
}> = ({ currentStage, estimatePotSize, stageClear, onConfirm }) => {
  const nextStage = getNextStage(currentStage) as PostFlopHandStage;
  const count = nextStage === HandStage.Flop ? 3 : 1;

  const [dealCards, setDealCards] = useState<Card[]>([]);

  const selectDealCards = () => {
    CardSelectorModal.open({
      count,
      selectedCards: dealCards,
      onSelect: setDealCards,
    });
  };

  return (
    <>
      <div className={styles.cardsSelector}>
        <Button type="primary" onClick={selectDealCards}>
          Select {nextStage}
        </Button>
        {renderCardText(dealCards, styles.cards)}
      </div>
      <PotSizeSetting
        estimatePotSize={estimatePotSize}
        stageClear={stageClear}
        disabledConfirm={dealCards.length !== count}
        onConfirm={(potSize) => {
          onConfirm(nextStage, dealCards, potSize);
        }}
      />
    </>
  );
};

export default StageSetting;
