import React from 'react';
import { Grid, Cell } from 'styled-css-grid';
import { MasterNumber, Files, Ranks } from 'helpers/constants';
import { BoardContainer, Board, SquareItem } from 'styles/StyledComps';
import useDebouncedResizeObserver from 'helpers/useDebouncedResizeObserver';
import Pawn from 'components/Pawn';

const Square = ({ area, rank, file, position, width }) => {
  /* eslint-disable eqeqeq */
  const getColour =
    (Ranks.indexOf(rank) % 2 == 0 && Files.indexOf(file) % 2 == 1) ||
    (Ranks.indexOf(rank) % 2 == 1 && Files.indexOf(file) % 2 == 0)
      ? 'white'
      : 'black';
  /* eslint-enable */

  const getBackgroundPosition = () => {
    const x = (width / 8) * Files.indexOf(file);
    const y = (width / 8) * Ranks.indexOf(rank);

    return { width, x, y };
  };

  return (
    <Cell height={1} width={1} area={area}>
      <SquareItem
        bgPosition={getBackgroundPosition()}
        style={{ backgroundPosition: getBackgroundPosition() }}
        colour={getColour}
        data-position={position}
      >
        {position}
      </SquareItem>
    </Cell>
  );
};

const ChessBoard = () => {
  const { ref, width } = useDebouncedResizeObserver(500);

  const reversedRanks = Ranks.slice().reverse();

  const boardPositions = React.useMemo(() => {
    const board = reversedRanks.map((r) =>
      Files.map((f) => `${f}${r}`).join(' ')
    );
    return board;
  });

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
          {reversedRanks.map((rank) =>
            Files.map((file) => (
              <Square
                area={`${file}${rank}`}
                key={`${file}${rank}`}
                rank={rank}
                file={file}
                position={`${file}${rank}`}
                width={width}
              />
            ))
          )}
          <Pawn area={'h5'} colour='white' />
        </Grid>
      </Board>
    </BoardContainer>
  );
};

export default ChessBoard;
