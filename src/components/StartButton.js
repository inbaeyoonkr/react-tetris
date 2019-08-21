import React from 'react';
import { StyledStartButton } from '../components/styles/StyledStartButton';

const StartButton = ({ callBack }) => (
  <StyledStartButton onClick={callBack}>Start Game</StyledStartButton>
);

export default StartButton;
