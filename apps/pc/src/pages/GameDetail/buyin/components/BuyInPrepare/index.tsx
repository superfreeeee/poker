import React, { FC } from 'react';
import { Button, Divider, Input, List, Space, message } from 'antd';
import {
  DeleteOutlined,
  MinusOutlined,
  PlusOutlined,
  SwapOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useNewCreateBuyInData } from '../../model';
import { validateBuyInPlayers } from '../../utils';
import {
  NameWrapper,
  BuyInPlayerWrapper,
  Container,
  BuyInWrapper,
  BuyInChipsWrapper,
  BuyInHandsWrapper,
  BuyInSwitcherWrapper,
} from './style';

interface IBuyInPrepareProps {
  enterNextState: () => void;
}

const BuyInPrepare: FC<IBuyInPrepareProps> = ({ enterNextState }: IBuyInPrepareProps) => {
  const {
    buyInData,
    onAmountPerHandChange,
    addPlayer,
    removePlayer,
    toggleBuyInType,
    onPlayerChange,
    onBuyInChange,
  } = useNewCreateBuyInData();

  const validateAmountPerhand = () => {
    return buyInData.amountPerHand > 0;
  };

  const completePrepareStage = () => {
    if (!validateBuyInPlayers(buyInData.players)) {
      message.error('玩家名不能为空');
      return;
    }

    if (!validateAmountPerhand()) {
      message.error('一手金额大于0');
      return;
    }

    enterNextState();
  };

  return (
    <Container>
      <Input
        value={buyInData.amountPerHand}
        onChange={(e) => {
          const amount = Number(e.target.value);
          onAmountPerHandChange(amount);
        }}
      />
      <List
        dataSource={buyInData.players}
        renderItem={(player, i) => {
          const { name, hands, chips, type } = player;
          const useHands = type !== 'chips';

          return (
            <List.Item>
              <BuyInPlayerWrapper>
                <NameWrapper>
                  <div>Player name</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Input
                      addonBefore={<UserOutlined />}
                      value={name}
                      placeholder="Input player name"
                      size="large"
                      maxLength={30}
                      showCount
                      allowClear
                      onChange={(e) => {
                        onPlayerChange({ name: e.target.value }, i);
                      }}
                    />
                    <Button
                      size="large"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => removePlayer(i)}
                    />
                  </div>
                </NameWrapper>
                <BuyInWrapper>
                  <BuyInHandsWrapper>
                    <div>Buy-in hands</div>
                    <Space>
                      <Space.Compact size="large">
                        <Button
                          icon={<MinusOutlined />}
                          disabled={!useHands || hands <= 1}
                          onClick={() => {
                            onBuyInChange('hands', hands - 1, i);
                          }}
                        />
                        <Input
                          type="number"
                          disabled={!useHands}
                          value={hands}
                          onChange={(e) => {
                            const hands = Number(e.target.value);
                            onBuyInChange('hands', hands, i);
                          }}
                        />
                        <Button
                          icon={<PlusOutlined />}
                          disabled={!useHands}
                          onClick={() => {
                            onBuyInChange('hands', hands + 1, i);
                          }}
                        />
                      </Space.Compact>
                    </Space>
                  </BuyInHandsWrapper>
                  <BuyInSwitcherWrapper>
                    <Button
                      size="large"
                      icon={<SwapOutlined />}
                      onClick={() => toggleBuyInType(i)}
                    />
                  </BuyInSwitcherWrapper>
                  <BuyInChipsWrapper>
                    <div>Total Buy-in</div>
                    <Input
                      size="large"
                      disabled={useHands}
                      value={chips}
                      onChange={(e) => {
                        const chips = Number(e.target.value);
                        onBuyInChange('chips', chips, i);
                      }}
                    />
                  </BuyInChipsWrapper>
                </BuyInWrapper>
              </BuyInPlayerWrapper>
            </List.Item>
          );
        }}
      />

      <Divider />
      <Button size="large" icon={<PlusOutlined />} onClick={addPlayer}>
        Add more player
      </Button>

      <Divider />
      <Button type="primary" size="large" onClick={completePrepareStage}>
        Start play
      </Button>
    </Container>
  );
};

export default BuyInPrepare;
