import React, { FC } from 'react';
import classNames from 'classnames';
import Back from '../Back';
import styles from './index.module.scss';

interface IHeaderProps {
  title: string;
  back?: string | true;
  beforeNavigate?: () => Promise<boolean> | boolean;
  style?: React.CSSProperties;
  className?: string;
}

const Header: FC<IHeaderProps> = ({ title, back: path, beforeNavigate, style, className }) => {
  return (
    <div className={classNames(styles.header, className)} style={{ ...style }}>
      {!!path && (
        <Back path={typeof path === 'string' ? path : undefined} beforeNavigate={beforeNavigate} />
      )}
      <h1>{title}</h1>
    </div>
  );
};

export default Header;
