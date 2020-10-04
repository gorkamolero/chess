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
import { ItemTypes } from 'helpers/constants';

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
    setSelectedSquare,
    legalMoves,
    movePiece,
    selectedPiece,
  } = useGame();
  const { backgroundPosition, colour } = useSquareColour({ rank, file, width });

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.PAWN,
    drop: () => {
      setSelectedSquare(square);
      movePiece({ ...selectedPiece, rank, file });
    }, // Move pawn
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <Cell height={1} width={1} area={square}>
      <SquareItem
        ref={drop}
        onClick={() => {
          setSelectedSquare(square);
        }}
        backgroundPosition={backgroundPosition}
        colour={colour}
        selected={selectedSquare === square}
        data-square={square}
      >
        {selectedSquare === square && square}
        {isOver && <MoveOverlay legalMove={legalMoves.includes(square)} />}
      </SquareItem>
    </Cell>
  );
};

const ChessBoard = ({ children }) => {
  const { ref, width } = useDebouncedResizeObserver(500);

  const reversedRanks = React.useMemo(() => Ranks.slice().reverse(), []);

  const boardPositions = React.useMemo(() => {
    const board = reversedRanks.map((r) =>
      Files.map((f) => `${f}${r}`).join(' ')
    );
    return board;
  }, [reversedRanks]);

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
            <BoardRanks />
            <BoardFiles />
            <Squares files={Files} ranks={reversedRanks} width={width} />
            {children}
          </Grid>
        </DndProvider>
      </Board>
    </BoardContainer>
  );
};

export default ChessBoard;
