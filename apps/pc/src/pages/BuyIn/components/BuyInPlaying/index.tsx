import { Modal } from 'antd';
import React, { useState } from 'react';
import Header from '../../../../components/Header';
import Content from './Content';
import Editable from './Editable';
import { ResetSetting } from './types';

const BuyInPlaying = () => {
  const [isEdit, setEdit] = useState(false);

  const resetSetting: ResetSetting = ({ onOk, onCancel } = {}) => {
    return new Promise((resolve) => {
      Modal.confirm({
        title: 'Reset buyIn data',
        content: 'Are you sure to reset buy-in data?',
        centered: true,
        closable: true,
        maskClosable: true,
        okButtonProps: {
          type: 'primary',
          danger: true,
        },
        okText: 'Reset',
        onOk: () => {
          onOk?.();
          resolve(true);
        },
        onCancel: () => {
          onCancel?.();
          resolve(false);
        },
      });
    });
  };

  return (
    <div>
      <Header
        title="BuyIn Playing"
        back="/buyin/prepare"
        beforeNavigate={() => resetSetting()}
        style={{ alignSelf: 'stretch' }}
      />
      {isEdit ? (
        // 编辑态
        <Editable exitEdit={() => setEdit(false)} />
      ) : (
        // 预览
        <Content enterEdit={() => setEdit(true)} resetSetting={resetSetting} />
      )}
    </div>
  );
};

export default BuyInPlaying;
