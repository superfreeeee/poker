import React, { useState } from 'react';
import Content from './Content';
import Editable from './Editable';

const BuyInPlaying = () => {
  const [isEdit, setEdit] = useState(false);

  return (
    <div>
      {isEdit ? (
        // 编辑态
        <Editable exitEdit={()=>setEdit(false)} />
      ) : (
        // 预览
        <Content enterEdit={() => setEdit(true)} />
      )}
    </div>
  );
};

export default BuyInPlaying;
