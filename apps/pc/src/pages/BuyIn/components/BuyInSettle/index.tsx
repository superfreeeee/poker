import React, { FC } from 'react';
import { Button } from 'antd';
import Header from '../../../../components/Header';
import TitleBar from '../TitleBar';
import { useCreateBuyInData } from '../../model';
import PlayResult from '../PlayResult';
import initialStyles from '../BuyInPrepare/index.module.scss';
import { confirmModal } from '../../utils';
import styles from './index.module.scss';

interface IBuyInSettleProps {
  enterPrevState: () => void;
  enterNextState: () => void;
}
const BuyInSettle: FC<IBuyInSettleProps> = ({
  enterPrevState,
  enterNextState,
}: IBuyInSettleProps) => {
  const {
    buyInData: { amountPerhand, players: buyInPlayers },
    statisticsData,
    totalBenefit,
    changePlayer,
  } = useCreateBuyInData();

  return (
    <>
      <Header
        title="BuyIn Settle"
        back="/buyin/create"
        beforeNavigate={async () => {
          await confirmModal({
            title: 'Back to playing',
            content: 'Are you sure to go back to playing stage?',
            onOk: () => {
              enterPrevState();
            },
          });
          return false;
        }}
        style={{ alignSelf: 'stretch' }}
      />
      <div className={initialStyles.container}>
        <TitleBar
          isEditable={false}
          title="结算状态"
          amountPerhand={amountPerhand}
          statisticsData={statisticsData}
        ></TitleBar>
        <div className={initialStyles.playerList}>
          {buyInPlayers.map((player, i) => (
            <PlayResult
              key={player.id}
              player={player}
              amountPerhand={amountPerhand}
              onChange={(player) => changePlayer(player, i)}
              isEditable={true}
            ></PlayResult>
          ))}
        </div>
        <div className={styles.buttonList}>
          <div className={styles.resUnderLine}>最终盈余总计 {totalBenefit}</div>
          <div>
            <Button
              className={initialStyles.nextBtn}
              onClick={() => enterNextState()}
              disabled={totalBenefit != 0}
            >
              Show final result
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default BuyInSettle;
