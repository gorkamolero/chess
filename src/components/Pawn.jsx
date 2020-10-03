import React from 'react';
import { ItemTypes } from 'helpers/constants';
import { useDrag } from 'react-dnd';
import { useGame } from 'Game';
import { PieceContainer, Piece } from 'styles/StyledComps';
import WhitePawn from 'assets/wp.png';
import BlackPawn from 'assets/bp.png';
import { pieceColour } from 'helpers/utils';

const Pawn = ({ file, rank, colour, id }) => {
  const {
    selectedPiece,
    setPiece,
    setSelectedSquare,
    dragging,
    setDragging,
  } = useGame();
  const [square, movePiece] = React.useState(file + rank);

  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.PAWN },
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

  const onClickHandler = () => {
    if (selectedPiece) {
      setSelectedSquare(file + rank);
    } else {
      setPiece(id);
    }
  };

  return (
    <PieceContainer
      width={1}
      height={1}
      area={square}
      className={`piece ${colour} pawn`}
      onClick={onClickHandler}
      isDragging={dragging}
      selected={selectedPiece && selectedPiece.id === id}
    >
      <Piece
        ref={drag}
        piece={pieceColour(colour, WhitePawn, BlackPawn)}
        isDragging={isDragging}
        style={{ opacity: isDragging ? '.5' : 1 }}
      />
    </PieceContainer>
  );
};

export default Pawn;
