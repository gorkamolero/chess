import React from 'react';
import { Grid, Cell } from 'styled-css-grid';
import { Files, Ranks } from 'helpers/constants';
import { BoardContainer, Board, SquareItem } from 'styles/StyledComps';
import useDebouncedResizeObserver from 'helpers/useDebouncedResizeObserver';
import { useGame, useSquareColour } from 'Game';
import { BoardFiles, BoardRanks } from 'components/FilesAndRanks.jsx';

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
  const { selectedSquare, setSelectedSquare } = useGame();
  const { backgroundPosition, colour } = useSquareColour({ rank, file, width });

  return (
    <Cell height={1} width={1} area={square}>
      <SquareItem
        onClick={() => setSelectedSquare(square)}
        backgroundPosition={backgroundPosition}
        colour={colour}
        selected={selectedSquare === square}
        data-square={square}
      >
        {selectedSquare === square && square}
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
        <Grid
          width='100%'
          height='100%'
          rows={'repeat(8, 1fr)'}
          columns={'repeat(8, 1fr)'}
          gap={'0'}
          areas={boardPositions}
        >
          <BoardRanks />
          <BoardFiles />
          <Squares files={Files} ranks={reversedRanks} width={width} />
          {children}
        </Grid>
      </Board>
    </BoardContainer>
  );
};

export default ChessBoard;
