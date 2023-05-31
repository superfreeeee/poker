import { Modal } from 'antd';

interface ConfirmModalOptions {
  title: string;
  content: string;
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
