import React from 'react';
import Pawn from 'components/Pawn';
import { Files, Ranks, isAdjacentFile, initialRank } from 'helpers/constants';

export const GameContext = React.createContext(null);
export const useGame = () => React.useContext(GameContext);

const getSquare = ({ file, rank }) => file + rank;
const getRank = (square) => Number(square.split('')[1]);
const getFile = (square) => square.split('')[0];

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

export const Game = ({ children }) => {
  const [game, setGame] = React.useState([
    {
      Piece: Pawn,
      type: 'pawn',
      file: 'c',
      rank: 7,
      colour: 'black',
      id: 0,
    },
  ]);

  const [selectedSquare, setSelectedSquare] = React.useState(null);
  const toggleSelectedSquare = (sq) =>
    setSelectedSquare(selectedSquare === sq ? null : sq);

  const [selectedPiece, setSelectedPiece] = React.useState(null);
  const setSelectedPieceByID = (id) => {
    if (!!selectedSquare) setSelectedSquare(null);
    if (selectedPiece && selectedPiece.id === id) setSelectedPiece(null);
    else setSelectedPiece(game.find((piece) => piece.id === id));
  };

  const [legalMoves, setLegalMoves] = React.useState([]);

  const getLegalMoves = ({ game, piece }) => {
    if (piece.type === 'pawn') {
      const legalMoves = [];
      const initRank = initialRank.pawn[piece.colour];
      const rankExists = (rank) => Ranks.includes(rank);
      const rankIsBlocked = (sq) =>
        game.find((other) => {
          return getSquare(other) === sq;
        });

      const findForward = () => {
        // 1 Square
        const nextRank =
          piece.colour === 'white' ? piece.rank + 1 : piece.rank - 1;

        // If next rank actually exists!
        if (rankExists(nextRank) && !rankIsBlocked(piece.file + nextRank)) {
          legalMoves.push(`${piece.file}${nextRank}`);
        }

        // 2 Squares
        const torpedo =
          piece.colour === 'white' ? piece.rank + 2 : piece.rank - 2;

        if (piece.rank === initRank && !rankIsBlocked(piece.file + torpedo)) {
          legalMoves.push(`${piece.file}${torpedo}`);
        }
      };

      const findCapturesCaptures = () => {
        // Find other pieces
        game
          .filter((p) => p.id !== piece.id)
          .forEach((other) => {
            const isNextRank =
              piece.colour === 'white'
                ? piece.rank + 1 === other.rank
                : piece.rank - 1 === other.rank;

            if (
              // If they're in capturable positions...
              isAdjacentFile(piece.file, other.file) &&
              isNextRank
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

  // Setting legal moves on init
  React.useEffect(() => {
    if (!selectedPiece) return;
    const legalMoves = getLegalMoves({ game, piece: selectedPiece });
    setLegalMoves(legalMoves);
  }, [selectedPiece, game]);

  // Moving a piece
  React.useEffect(() => {
    if (!selectedPiece || !selectedSquare) return;

    if (legalMoves.includes(selectedSquare)) {
      let newGame = [...game];

      // Capturing
      if (game.find((piece) => getSquare(piece) === selectedSquare)) {
        newGame = newGame.filter(
          (piece) => getSquare(piece) !== selectedSquare
        );
        // console.log('Captures, captures', newGame);
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
      // console.log('Moving', newGame);

      setGame(newGame);
      setSelectedPiece(null);
      setSelectedSquare(null);
    } else {
      setSelectedPiece(null);
    }
  }, [selectedSquare, selectedPiece, game, legalMoves]);

  const [dragging, setDragging] = React.useState(false);

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
        dragging,
        setDragging,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
