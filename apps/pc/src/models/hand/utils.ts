import { decodeCard, encodeCard, EncodedCard } from '../card';
import { Player, PlayerSeat, PlayerState } from '../player';
import {
  ALL_PLAYER_ACTIONS,
  HandAction,
  HandBlindRecord,
  HandRecord,
  PlayerAction,
  SettingPlayerAction,
} from './types';

interface IGetPlayerActionsProps {
  currentBetSize: number;
  currentState?: PlayerState;
  stageClear: boolean;
}

interface PlayerActionOption {
  label: string;
  value: string;
  disabled: boolean;
}

export const getPlayerActionOptions = ({
  currentBetSize,
  currentState,
  stageClear,
}: IGetPlayerActionsProps): PlayerActionOption[] => {
  const actions = ALL_PLAYER_ACTIONS.filter(
    (action) => !(currentBetSize > 0 ? action === PlayerAction.Bet : action === PlayerAction.Raise),
  ) as SettingPlayerAction[];

  return actions.map((action) => {
    return {
      label: action,
      value: action,
      disabled:
        stageClear ||
        (action === PlayerAction.Check && currentState && currentState.chips < currentBetSize) ||
        (currentBetSize === 0 && action === PlayerAction.Call),
    };
  });
};

const serializeActionV1 = (action: HandAction) => {
  switch (action.type) {
    case 'stageBlinds':
      return [action.type, action.players] as const;
    case 'stageInfo':
      return [action.type, action.stage, action.potSize, action.cards.map(encodeCard)] as const;
    case 'playerPayBlinds':
      return [action.type, action.seat, action.chips] as const;
    case 'playerShowdown':
      return [action.type, action.seat, action.cards.map(encodeCard)] as const;
    case 'playerAction':
      return [action.type, action.seat, action.action, action.chips] as const;
    default:
      throw new SyntaxError(`Unknown action type: ${(action as Record<string, unknown>).type}`);
  }
};

type SerializedHandAction = ReturnType<typeof serializeActionV1>;

const deserializeActionV1 = (actionArr: SerializedHandAction): HandAction => {
  switch (actionArr[0]) {
    case 'stageBlinds':
      return { type: actionArr[0], players: actionArr[1] };
    case 'stageInfo':
      return {
        type: actionArr[0],
        stage: actionArr[1],
        potSize: actionArr[2],
        cards: actionArr[3].map(decodeCard),
      };
    case 'playerPayBlinds':
      return {
        type: actionArr[0],
        seat: actionArr[1],
        chips: actionArr[2],
      };
    case 'playerShowdown':
      return {
        type: actionArr[0],
        seat: actionArr[1],
        cards: actionArr[2].map(decodeCard),
      };
    case 'playerAction':
      return {
        type: actionArr[0],
        seat: actionArr[1],
        action: actionArr[2],
        chips: actionArr[3],
      };
    default:
      throw new SyntaxError(`Unknown serialized action type: ${actionArr[0]}`);
  }
};

type SerializedHandRecord =
  | [
      version: 'v1',
      players: [id: string, name: string][],
      seatMap: { [seat in PlayerSeat]?: string },
      blinds: [seat: PlayerSeat, chips: number][],
      actions: SerializedHandAction[],
      boardCards: EncodedCard[],
      winnerId?: string,
    ];

export const serializeHandRecordV1 = (record: HandRecord): string => {
  const recordArr = [
    record.version,
    record.players.map((player) => [player.id, player.name]),
    record.seatMap,
    record.blinds.map((blind) => [blind.seat, blind.chips]),
    record.actions.map(serializeActionV1),
    record.boardCards.map((card) => encodeCard(card)),
    record.winnerId,
  ] as SerializedHandRecord;
  return JSON.stringify(recordArr);
};

export const deserializeHandReocrdV1 = (recordV1: string): HandRecord => {
  const [version, players, seatMap, blinds, actions, boardCards, winnerId] = JSON.parse(
    recordV1,
  ) as SerializedHandRecord;
  const recordDetail: HandRecord = {
    version,
    players: players.map(([id, name]): Player => ({ id, name })),
    seatMap,
    blinds: blinds.map(([seat, chips]): HandBlindRecord => ({ seat, chips })),
    actions: actions.map(deserializeActionV1),
    boardCards: boardCards.map(decodeCard),
    winnerId,
  };
  return recordDetail;
};
