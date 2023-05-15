import { Button } from 'antd';
import React, { useEffect } from 'react';
import { useLocalHandRecords } from '../../models/hand';
// import record1 from '../HandCreate/record1';

const HandRecordList = () => {
  const { localRecords } = useLocalHandRecords();

  useEffect(() => {
    console.log('localRecords', localRecords);
  }, [localRecords]);

  return (
    <div>
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
