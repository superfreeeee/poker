import { useLayoutEffect, useRef, useState } from 'react';

const ROLLING_DURATION = 200;

const genNum = () => Math.floor(Math.random() * 100) + 1;

export const useRng = (onRolling?: (num: number, isRolling: boolean) => void) => {
  const [num, setNum] = useState(0);
  const isRolling = useRef(false);

  const onRollingCb = useRef(onRolling);
  useLayoutEffect(() => {
    onRollingCb.current = onRolling;
  }, [onRolling]);

  const rolling = () => {
    if (isRolling.current) {
      return;
    }
    isRolling.current = true;

    const startTime = Date.now();
    const next = () => {
      // Generate next number
      const nextNum = genNum();

      const rollingEnd = Date.now() - startTime >= ROLLING_DURATION;
      // callback
      onRollingCb.current?.(nextNum, !rollingEnd);

      // End Rolling
      if (rollingEnd) {
        setNum(nextNum);
        isRolling.current = false;
        return;
      }

      window.requestAnimationFrame(next);
    };

    next();
  };

  return { num, rolling };
};
