import { useState } from 'react';

export const useCurrentBetSize = () => {
  const [currentBetSize, setCurrentBetSize] = useState(0); // Biggest bet size at current stage

  const updateCurrentBetSize = (betSize: number) => {
    if (betSize > currentBetSize) {
      setCurrentBetSize(betSize);
    }
  };

  const resetCurrentBetSize = () => {
    setCurrentBetSize(0);
  };

  return { currentBetSize, updateCurrentBetSize, resetCurrentBetSize };
};
