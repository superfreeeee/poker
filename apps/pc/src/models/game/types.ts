import { BuyInData } from '../buyIn';
import { BaseRecord } from '../common';
import { HandRecord } from '../hand';

export interface GameRecord extends BaseRecord {
  location: string;
  date: number;
  comment: string | null;
  buyInData: BuyInData | null;
  handRecords: HandRecord[];
}
