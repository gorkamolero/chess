import React from 'react';
import Pawn from 'components/Pawn';
import { Files, Ranks, isAdjacentFile } from 'helpers/constants';

export const GameContext = React.createContext(null);
export const useGame = () => React.useContext(GameContext);

const getSquare = ({ file, rank }) => file + rank;
const getRank = (square) => Number(square.split('')[1]);
const getFile = (square) => square.split('')[0];

function usePrevious(value) {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export const Game = ({ children }) => {
  const [game, setGame] = React.useState([
    {
      Piece: Pawn,
      file: 'd',
      rank: 2,
      colour: 'white',
      id: 0,
    },
    {
      Piece: Pawn,
      file: 'c',
      rank: 7,
      colour: 'black',
      id: 1,
    },
  ]);

  const [selectedSquare, setSelectedSquare] = React.useState(null);
  const toggleSelectedSquare = (sq) =>
    setSelectedSquare(selectedSquare === sq ? null : sq);

  const [selectedPiece, setSelectedPiece] = React.useState(null);
  const previousSelectedPiece = usePrevious(selectedPiece);
  const setSelectedPieceByID = (id) => {
    if (!!selectedSquare) setSelectedSquare(null);
    if (selectedPiece && selectedPiece.id === id) setSelectedPiece(null);
    else setSelectedPiece(game.find((piece) => piece.id === id));
  };

  const [legalMoves, setLegalMoves] = React.useState([]);

  const getLegalMoves = ({ game, piece, colour }) => {
    if (piece.Piece === Pawn) {
      const legalMoves = [];

      const findForward = () => {
        const nextRank = piece.rank + 1;

        // If next rank actually exists!
        if (Ranks.includes(nextRank))
          legalMoves.push(`${piece.file}${nextRank}`);
      };

      const findCapturesCaptures = () => {
        // Find other pieces
        game
          .filter((p) => p.id !== piece.id)
          .forEach((other) => {
            console.log(other);
            // console.log(isAdjacentFile(piece.file, other.file));
            if (
              // If they're in capturable positions...
              isAdjacentFile(piece.file, other.file) &&
              piece.rank + 1 === other.rank
            ) {
              legalMoves.push(other.file + other.rank);
            }
          });
      };

      findForward();
      findCapturesCaptures();

      return legalMoves;
    }
  };

  React.useEffect(() => {
    if (!selectedPiece) return;
    const legalMoves = getLegalMoves({ game, piece: selectedPiece });
    setLegalMoves(legalMoves);
  }, [selectedPiece]);

  // Moving a piece
  React.useEffect(() => {
    if (!selectedPiece || !selectedSquare) return;
    console.log(game);

    if (legalMoves.includes(selectedSquare)) {
      let newGame = [...game];

      // Capturing
      if (game.find((piece) => getSquare(piece) === selectedSquare)) {
        newGame = newGame.filter(
          (piece) => getSquare(piece) !== selectedSquare
        );
        console.log('Captures, captures', newGame);
      }

      // Moving
      newGame = newGame.map((piece) => {
        if (piece.id === selectedPiece.id) {
          const movedPiece = {
            ...selectedPiece,
            square: selectedSquare,
            rank: getRank(selectedSquare),
            file: getFile(selectedSquare),
          };
          return movedPiece;
        } else return piece;
      });
      console.log('Moving', newGame);

      setGame(newGame);
      setSelectedPiece(null);
      setSelectedSquare(null);
    } else {
      setSelectedPiece(null);
    }
  }, [selectedSquare, selectedPiece]);

  return (
    <GameContext.Provider
      value={{
        game,
        setGame,
        selectedSquare,
        setSelectedSquare: toggleSelectedSquare,
        selectedPiece,
        movePiece: setSelectedPiece,
        setPiece: setSelectedPieceByID,
        legalMoves,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useSquareColour = ({ rank, file, width }) => {
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

  return {
    colour: getColour,
    backgroundPosition: getBackgroundPosition(),
  };
};
