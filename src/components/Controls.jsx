import React from 'react';
import { useGame } from 'Game';
import { Button } from 'components/Button';
import { Files } from 'helpers/constants';
import { shuffleArray } from 'helpers/utils';
import Pawn from 'components/Pawn';

const Controls = () => {
  const { game, setGame } = useGame();

  const whitePawns = game.filter(
    (piece) => piece.type === 'pawn' && piece.colour === 'white'
  );

  const genRandomID = (min, max) => {
    const existingIDs = game.map((piece) => piece.id);
    function generateRandomID(min, max) {
      const num = Math.floor(Math.random() * (max - min + 1)) + min;
      return existingIDs.includes[num] ? generateRandomID(min, max) : num;
    }

    return generateRandomID(min, max);
  };

  const genRandomFile = () => {
    const existingFiles = whitePawns.map((pawn) => pawn.file);
    const remainingFiles = Files.filter((n) => !existingFiles.includes(n));
    const randomized = shuffleArray(remainingFiles);
    console.log(randomized);
    return randomized[0];
  };

  const addPawn = () => {
    if (whitePawns.length < Files.length) {
      console.log('Adding ♟️');
      const newPawn = {
        Piece: Pawn,
        type: 'pawn',
        file: genRandomFile(),
        rank: 2,
        colour: 'white',
        id: genRandomID(1, 10000),
      };

      setGame([...game, newPawn]);
    }
  };

  return <Button onClick={addPawn} text='♟️'></Button>;
};

export default Controls;
