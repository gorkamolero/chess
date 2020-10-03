export const Ranks = [1, 2, 3, 4, 5, 6, 7, 8];
export const Files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
export const nextFile = (file) => Files[Files.indexOf(file) + 1];
export const prevFile = (file) => Files[Files.indexOf(file) - 1];
export const isAdjacentFile = (ourFile, otherFile) =>
  [nextFile(ourFile), prevFile(ourFile)].includes(otherFile);
export const initialRank = {
  pawn: {
    white: 2,
    black: 7,
  },
};
export const ItemTypes = {
  PAWN: 'Pawn',
};
