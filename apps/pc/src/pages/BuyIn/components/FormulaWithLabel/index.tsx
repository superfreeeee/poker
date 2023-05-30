import React, { FC, ReactNode } from 'react';
import styles from './index.module.scss';

interface IFormulaItem {
  label: string;
  value: number | ReactNode;
}

interface IFormulaWithLabelProps {
  x: IFormulaItem;
  sign: string;
  y: IFormulaItem;
  z: IFormulaItem;
}

const FormulaWithLabel: FC<IFormulaWithLabelProps> = ({ x, sign, y, z }) => {
  return (
    <div className={styles.container}>
      <span>{x.label}</span>
      <span>{sign}</span>
      <span>{y.label}</span>
      <span>=</span>
      <span>{z.label}</span>
      <span className={typeof x.value !== 'number' ? styles.input : ''}>{x.value}</span>
      <span>{sign}</span>
      <span>{y.value}</span>
      <span>=</span>
      <span>{z.value}</span>
    </div>
  );
};

export default FormulaWithLabel;
