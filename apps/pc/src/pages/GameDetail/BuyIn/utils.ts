import { Modal } from 'antd';
import { BuyInPlayer } from '../../../models/buyIn';

interface ConfirmModalOptions {
  title: string;
  content: string;
  okText?: string;
  onOk?: VoidFunction;
  onCancel?: VoidFunction;
}

/**
 * Double check modal
 * @param param0
 * @returns
 */
export const confirmModal = ({
  title,
  content,
  okText = 'Reset',
  onOk,
  onCancel,
}: ConfirmModalOptions): Promise<boolean> => {
  return new Promise((resolve) => {
    Modal.confirm({
      // title: 'Reset buyIn data',
      // content: 'Are you sure to reset buy-in data?',
      title,
      content,
      centered: true,
      closable: true,
      maskClosable: true,
      okButtonProps: {
        type: 'primary',
        danger: true,
      },
      okText: okText,
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

/**
 * 校验 BuyInPlayer[]
 * @param players
 * @returns true: 校验通过
 */
export const validateBuyInPlayers = (players: BuyInPlayer[]) => {
  return players.every(
    (player) =>
      // 名字不为空
      player.name !== '' &&
      // 至少买入一手
      player.hands > 0,
  );
};
