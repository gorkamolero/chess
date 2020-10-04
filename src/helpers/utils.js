import { Files, Ranks } from 'helpers/constants';

export const getSquare = ({ file, rank }) => file + rank;
export const getRank = (square) => Number(square.split('')[1]);
export const getFile = (square) => square.split('')[0];
export const rankExists = (rank) => Ranks.includes(rank);
export const targetRankIsBlocked = (pieces, square) =>
  pieces.find((other) => getSquare(other) === square);

export const pieceColour = (colour, white, black) =>
  colour === 'white' ? white : black;

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
export const shuffleArray = (a) => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

/* 
export function flip(elements, changeFunc, vars) {
  elements = gsap.utils.toArray(elements);
  vars = vars || {};
  let tl = gsap.timeline({
      onComplete: vars.onComplete,
      delay: vars.delay || 0,
    }),
    bounds = elements.map((el) => el.getBoundingClientRect()),
    copy = {},
    p;
  elements.forEach((el) => {
    el._flip && el._flip.progress(1);
    el._flip = tl;
  });
  changeFunc();
  for (p in vars) {
    p !== 'onComplete' && p !== 'delay' && (copy[p] = vars[p]);
  }
  copy.x = (i, element) =>
    '+=' + (bounds[i].left - element.getBoundingClientRect().left);
  copy.y = (i, element) =>
    '+=' + (bounds[i].top - element.getBoundingClientRect().top);
  return tl.from(elements, copy);
}
*/
