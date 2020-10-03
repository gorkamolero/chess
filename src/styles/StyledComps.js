import styled from 'styled-components';

import WoodLight from 'assets/WoodLight.jpg';
import WoodDark from 'assets/WoodDark.jpg';
import WoodFrame from 'assets/WoodFrame.jpg';

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

  ${(props) => props.colour === 'black' && 'position: relative;'}

  ${(props) => {
    if (props.colour === 'black')
      return `&:after {
        content: '';
        background-image: url(${WoodDark});
        background-size: ${props.bgPosition.width}px ${props.bgPosition.width}px;
        background-position: -${props.bgPosition.x}px -${props.bgPosition.y}px;
        position: absolute;
        top: 0; right: 0; bottom: 0; left: 0;
        width: 100%; height: 100%;
        opacity: .65;
      }`;
  }}
`;
