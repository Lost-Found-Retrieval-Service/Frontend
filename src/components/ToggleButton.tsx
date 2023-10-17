import React, { useContext } from 'react';
import styled from 'styled-components';
import SearchContext from '../contexts/SearchContext';
import { SearchContextType } from '../providers/SearchProvider';

const SwitchLabel = styled.label`
  position: relative;
  display: flex;
  /* width: 81px; */
  height: 34px;
  min-width: 60px;
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: '';
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
    border-radius: 100%;
  }
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  display: none;

  &:checked + ${Slider} {
    background-color: #4caf50;
  }

  &:checked + ${Slider}:before {
    transform: translateX(26px);
  }
`;

export default function ToggleButton() {
  const { lostItem, setLostItem } = useContext<SearchContextType | null>(
    SearchContext,
  )!;
  const { isLost } = lostItem;
  return (
    <SwitchLabel>
      <Checkbox
        checked={isLost}
        onChange={() =>
          setLostItem(({ isLost, ...otherProperties }) => ({
            ...otherProperties,
            isLost: !isLost,
          }))
        }
      />
      <Slider />
    </SwitchLabel>
  );
}
