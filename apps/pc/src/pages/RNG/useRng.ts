import { useLayoutEffect, useRef, useState } from 'react';

const ROLLING_DURATION = 200;

const genNum = () => Math.floor(Math.random() * 100) + 1;

export const useRng = (onRolling?: (num: number) => void) => {
  const [num, setNum] = useState(() => genNum());
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
      const nextNum = genNum();
      onRollingCb.current?.(nextNum);

      if (Date.now() - startTime >= ROLLING_DURATION) {
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
