import React from 'react';
import { DndProvider } from 'react-dnd';
import { useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Grid, Cell } from 'styled-css-grid';
import { Files, Ranks } from 'helpers/constants';
import { useGame } from 'Game';
import { useSquareColour } from 'helpers/utils';
import {
  BoardContainer,
  Board,
  SquareItem,
  MoveOverlay,
} from 'styles/StyledComps';
import useDebouncedResizeObserver from 'helpers/useDebouncedResizeObserver';
import { BoardFiles, BoardRanks } from 'components/FilesAndRanks.jsx';
import { pieces } from 'helpers/constants';

const Squares = ({ ranks, files, width }) => {
  return ranks.map((rank) =>
    files.map((file) => {
      const square = `${file}${rank}`;
      return (
        <Square
          square={square}
          key={square}
          rank={rank}
          file={file}
          width={width}
        />
      );
    })
  );
};

const Square = ({ square, rank, file, width }) => {
  const {
    selectedSquare,
    toggleSelectedSquare,
    legalMoves,
    selectedPiece,
    moving,
    setMoving,
  } = useGame();

  // Setting BG Colour for squares
  const { backgroundPosition, colour } = useSquareColour({ rank, file, width });

  // Dragging & Dropping
  const [{ isOver }, drop] = useDrop({
    accept: pieces.PAWN,
    drop: () => {
      setMoving({ rank, file });
      toggleSelectedSquare(square);
    }, // Move pawn
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const selectSquare = () => {
    toggleSelectedSquare(square);
    if (selectedPiece) {
      setMoving({ rank, file });
    }
  };

  return (
    <Cell height={1} width={1} area={square}>
      <SquareItem
        ref={drop}
        data-square={square}
        onClick={selectSquare}
        backgroundPosition={backgroundPosition}
        colour={colour}
        selected={selectedSquare === square}
        selectedPiece={
          !moving &&
          selectedPiece &&
          selectedPiece.file + selectedPiece.rank === square
        }
      >
        {!selectedPiece && selectedSquare === square && square}
        {isOver && <MoveOverlay legal={legalMoves.includes(square)} />}
      </SquareItem>
    </Cell>
  );
};

const ChessBoard = ({ children }) => {
  // We need ranks in the direction of the browse
  const reversedRanks = React.useMemo(() => Ranks.slice().reverse(), []);

  // The 64 squares, in strings, for the Grid
  const boardPositions = React.useMemo(() => {
    const board = reversedRanks.map((r) =>
      Files.map((f) => `${f}${r}`).join(' ')
    );
    return board;
  }, [reversedRanks]);

  // We use this to calculate the UI of the board
  const { ref, width } = useDebouncedResizeObserver(500);

  return (
    <BoardContainer>
      <Board className='board' ref={ref}>
        <DndProvider backend={HTML5Backend}>
          <Grid
            width='100%'
            height='100%'
            rows={'repeat(8, 1fr)'}
            columns={'repeat(8, 1fr)'}
            gap={'0'}
            areas={boardPositions}
            className='chess-grid'
          >
            {/* Indicators */}
            <BoardRanks />
            <BoardFiles />

            {/* Squares */}
            <Squares files={Files} ranks={reversedRanks} width={width} />

            {/* Pieces */}
            {children}
          </Grid>
        </DndProvider>
      </Board>
    </BoardContainer>
  );
};

export default ChessBoard;
