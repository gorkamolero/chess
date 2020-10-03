import React from 'react';
import { Grid, Cell } from 'styled-css-grid';
import { MasterNumber, Files, Ranks } from 'helpers/constants';
import { BoardContainer, Board, SquareItem } from 'styles/StyledComps';
import useDebouncedResizeObserver from 'helpers/useDebouncedResizeObserver';

const Square = ({ rank, file, position, width }) => {
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

    console.log(position, x, y, width);

    return { width, x, y };
  };

  return (
    <Cell height={1} width={1}>
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
  return (
    <BoardContainer>
      <Board className='board' ref={ref}>
        <Grid
          width='100%'
          height='100%'
          rows={'repeat(8, 1fr)'}
          columns={'repeat(8, 1fr)'}
          gap={0}
        >
          {Ranks.reverse().map((rank) =>
            Files.map((file) => (
              <Square
                rank={rank}
                file={file}
                position={`${file}${rank}`}
                width={width}
              />
            ))
          )}
        </Grid>
      </Board>
    </BoardContainer>
  );
};

export default ChessBoard;
