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
    function generateRandomExcluding(min, max) {
      const num = Math.floor(Math.random() * (max - min + 1)) + min;
      return existingIDs.includes[num]
        ? generateRandomExcluding(min, max)
        : num;
    }

    return generateRandomExcluding(min, max);
  };

  const chooseRandomFile = () => {
    const existingFiles = whitePawns.map((pawn) => pawn.file);
    const remainingFiles = Files.filter((n) => !existingFiles.includes(n));
    const randomizeArray = shuffleArray(remainingFiles);
    return randomizeArray[0];
  };

  const addPawn = () => {
    const reachedMaxPawns = whitePawns.length >= Files.length;
    if (reachedMaxPawns) return;

    console.log('Adding ♟️');
    const newPawn = {
      Piece: Pawn,
      type: 'pawn',
      file: chooseRandomFile(),
      rank: 2,
      colour: 'white',
      id: genRandomID(1, 10000),
    };

    setGame([...game, newPawn]);
  };

  return <Button onClick={addPawn} text='♟️'></Button>;
};

export default Controls;
