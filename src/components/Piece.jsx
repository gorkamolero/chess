import React from 'react';
import { pieces } from 'helpers/constants';
import { useDrag } from 'react-dnd';
import { useGame } from 'Game';
import { PieceContainer, PieceUI, MoveOverlay } from 'styles/StyledComps';
import WhitePawn from 'assets/wp.png';
import BlackPawn from 'assets/bp.png';
import { pieceColour } from 'helpers/utils';

const Piece = ({ file, rank, colour, id, type }) => {
  const {
    selectedPiece,
    setPiece,
    setSelectedSquare,
    dragging,
    setDragging,
  } = useGame();
  const [square, movePiece] = React.useState(file + rank);

  const [{ isDragging }, drag] = useDrag({
    item: { type: pieces.PAWN },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
    begin: () => {
      setDragging(true);
      setPiece(id);
    },
    isDragging: () => {},
    end: () => {
      setDragging(false);
      setPiece(null);
    },
  });

  React.useEffect(() => {
    movePiece(file + rank);
  }, [file, rank]);

  const select = () => {
    console.log('Clicking', selectedPiece);
    if (selectedPiece) {
      setSelectedSquare(file + rank);
    } else {
      setPiece(id);
    }
  };

  const handleType = React.useMemo(() => {
    if (type === 'pawn') {
      return pieceColour(colour, WhitePawn, BlackPawn);
    }
  }, [type, colour]);

  const isSelected = selectedPiece && selectedPiece.id === id;

  return (
    <PieceContainer
      width={1}
      height={1}
      area={square}
      className={`piece ${colour} pawn`}
      onClick={select}
      isDragging={dragging}
      selected={isSelected}
    >
      <PieceUI
        ref={drag}
        piece={handleType}
        isDragging={isDragging}
        style={{ opacity: isDragging ? '.5' : 1 }}
      />

      {isSelected && <MoveOverlay legal />}
    </PieceContainer>
  );
};

export default Piece;
