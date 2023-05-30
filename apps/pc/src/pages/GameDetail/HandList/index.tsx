import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { createLogger } from '../../../common/commonLogger';
import { renderCardText } from '../../../components/Card';
import { HandRecord, useLocalHandRecords } from '../../../models/hand';
import { useAddHandService } from '../../../services/hand';
import { encodeCard } from '../../../models/card';
import mockHandRecord from './mockHandRecord.json';
import styles from './index.module.scss';

const logger = createLogger('pages/HandRecordList');

interface IHandListProps {
  data?: HandRecord[];
  reloadGameDetail: VoidFunction;
}

const HandList = ({ data, reloadGameDetail }: IHandListProps) => {
  const { localRecords } = useLocalHandRecords();
  const records = data ?? localRecords;

  const { gameId = '' } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    logger.log('records', records);
  }, [records]);

  const addHandService = useAddHandService();

  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        <h3>Hand Records</h3>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('./hand/create')}>
          New Record
        </Button>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            const { players, blinds, boardCards, actions } = mockHandRecord as HandRecord;
            if (gameId) {
              addHandService({
                gameId,
                players,
                blinds,
                boardCards: boardCards.map(encodeCard),
                actions: actions.map((action) => {
                  return {
                    ...action,
                    cards:
                      action.type === 'stageInfo' || action.type === 'playerShowdown'
                        ? action.cards.map(encodeCard)
                        : null,
                  };
                }),
              }).then((success) => {
                if (success) {
                  reloadGameDetail();
                }
              });
            }
          }}
        >
          Mock: New Record
        </Button>
      </div>
      <div className={styles.records}>
        {records.map((record) => {
          return (
            <div
              key={record.id}
              className={styles.record}
              onClick={() => navigate(`./hand/${record.id}`)}
            >
              <h3 className={styles.title}>Record Id: {record.id.substring(0, 6)}</h3>
              <div className={styles.time}>{new Date(record.createTime).toLocaleString()}</div>
              {renderCardText(record.boardCards, styles.cards)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HandList;
