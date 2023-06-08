import React, { FC } from 'react';
import { Button } from 'antd';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import TitleBar from '../TitleBar';
import PlayResult from '../PlayResult';
import { useCreateBuyInData } from '../../model';
import { invalidateGameDetail } from '../../../../../api/game';
import { useBuyInDataAddService } from '../../../../../services/buyin';
import { transformBuyInDataToGameBuyInDataVo } from '../../../../../models/buyIn';
import initialStyles from '../BuyInPrepare/index.module.scss';
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
  const addBuyInDataService = useBuyInDataAddService();

  async function submitBuyInData() {
    await addBuyInDataService(
      transformBuyInDataToGameBuyInDataVo({
        gameId,
        buyInData: { amountPerhand, players: buyInPlayers },
      }),
    );
    invalidateGameDetail(gameId);
    navigate(generatePath('/game/:id', { id: gameId }));
  }

  return (
    <div className={initialStyles.container}>
      <TitleBar
        isEditable={false}
        title="结算状态"
        amountPerhand={amountPerhand}
        statisticsData={statisticsData}
      />
      <div className={initialStyles.playerList}>
        {buyInPlayers.map((player, i) => (
          <PlayResult
            key={player.id}
            player={player}
            amountPerhand={amountPerhand}
            onChange={(player) => changePlayer(player, i)}
            isEditable={true}
          />
        ))}
      </div>
      <div className={styles.buttonList}>
        <Button onClick={enterPrevState}>返回</Button>
        <div className={styles.resUnderLine}>最终盈余总计 {totalBenefit}</div>
        <div>
          <Button
            className={initialStyles.deepBtn}
            disabled={totalBenefit != 0}
            onClick={submitBuyInData}
          >
            Show final result
          </Button>
        </div>
      </div>
    </div>
  );
};
export default BuyInSettle;
