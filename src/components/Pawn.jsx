import React from 'react';
import styled from 'styled-components';
import { useGame } from 'Game';
import WhitePawn from 'assets/wp.png';
import BlackPawn from 'assets/bp.png';
import { pieceColour } from 'helpers/utils';
import { PieceContainer, Piece } from 'styles/StyledComps';

const Pawn = ({ file, rank, colour, id }) => {
  const { selectedPiece, setPiece, setSelectedSquare } = useGame();
  const [square, movePiece] = React.useState(file + rank);

  React.useEffect(() => {
    movePiece(file + rank);
  }, [file, rank]);

  const onClickHandler = () => {
    // If we already have selected a piece, we de-select
    if (selectedPiece) {
      setSelectedSquare(file + rank);
      // setPiece(null);
    } else {
      setPiece(id);
    }
  };

  return (
    <PieceContainer
      width={1}
      height={1}
      area={square}
      className={`${colour} pawn`}
      onClick={onClickHandler}
    >
      <Piece
        piece={pieceColour(colour, WhitePawn, BlackPawn)}
        selected={selectedPiece && selectedPiece.id === id}
      />
    </PieceContainer>
  );
};

export default Pawn;
