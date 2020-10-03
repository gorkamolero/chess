import React from 'react';
import GlobalStyles from 'styles/GlobalStyles';
import 'styles/Fonts.css';
import { Game } from 'Game';
import { Stage } from 'styles/StyledComps';
import ChessBoard from 'components/ChessBoard';
import Pieces from 'components/Pieces';

function App() {
  return (
    <Game>
      <Stage>
        <GlobalStyles />
        <ChessBoard>
          <Pieces />
        </ChessBoard>
      </Stage>
    </Game>
  );
}

export default App;
