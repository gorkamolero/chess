import React from 'react';
import styled from 'styled-components';

import ChessBoard from 'components/ChessBoard';

const Stage = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10vh 10vw;
`;

const Chess = () => {
  return (
    <Stage>
      <ChessBoard />
    </Stage>
  );
};

export default Chess;
