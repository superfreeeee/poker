import classNames from 'classnames';
import React, { FC } from 'react';
import { HandAction } from '../../../../models/hand';
import HandActionUI from './HandAction';
import styles from './index.module.scss';

interface IHandActionsProps {
  actions: HandAction[];
  narrow?: boolean;
  className?: string;
}

const HandActions: FC<IHandActionsProps> = ({ actions, narrow, className }) => {
  return (
    <div className={classNames(styles.actionList, className)}>
      {actions.map((action, i) => (
        <HandActionUI key={i} narrow={narrow} action={action} />
      ))}
    </div>
  );
};

export default HandActions;
