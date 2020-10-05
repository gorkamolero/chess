import React from 'react';
import { findAdjacentFiles, pieceRules } from 'helpers/constants';
import { getSquare, getRank, getFile } from 'helpers/utils';

// We're going to use some React magic here
export const GameContext = React.createContext(null);
export const useGame = () => React.useContext(GameContext);

/*

Game is our most important component. It encapsulates the rules

*/

export const Game = ({ children }) => {
  // Here we declare the initial positions on the board
  const [game, setGame] = React.useState([
    {
      type: 'pawn',
      file: 'c',
      rank: 7,
      colour: 'black',
      id: 0,
    },
  ]);

  // Selecting pieces
  const [selectedPiece, setSelectedPiece] = React.useState(null);
  const setSelectedPieceByID = (id) => {
    if (!!selectedSquare) setSelectedSquare(null);
    if (selectedPiece && selectedPiece.id === id) setSelectedPiece(null);
    else setSelectedPiece(game.find((piece) => piece.id === id));
  };

  // Selecting squares
  const [selectedSquare, setSelectedSquare] = React.useState(null);
  const toggleSelectedSquare = (sq) =>
    setSelectedSquare(selectedSquare === sq ? null : sq);

  const legalMoves = useLegalMoves({ game, selectedPiece });

  const movePiece = usePieceMoves({
    game,
    setGame,
    selectedPiece,
    selectedSquare,
  });

  const [dragging, setDragging] = React.useState(false);
  const [moving, setMoving] = React.useState(false);

  // Moving a piece
  React.useEffect(() => {
    if (!selectedPiece || !selectedSquare || !!moving) return;

    if (legalMoves.includes(selectedSquare)) {
      movePiece({ game, selectedPiece, selectedSquare, moving });
      setSelectedPiece(null);
      setSelectedSquare(null);
      // setMoving(false);
    } else {
      setSelectedPiece(null);
    }
  }, [selectedSquare, selectedPiece, game, legalMoves, movePiece]);

  return (
    <GameContext.Provider
      value={{
        game,
        setGame,
        selectedSquare,
        setSelectedSquare: toggleSelectedSquare,
        selectedPiece,
        forceMovePiece: setSelectedPiece,
        movePiece,
        setPiece: setSelectedPieceByID,
        legalMoves,
        dragging,
        setDragging,
        moving,
        setMoving,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

const usePieceMoves = ({
  game,
  setGame,
  selectedPiece,
  selectedSquare,
  moving,
}) => {
  // Moving pieces
  const movePiece = ({ game, selectedPiece, selectedSquare, moving }) => {
    // Moving requires a selected piece and a selected square
    const movedPiece = {
      ...selectedPiece,
      square: selectedSquare,
      rank: getRank(selectedSquare),
      file: getFile(selectedSquare),
    };

    console.log(game, selectedPiece, movedPiece);

    // Construct the new position
    const newGame = [...game].map((piece) =>
      piece.id === selectedPiece.id ? movedPiece : piece
    );

    setGame(newGame);
  };

  // Captures, captures!
  const moveOrCapture = ({ game, selectedPiece, selectedSquare }) => {
    // If some piece occupies the target square...
    if (game.find((piece) => getSquare(piece) === selectedSquare)) {
      //...we get rid of it
      const newGame = [...game].filter(
        (piece) => getSquare(piece) !== selectedSquare
      );

      // Then move
      movePiece({
        game: newGame,
        selectedPiece,
        selectedSquare,
        moving,
      });
    } else {
      movePiece({ game, selectedPiece, selectedSquare, moving });
    }
  };

  return moveOrCapture;
};

const useLegalMoves = ({ game, selectedPiece }) => {
  const [legalMoves, setLegalMoves] = React.useState([]);

  const getLegalMoves = ({ game, piece }) => {
    const initRank = pieceRules[piece.type].initialRank[piece.colour];
    const rules = pieceRules[piece.type];

    const isSquareOccupied = (sq) => {
      return game.find((somePiece) => somePiece.file + somePiece.rank === sq);
    };

    const canCapture = (piece, sq) => {
      return game.find(
        (somePiece) =>
          somePiece.file + somePiece.rank === sq &&
          piece.colour !== somePiece.colour
      );
    };

    // Calculate moving or ccapturing: abstracted so it could be used in any piece.
    const possibleMoves = (rules, piece) => {
      let targetRanks = [];
      if (rules.direction === 'forward' || rules.direction === 'diagonal') {
        for (let i = 1; i <= rules.squares; i++) {
          if (piece.colour === 'white') targetRanks.push(piece.rank + i);
          else targetRanks.push(piece.rank - i);
        }

        if (rules.direction === 'forward') {
          return targetRanks.map((rank) => piece.file + rank);
        }

        if (rules.direction === 'diagonal') {
          const captures = [];
          targetRanks.forEach((rank, i) =>
            findAdjacentFiles(piece.file).forEach((file) =>
              captures.push(file + rank)
            )
          );
          return captures;
        }
      } else {
        console.log('No moves');
      }
    };

    const findActualMoves = (piece) => {
      const moves = possibleMoves(rules.move, piece).filter(
        (move) => !isSquareOccupied(move)
      );

      const captures = possibleMoves(rules.captures, piece).filter(
        (move) => isSquareOccupied(move) && canCapture(piece, move)
      );

      const actualMoves = [...moves, ...captures];

      return actualMoves;
    };

    // Pawn case
    if (piece.type === 'pawn') {
      // Special rule: Torpedo time!
      rules.move.squares = piece.rank === initRank ? 2 : 1;
    }

    return findActualMoves(piece);
  };

  // Setting legal moves whenever the position or selected piece changes
  React.useEffect(() => {
    if (!selectedPiece) return;
    const legalMoves = getLegalMoves({ game, piece: selectedPiece });
    setLegalMoves(legalMoves);
  }, [selectedPiece, game]);

  return legalMoves;
};
