import React, { FC } from 'react';
import { Button } from 'antd';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import Header from '../../../../components/Header';
import TitleBar from '../TitleBar';
import PlayResult from '../PlayResult';
import { useCreateBuyInData } from '../../model';
import { useBuyInDataAddService } from '../../../../services/buyin';
import { useGameDetailService } from '../../../../services/game';
import { transformBuyInDataToGameBuyInDataVo } from '../../../../models/buyIn';
import initialStyles from '../BuyInPrepare/index.module.scss';
import { confirmModal } from '../../utils';
import styles from './index.module.scss';

interface IBuyInSettleProps {
  enterPrevState: () => void;
}
const BuyInSettle: FC<IBuyInSettleProps> = ({ enterPrevState }: IBuyInSettleProps) => {
  const {
    buyInData: { amountPerhand, players: buyInPlayers },
    statisticsData,
    totalBenefit,
    changePlayer,
  } = useCreateBuyInData();
  const { gameId = '' } = useParams();
  const navigate = useNavigate();
  const { reloadGameDetail } = useGameDetailService(gameId);
  const addBuyInDataService = useBuyInDataAddService();

  async function waitReload() {
    await addBuyInDataService(
      transformBuyInDataToGameBuyInDataVo({
        gameId: gameId,
        buyInData: { amountPerhand: amountPerhand, players: buyInPlayers },
      }),
    );
    await reloadGameDetail();
    navigate(generatePath('/game/:id', { id: gameId }));
  }

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
              className={initialStyles.deepBtn}
              disabled={totalBenefit != 0}
              onClick={() => {
                // updateBuyInDataService(
                //   transformBuyInDataToGameBuyInDataVo({
                //     gameId: gameId,
                //     buyInData: { amountPerhand: amountPerhand, players: buyInPlayers },
                //   }),
                // );
                waitReload();
              }}
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
