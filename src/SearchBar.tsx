import React, { useContext } from 'react';
import styled from 'styled-components';
import SearchContext from './SearchContext';

const SytledSearchBarContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const StyledSearchBarList = styled.ul`
  display: flex;
  width: 80%;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  border-radius: 50px;
  height: 80px;
`;

const StyledSearchBarItem = styled.button`
  border-right: 1px solid #c2c2c2;
  flex-grow: 1;

  &:first-child {
    border-top-left-radius: 50px;
    border-bottom-left-radius: 50px;
  }

  &:last-child {
    border-right: none;
    border-top-right-radius: 50px;
    border-bottom-right-radius: 50px;
  }
`;

const StyledMainText = styled.div`
  font-weight: 700;
`;

export default function SearchBar() {
  const { lostItem, setTurnedOnInput } = useContext(SearchContext)!;

  const handleOptionButtonClick = (option: string) => {
    setTurnedOnInput(option);
  };

  return (
    <SytledSearchBarContainer>
      <StyledSearchBarList>
        <StyledSearchBarItem
          type="button"
          onClick={() => handleOptionButtonClick('name')}
        >
          <span>
            <StyledMainText>분실제품명</StyledMainText>
            {lostItem.name || <div>잃어버린 물건의 이름은 무엇인가요?</div>}
          </span>
        </StyledSearchBarItem>
        <StyledSearchBarItem
          type="button"
          onClick={() => handleOptionButtonClick('date')}
        >
          <StyledMainText>분실날짜</StyledMainText>
          {lostItem.date || <div>언제 잃어버리셨나요?</div>}
        </StyledSearchBarItem>
        <StyledSearchBarItem
          type="button"
          onClick={() => handleOptionButtonClick('place')}
        >
          <StyledMainText>분실지역</StyledMainText>
          {lostItem.place || <div>어디서 잃어버리셨나요?</div>}
        </StyledSearchBarItem>
        <StyledSearchBarItem
          type="button"
          onClick={() => handleOptionButtonClick('owner')}
        >
          <StyledMainText>관할구청</StyledMainText>
          {lostItem.office || <div>어디서 보관하고 있을까요?</div>}
        </StyledSearchBarItem>
        <StyledSearchBarItem type="button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
          </svg>
        </StyledSearchBarItem>
      </StyledSearchBarList>
    </SytledSearchBarContainer>
  );
}
