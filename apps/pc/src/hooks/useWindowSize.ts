import { useLayoutEffect, useState } from 'react';

interface BoxSize {
  width: number;
  height: number;
}

export const useWindowSize = () => {
  const [size, setSize] = useState<BoxSize>({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const updateSize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', updateSize);
    return () => {
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  return size;
};
