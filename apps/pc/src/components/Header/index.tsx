import classNames from 'classnames';
import React, { FC } from 'react';
import Back from '../Back';
import styles from './index.module.scss';

interface IHeaderProps {
  title: string;
  back?: string | true;
  className?: string;
}

const Header: FC<IHeaderProps> = ({ title, back: path, className }) => {
  return (
    <div className={classNames(styles.header, className)}>
      {!!path && <Back path={typeof path === 'string' ? path : undefined} />}
      <h1>{title}</h1>
    </div>
  );
};

export default Header;
