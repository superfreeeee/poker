import { ChangeEvent, useCallback, useState } from 'react';

export const useInput = (initialValue = '') => {
  const [input, setInput] = useState(initialValue);

  const onInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }, []);

  const reset = useCallback(() => {
    setInput(initialValue);
  }, [initialValue]);

  const clear = useCallback(() => {
    setInput('');
  }, []);

  return [input, onInputChange, { reset, clear }] as const;
};
