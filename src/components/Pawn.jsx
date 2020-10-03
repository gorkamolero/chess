import React from 'react';
import WhitePawn from 'assets/wp.png';
import BlackPawn from 'assets/bp.png';
import { pieceColour } from 'helpers/utils';
import { PieceContainer, Piece } from 'styles/StyledComps';
import { Files, Ranks } from 'helpers/constants';

const Pawn = ({ area, colour }) => {
  return (
    <PieceContainer
      width={1}
      height={1}
      area={area}
      className={`${colour} pawn`}
    >
      <Piece piece={pieceColour(colour, WhitePawn, BlackPawn)} />
    </PieceContainer>
  );
};

export default Pawn;
