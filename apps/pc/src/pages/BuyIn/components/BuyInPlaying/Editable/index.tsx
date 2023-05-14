import React, {  useState, FC } from 'react';
import { Input, Button, Form } from 'antd';
import { DownCircleFilled, TransactionOutlined } from '@ant-design/icons';
import PlayerHand from '../../PlayerHand';
import { IPlayer, useCurrentBuyInData, useBuyInData } from '../../../../../models/buyIn';
import StatisticsDataView from '../../StatisticsDataView';
import initialStyles from '../../BuyInPrepare/index.module.scss';
import styles from './index.module.scss';

interface IEditableProps {
  exitEdit: () => void;
}

const Editable: FC<IEditableProps> = ({ exitEdit }: IEditableProps) => {
  const { buyInData: currentBuyInData, changeBuyInData: changeCurrentBuyInData } =
    useCurrentBuyInData();
  const [editBuyInData, setEditBuyInPlayers] = useState(currentBuyInData);

  const {
    buyInData: { amountPerhand: editAmoutPerhand, players: editBuyInPlayers },
    statisticsData: { totalPlayer, totalHands, totalAmount },
    addPlayer: addEditPlayer,
    removePlayer: removeEditPlayer,
    changePlayer: changeEditPlayer,
    changeBuyInData: changeEditBuyInData,
  } = useBuyInData({ buyInData: editBuyInData, setBuyInData: setEditBuyInPlayers });

  return (
    <div className={initialStyles.container}>
      <div className={initialStyles.header}>
        <div className={initialStyles.leftWrap}>
          <div style={{ fontSize: 20 }}>编辑状态</div>
          <div className={initialStyles.inputForm}>
            <div>一手金额</div>
            <Form>
              <Form.Item
                name="amountPerhand"
                rules={[
                  {
                    required: true,
                    pattern: new RegExp(/^[1-9]\d*$/, 'g'),
                    message: '请输入正整数',
                  },
                  {
                    max: 10,
                    message: '超出最大买入数量',
                  },
                ]}
              >
                <Input
                  placeholder="Input here"
                  maxLength={11}
                  value={editAmoutPerhand}
                  bordered={false}
                  prefix={<TransactionOutlined />}
                  onChange={(e) => {
                    const amount = +e.target.value;
                    if (isNaN(amount)) {
                      return;
                    }
                    if (amount < 0) return;
                    changeEditBuyInData({
                      players: editBuyInPlayers,
                      amountPerhand: amount,
                    });
                  }}
                />
              </Form.Item>
            </Form>
          </div>
        </div>

        <StatisticsDataView
          totalPlayer={totalPlayer}
          totalHands={totalHands}
          totalAmount={totalAmount}
        />
      </div>
      <div className={initialStyles.playerList}>
        {editBuyInPlayers.map((player, i) => (
          <PlayerHand
            key={player.id}
            player={player}
            onRemove={(id: string) => {
              removeEditPlayer(id);
            }}
            onChange={(targetPlayer: IPlayer) => {
              changeEditPlayer(targetPlayer, i);
            }}
          ></PlayerHand>
        ))}
      </div>
      <div className={styles.buttonList}>
        <div>
          <Button
            className={styles.singleBtn}
            icon={<DownCircleFilled className={styles.btnSvg} />}
            onClick={() => {
              addEditPlayer();
            }}
          >
            Add more player
          </Button>
        </div>
        <div className={styles.twoBtnContainer}>
          <div>
            <Button
              className={initialStyles.addBtn}
              onClick={() => {
                changeCurrentBuyInData(editBuyInData);
                exitEdit();
              }}
            >
              Confirm Change
            </Button>
          </div>
          <div>
            <Button
              className={initialStyles.nextBtn}
              onClick={() => {
                exitEdit();
              }}
            >
              Cancel Change
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Editable;
