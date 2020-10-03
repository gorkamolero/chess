import React from 'react';
import GlobalStyles from 'styles/GlobalStyles';
import 'styles/Fonts.css';
import { Game } from 'Game';
import { Stage } from 'styles/StyledComps';
import ChessBoard from 'components/ChessBoard';
import Pieces from 'components/Pieces';
import Controls from 'components/Controls';

function App() {
  return (
    <Game>
      <Stage>
        <GlobalStyles />
        <ChessBoard>
          <Pieces />
        </ChessBoard>
        <Controls />
      </Stage>
    </Game>
  );
}

export default App;
