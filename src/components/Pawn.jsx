import React from 'react';
import styled from 'styled-components';
import { Cell } from 'styled-css-grid';
import WhitePawn from 'assets/wp.png';
import BlackPawn from 'assets/bp.png';
import { pieceColour } from 'helpers/utils';

const PieceContainer = styled(Cell)`
  padding: 10px;
  display: flex;
  align-items: stretch;
  justify-content: stretch;
`;

const Piece = styled.div`
  width: 100%;
  height: 100%;
  background-size: contain;
  ${({ piece }) => `
    background-image: url(${piece});
  `}
  z-index: 1;
`;

const Pawn = ({ area, colour, position }) => {
  console.log('YOLo', area);
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
