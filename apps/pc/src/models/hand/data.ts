import { atom, useAtom } from 'jotai';
import { ELocalStorageKey, getItem, setItem } from '../../common/localStorage';
import { HandRecord } from './types';
import { safeDeserializeHandReocrdV1, serializeHandRecordV1 } from './utils';

const localHandRecordsBaseAtom = atom(
  getItem(ELocalStorageKey.HandRecordList)
    ?.map((record) => safeDeserializeHandReocrdV1(record))
    .filter((record): record is HandRecord => !!record) ?? [],
);

const localHandRecordsAtom = atom(
  (get) => get(localHandRecordsBaseAtom),
  (_, set, records: HandRecord[]) => {
    set(localHandRecordsBaseAtom, records);

    const serializedRecords = records.map(serializeHandRecordV1);
    setItem(ELocalStorageKey.HandRecordList, serializedRecords);

    return records;
  },
);

export const useLocalHandRecords = () => {
  const [localRecords, setLocalRecords] = useAtom(localHandRecordsAtom);

  const addRecord = (record: HandRecord) => {
    setLocalRecords([...localRecords, record]);
  };

  return { localRecords, addRecord };
};
