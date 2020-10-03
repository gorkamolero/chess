export const pieceColour = (colour, white, black) =>
  colour === 'white' ? white : black;

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
