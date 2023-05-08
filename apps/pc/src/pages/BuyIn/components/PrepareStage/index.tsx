import React, { useState } from 'react';
import { IBuyInData, useCurrentBuyInData } from '../../../../models/buyIn';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Editable = ({ data }: { data: IBuyInData }) => {
  return <div></div>;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Content = ({ data }: { data: IBuyInData }) => {
  return <div></div>;
};

const PrepareStage = () => {
  const {
    currentBuyInData,
    // currentBuyInData: { amountPerhand, players: buyInPlayers },
    // sumData,
    // addPlayer,
  } = useCurrentBuyInData();
  const [isEdit] = useState(false);

  return (
    <div>
      {isEdit ? (
        // 编辑态
        <Editable data={currentBuyInData} />
      ) : (
        // 预览
        <Content data={currentBuyInData} />
      )}
    </div>
  );
};

export default PrepareStage;
