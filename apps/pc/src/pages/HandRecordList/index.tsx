import { Button } from 'antd';
import React, { useEffect } from 'react';
import { renderCardText } from '../../components/Card';
import { useLocalHandRecords } from '../../models/hand';
// import record1 from '../HandCreate/record1';

const HandRecordList = () => {
  const { localRecords } = useLocalHandRecords();

  useEffect(() => {
    console.log('localRecords', localRecords);
  }, [localRecords]);

  return (
    <div>
      <h1>Hand Record List</h1>
      {localRecords.map((record) => {
        return (
          <div key={record.id}>
            <h3>Hand Record</h3>
            {renderCardText(record.boardCards)}
          </div>
        );
      })}
      <Button
        onClick={() => {
          // setRecords([...records, record1]);
        }}
      >
        Add
      </Button>
    </div>
  );
};

export default HandRecordList;
