import React from 'react';
import { useGame } from 'Game';

const Pieces = () => {
  const { game } = useGame();

  return (
    <>
      {game.map(({ Piece, id, ...rest }) => (
        <Piece key={id} id={id} {...rest} />
      ))}
    </>
  );
};

export default Pieces;
