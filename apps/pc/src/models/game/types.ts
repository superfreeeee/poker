import { BuyInData } from '../buyIn';
import { BaseRecord } from '../common';
import { HandRecord } from '../hand';

export interface GameRecord extends BaseRecord {
  buyInInfo: BuyInData;
  handRecords: HandRecord[];
}
