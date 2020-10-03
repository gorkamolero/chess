import styled from 'styled-components';
import { Cell } from 'styled-css-grid';
import { FlexBox } from 'react-styled-flex';
import WoodLight from 'assets/WoodLight.jpg';
import WoodDark from 'assets/WoodDark.jpg';
import WoodFrame from 'assets/WoodFrame.jpg';

export const Stage = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10vh 10vw;
`;

export const BoardContainer = styled.div`
  width: 100%;
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
    props.selected &&
    `&:after {
      content: '';
      background: rgba(255, 255, 255, .5);
      position: absolute;
      top: 0; right: 0; bottom: 0; left: 0;
      width: 100%; height: 100%;
      opacity: .65;
    }`};
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
`;

export const Piece = styled.div`
  width: 100%;
  height: 100%;
  background-size: 100%;
  background-position: center center;
  background-repeat: no-repeat;
  ${({ piece, selected }) => `
    background-image: url(${piece});
    background-color: ${selected ? 'rgba(255, 255, 255, .6)' : 'transparent'};
  `}
  z-index: 1;
`;
