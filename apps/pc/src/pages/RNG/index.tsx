import React, { useRef } from 'react';
import Header from '../../components/Header';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import styles from './index.module.scss';
import { useRng } from './useRng';

type Color = [r: number, g: number, b: number];

const RGB_RED: Color = [255, 0, 0];
const RGB_ORANGE: Color = [255, 165, 0];
const RGB_GREEN: Color = [0, 165, 0];

const calcColorBetween = (from: Color, to: Color, alpha: number) => {
  const [r, g, b] = [
    Math.floor((to[0] - from[0]) * alpha + from[0]),
    Math.floor((to[1] - from[1]) * alpha + from[1]),
    Math.floor((to[2] - from[2]) * alpha + from[2]),
  ];
  return `rgb(${r},${g},${b})`;
};

const calcColor = (num: number) => {
  if (num >= 50) {
    return calcColorBetween(RGB_ORANGE, RGB_RED, (num - 50) / 50);
  } else {
    return calcColorBetween(RGB_GREEN, RGB_ORANGE, num / 50);
  }
};

/**
 * RandomNumberGenerator
 * @returns
 */
const RNG = () => {
  useDocumentTitle('RNG by @youxian/poker');

  const contentRef = useRef<HTMLDivElement>(null);

  const { rolling } = useRng((num) => {
    const content = contentRef.current;
    if (content) {
      content.textContent = `${num}`;
      const color = calcColor(num);
      content.style.color = color;
      content.style.borderColor = color;
    }
  });

  return (
    <div className={styles.container}>
      <Header title="RNG" back />
      <div ref={contentRef} className={styles.btn} onClick={rolling}>
        <span style={{ fontSize: 35 }}>Click me!</span>
      </div>
    </div>
  );
};

export default RNG;
