import styled from 'styled-components';
import { Cell } from 'styled-css-grid';
import { FlexBox } from 'react-styled-flex';
import WoodLight from 'assets/WoodLight.jpg';
import WoodDark from 'assets/WoodDark.jpg';
import WoodFrame from 'assets/WoodFrame.jpg';

export const breakpoint = '768px';

export const Stage = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
  padding: 6vh 6vw;

  @media (max-width: ${breakpoint}) {
    flex-direction: column;
    padding: 3vh 3vw;
    justify-content: flex-start;
  }
`;

export const BoardContainer = styled.div`
  /* flex: 1; */
  width: 100%;
  min-width: 320px;
  max-width: 800px;
  &:after {
    content: '';
    display: block;
    padding-bottom: 100%;
  }
  position: relative;
  border: 8px solid rgba(0, 0, 0);
  border-image: url(${WoodFrame}) 100 100 repeat;
  box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px,
    rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px,
    rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
`;

export const Board = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url(${WoodLight});
  background-size: cover;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 1) 0px -12px 30px,
    rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px,
    rgba(0, 0, 0, 0.09) 0px -3px 5px;
`;

export const SquareItem = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5em;
  position: relative;

  ${(props) =>
    props.colour === 'black' &&
    `&:before {
      content: '';
      background-image: url(${WoodDark});
      background-size: ${props.backgroundPosition.width}px ${props.backgroundPosition.width}px;
      background-position: -${props.backgroundPosition.x}px -${props.backgroundPosition.y}px;
      position: absolute;
      top: 0; right: 0; bottom: 0; left: 0;
      width: 100%; height: 100%;
      opacity: .65;
    }`};

  ${(props) =>
    props.selected ||
    (props.selectedPiece &&
      `&:after {
      content: '';
      background: var(--gold);
      position: absolute;
      top: 0; right: 0; bottom: 0; left: 0;
      width: 100%; height: 100%;
      opacity: .65;
    }`)};
`;

export const IndicatorParent = styled(Cell)`
  opacity: 0.4;
  &:hover {
    opacity: 0.8;
  }
`;

export const Indicator = styled(FlexBox)`
  width: 100%;
  height: 100%;
  padding: 6px 12px;
  font-size: 60%;
  pointer-events: none;
  user-select: none;
`;

export const PieceContainer = styled(Cell)`
  display: flex;
  align-items: stretch;
  justify-content: stretch;
  position: relative;
  transition: transform 0.15s cubic-bezier(0.45, 0, 0.55, 1);
  ${(selected) =>
    selected &&
    `&:after {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: var(--gold);
    }`}
  ${({ isDragging, selected }) =>
    isDragging && !selected && `pointer-events: none;`};
  ${({ selected }) => `
    z-index: ${selected ? 2 : 1};
  `};
`;

export const PieceUI = styled.div`
  width: 100%;
  height: 100%;
  background-size: 100%;
  background-position: center center;
  background-repeat: no-repeat;
  cursor: pointer;
  ${({ piece, selected, isDragging }) => `
    background-image: url(${piece});
    background-color: ${selected ? 'var(--gold)' : 'transparent'};
    opacity: ${isDragging ? '.5' : 1};
    z-index: ${selected ? 2 : 1};
  `};
  z-index: 1;
`;
// Maybe: transform: scale(${isDragging ? 1.1 : 1});

export const MoveOverlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.5);
  background: ${({ legal }) => (legal ? 'var(--gold)' : 'var(--error)')};
`;
