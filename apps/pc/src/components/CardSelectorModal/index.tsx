import React from 'react';
import CardSelector, { ICardSelectorProps } from './CardSelector';
import { ModalProxy } from './ModalProxy';

interface ICardSelectorModal {
  open: (props?: ICardSelectorProps) => void;
  close: () => void;
}

const cardSelectorModalProxy = new ModalProxy({ id: '__CardSelectorModal_container' });

export const CardSelectorModal = Object.assign(CardSelector, {
  /**
   * Open modal
   * @param props
   */

  open: (props = {}) => {
    const { onSelect, onCancel, onClose } = props;

    cardSelectorModalProxy.render(
      <CardSelector
        max={3}
        {...props}
        onSelect={(cards) => {
          onSelect?.(cards);
          cardSelectorModalProxy.unmount();
        }}
        onCancel={() => {
          onCancel?.();
          cardSelectorModalProxy.unmount();
        }}
        onClose={() => {
          onClose?.();
          cardSelectorModalProxy.unmount();
        }}
      />,
    );
  },

  /**
   * close modal
   * @returns
   */
  close: () => {
    cardSelectorModalProxy.unmount();
  },
} as ICardSelectorModal);
