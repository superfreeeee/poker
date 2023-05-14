import { useEffect, useState } from 'react';
import { HandAction } from '../../../models/hand';

export const useHandActions = () => {
  const [actions, setActions] = useState<HandAction[]>([]);

  const dispatchAction = (...addActions: HandAction[]) => {
    setActions([...actions, ...addActions]);
  };

  useEffect(() => {
    console.log('actions', actions);
  }, [actions]);

  return { actions, dispatchAction };
};
