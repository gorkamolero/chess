import React from 'react';
import { pieces, getFileDiff, getSquare } from 'helpers/constants';
import { useDrag } from 'react-dnd';
import { useGame } from 'Game';
import { PieceContainer, PieceUI } from 'styles/StyledComps';
import WhitePawn from 'assets/wp.png';
import BlackPawn from 'assets/bp.png';
import { pieceColour } from 'helpers/utils';
import { useTransition, animated } from 'react-spring';

const Pieces = () => {
  const { game, moving, selectedPiece, legalMoves } = useGame();
  const getPhysicalMovement = ({
    initRank,
    initFile,
    targetRank,
    targetFile,
  }) => {
    const y = (initRank - targetRank) * 100;
    const x = getFileDiff(initFile, targetFile) * 100;
    return `translate3d(${x}%, ${y}%, 0)`;
  };

  const pieces = useTransition(
    game,
    (item) => getSquare(item.file, item.rank),
    {
      from: { opacity: 0 },
      enter: { opacity: 1 },
      leave: { opacity: 0 },
      update: ({ id }) => {
        if (
          moving &&
          selectedPiece &&
          legalMoves &&
          selectedPiece.id === id &&
          legalMoves.includes(moving.file + moving.rank)
        ) {
          return {
            transform: getPhysicalMovement({
              initRank: selectedPiece.rank,
              initFile: selectedPiece.file,
              targetRank: moving.rank,
              targetFile: moving.file,
            }),
          };
        } else return null;
        //
      },
    }
  );

  return (
    <>
      {pieces.map(
        ({ item, props, key }) =>
          item && <Piece key={key} style={props} id={item.id} {...item} />
      )}
    </>
  );
};

const StaticPiece = ({ file, rank, colour, id, type, style }) => {
  const {
    selectedPiece,
    setPiece,
    toggleSelectedSquare,
    dragging,
    setDragging,
    setMoving,
  } = useGame();

  // Dragging & dropping
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
      // forceSelectPiece(null);
    },
  });

  // Clicking
  const select = () => {
    if (selectedPiece) {
      toggleSelectedSquare(file + rank);
    } else {
      setPiece(id);
    }
  };

  // Handling UI
  const handleType = React.useMemo(() => {
    if (type === 'pawn') {
      return pieceColour(colour, WhitePawn, BlackPawn);
    }
  }, [type, colour]);

  // Helper
  const isSelected = selectedPiece && selectedPiece.id === id;

  const move = () => {
    setMoving(false);
  };

  return (
    <PieceContainer
      width={1}
      height={1}
      area={file + rank}
      className={`piece ${colour} pawn`}
      onClick={select}
      isDragging={dragging}
      selected={isSelected}
      style={style}
      onTransitionEnd={move}
    >
      <PieceUI
        ref={drag}
        piece={handleType}
        isDragging={dragging}
        style={{ opacity: isDragging ? '.5' : 1 }}
      />
    </PieceContainer>
  );
};

const Piece = animated(StaticPiece);

export default Pieces;
