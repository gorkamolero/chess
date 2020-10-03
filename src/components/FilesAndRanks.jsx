import React from 'react';
import styled from 'styled-components';
import { Cell } from 'styled-css-grid';
import { FlexBox } from 'react-styled-flex';
import { Files, Ranks } from 'helpers/constants';

const Parent = styled(Cell)`
  opacity: 0.4;
  &:hover {
    opacity: 0.8;
  }
`;

const Indicator = styled(FlexBox)`
  width: 100%;
  height: 100%;
  padding: 6px 12px;
  font-size: 60%;
  pointer-events: none;
`;

export const BoardFiles = () => {
  return Files.map((file) => (
    <Parent area={`${file}1`} width={1} height={1}>
      <Indicator alignItems='flex-end' justifyContent='flex-end'>
        <h2>{file.toUpperCase()}</h2>
      </Indicator>
    </Parent>
  ));
};

export const BoardRanks = () => {
  return Ranks.map((rank) => (
    <Parent area={`a${rank}`} width={1} height={1}>
      <Indicator alignItems='flex-start' justifyContent='flex-start'>
        <h2>{rank}</h2>
      </Indicator>
    </Parent>
  ));
};
