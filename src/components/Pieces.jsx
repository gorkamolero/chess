import React from 'react';
import { pieces, getFileDiff, getSquare } from 'helpers/constants';
import { useDrag } from 'react-dnd';
import { useGame } from 'Game';
import { PieceContainer, PieceUI, MoveOverlay } from 'styles/StyledComps';
import WhitePawn from 'assets/wp.png';
import BlackPawn from 'assets/bp.png';
import { pieceColour, usePrevious } from 'helpers/utils';
import { useTransition, animated } from 'react-spring';

const Pieces = () => {
  const { game, moving, selectedPiece, legalMoves } = useGame();
  console.log('FROM GAME', game);
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

  const transitions = useTransition(
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

  console.log('ON PIECES', transitions);

  return (
    <>
      {transitions
        // .filter((item) => item.props.transform)
        .map(
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
    setSelectedSquare,
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
      console.log('DRAGGING');
      setDragging(true);
      setPiece(id);
    },
    isDragging: () => {},
    end: () => {
      setDragging(false);
    },
  });

  // Clicking
  const select = () => {
    if (selectedPiece) {
      setSelectedSquare(file + rank);
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
    console.log(' -> ');
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
        isDragging={isDragging}
        style={{ opacity: isDragging ? '.5' : 1 }}
      />
    </PieceContainer>
  );
};

const Piece = animated(StaticPiece);

export default Pieces;
