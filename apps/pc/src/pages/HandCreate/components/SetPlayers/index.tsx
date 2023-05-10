import React, { FC, useState } from 'react';
import CompactInput from '../CompactInput';

interface ISetPlayersProps {
  onConfirm?: (players: number) => void;
}

const SetPlayers: FC<ISetPlayersProps> = ({ onConfirm }) => {
  const [players, setPlayers] = useState(0);

  return (
    <CompactInput
      placeholder="Input pre-flop players"
      disabledConfirm={players <= 0}
      value={players}
      onValueChange={(input) => setPlayers(+input)}
      onOk={() => onConfirm?.(players)}
    />
  );
};

export default SetPlayers;
