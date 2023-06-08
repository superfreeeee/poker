import React, { FC, useEffect, useState } from 'react';
import { Button, Input } from 'antd';
import { MinusCircleOutlined } from '@ant-design/icons';
import { renderCardText } from '../../../../../../components/Card';
import { CardSelectorModal } from '../../../../../../components/CardSelectorModal';
import { Card } from '../../../../../../models/card';
import { HandBlindRecord, HandStage, PostFlopHandStage } from '../../../../../../models/hand';
import { PlayerSeat, PlayerState } from '../../../../../../models/player';
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
  playerStates: PlayerState[];
  selectedCards: Card[]; // Cards already selected
  estimatePotSize: number; // estimatePotSize base on playerStates
  stageClear: boolean; // if currentStage cleared
  onNextStage: (params: INextStageParams) => void;
}

/**
 * Stage Setting entry
 * @param param0
 * @returns
 */
const StageSetting = ({
  currentStage,
  playerStates,
  selectedCards,
  estimatePotSize,
  stageClear,
  onNextStage,
}: IStageSettingProps) => {
  if (currentStage === HandStage.Init) {
    return <InitSetting onConfirm={(players) => onNextStage({ stage: currentStage, players })} />;
  }

  if (currentStage === HandStage.Blinds) {
    return (
      <BlindsSetting
        playerStates={playerStates}
        onConfirm={(blinds) => onNextStage({ stage: currentStage, blinds })}
      />
    );
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
        selectedCards={selectedCards}
        estimatePotSize={estimatePotSize}
        stageClear={stageClear}
        onConfirm={(nexStage, cards, potSize) => onNextStage({ stage: nexStage, cards, potSize })}
      />
    );
  }

  if (currentStage === HandStage.Showdown) {
    return null;
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
  { seat: PlayerSeat.SB, chips: 0.5 },
  { seat: PlayerSeat.BB, chips: 1 },
];

interface IBlindsSettingProps {
  playerStates: PlayerState[];
  onConfirm: (blinds: HandBlindRecord[]) => void;
}

/**
 * HandStage.Blinds setting
 * @param param0
 * @returns
 */
const BlindsSetting: FC<IBlindsSettingProps> = ({ playerStates, onConfirm }) => {
  const [blinds, setBlinds] = useState<HandBlindRecord[]>(initBlinds);

  return (
    <>
      {blinds.map(({ seat, chips }, index) => {
        return (
          <div key={seat} className={styles.blindRecord}>
            <div className={styles.title}>{seat}</div>
            <Input
              placeholder="Input Blind Size"
              type="number"
              value={chips}
              onChange={(e) => {
                const newBlinds = blinds.slice();
                newBlinds.splice(index, 1, {
                  ...blinds[index],
                  chips: +e.target.value,
                });
                setBlinds(newBlinds);
              }}
            />
            {
              <Button
                style={{ width: 50 }}
                type="text"
                danger
                disabled={seat === PlayerSeat.SB || seat === PlayerSeat.BB}
                icon={<MinusCircleOutlined />}
                onClick={() => {
                  const newBlinds = blinds.slice();
                  newBlinds.splice(index, 1);
                  setBlinds(newBlinds);
                }}
              />
            }
          </div>
        );
      })}
      <Button
        disabled={blinds.length >= playerStates.length}
        onClick={() => {
          setBlinds([
            ...blinds,
            {
              seat: playerStates[blinds.length].seat,
              chips: blinds[blinds.length - 1].chips * 2,
            },
          ]);
        }}
      >
        +
      </Button>
      <Button type="primary" onClick={() => onConfirm(blinds)}>
        Next
      </Button>
    </>
  );
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

  // return (
  //   <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
  //     <span style={{ fontSize: 16 }}>PotSize = {potSize}</span>
  //     <Button type="primary" onClick={() => onConfirm(potSize)}>
  //       Next Stage
  //       <ArrowRightOutlined />
  //     </Button>
  //   </div>
  // );

  return (
    <CompactInput
      placeholder="Pot size"
      disabledConfirm={disabledConfirm || !stageClear || potSize <= 0}
      value={potSize}
      // onValueChange={(input) => setPotSize(+input)}
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      onValueChange={() => {}}
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
  selectedCards: Card[];
  estimatePotSize: number;
  stageClear: boolean;
  onConfirm: (nextStage: PostFlopHandStage, dealCards: Card[], potSize: number) => void;
}> = ({ currentStage, selectedCards, estimatePotSize, stageClear, onConfirm }) => {
  const nextStage = getNextStage(currentStage) as PostFlopHandStage;
  const count = nextStage === HandStage.Flop ? 3 : 1;

  const [dealCards, setDealCards] = useState<Card[]>([]);

  const selectDealCards = () => {
    CardSelectorModal.open({
      count,
      onSelect: setDealCards,
      defaultSelectedCards: dealCards,
      disabledCards: selectedCards,
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
