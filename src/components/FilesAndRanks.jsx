import React from 'react';
import { Files, Ranks } from 'helpers/constants';
import { IndicatorParent, Indicator } from 'styles/StyledComps';

export const BoardFiles = () => {
  return Files.map((file) => (
    <IndicatorParent key={file} area={`${file}1`} width={1} height={1}>
      <Indicator alignItems='flex-end' justifyContent='flex-end'>
        <h2>{file.toUpperCase()}</h2>
      </Indicator>
    </IndicatorParent>
  ));
};

export const BoardRanks = () => {
  return Ranks.map((rank) => (
    <IndicatorParent key={rank} area={`a${rank}`} width={1} height={1}>
      <Indicator alignItems='flex-start' justifyContent='flex-start'>
        <h2>{rank}</h2>
      </Indicator>
    </IndicatorParent>
  ));
};
