import React, { useContext } from 'react';
import styled from 'styled-components';
import SearchContext from '../contexts/SearchContext';
import { useNavigate } from 'react-router-dom';
import SearchBarFilter from './SearchBarFilter';
import withConditionalWrapper from '../utils/withConditionalWrapper';
import ToggleButton from './ToggleButton';

interface SearchBarProps {
  width?: string; // justifyContent 속성은 선택적으로 받아오도록 정의
}

const StyledSearchBarContainer = styled.div<SearchBarProps>`
  display: flex;
  width: ${(props) => (props.width ? props.width : '100%')};
  justify-content: 'center';
  align-items: center;
`;

const StyledSearchBarList = styled.ul`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  border-radius: 50px;
  height: 80px;
`;

const StyledSearchBarItem = styled.span`
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

const StyledToggleItem = styled.span`
  display: flex;
  flex-direction: row;
`;

const StyledSearchBarButton = styled.button`
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

enum SearchKey {
  NAME = 'name',
  DATE = 'date',
  PLACE = 'place',
  OFFICE = 'office',
}

const searchItems = [
  {
    key: SearchKey.NAME,
    mainText: '분실제품명',
    placeholder: '잃어버린 물건의 이름은 무엇인가요?',
  },
  {
    key: SearchKey.DATE,
    mainText: '분실날짜',
    placeholder: '언제 잃어버리셨나요?',
  },

  {
    key: SearchKey.PLACE,
    mainText: '분실지역',
    placeholder: '어디서 잃어버리셨나요?',
  },
  {
    key: SearchKey.OFFICE,
    mainText: '관할구청',
    placeholder: '어디서 보관하고 있을까요?',
  },
];

export default function SearchBar({ width }: SearchBarProps) {
  const { lostItem, turnedOnInput, setTurnedOnInput } =
    useContext(SearchContext)!;
  const navigate = useNavigate();

  const navigateToLost = () => {
    const {
      name: item,
      date,
      place: location_detail,
      office,
      isLost,
    } = lostItem;
    const entries = Object.entries({ item, date, location_detail, office });
    const filteredEntries = entries.filter(([value]) => value !== null) as [
      string,
      string,
    ][];
    const queryString = new URLSearchParams(filteredEntries).toString();
    if (isLost) {
      navigate(`/lost?${queryString}`);
    } else {
      navigate(`/found?${queryString}`);
    }
  };

  const handleOptionButtonClick = (option: string) => {
    setTurnedOnInput(option);
  };

  const SearchBarContent = searchItems.map((item) => {
    const Child = (
      <span>
        <StyledMainText>{item.mainText}</StyledMainText>
        {turnedOnInput === item.key ? (
          <SearchBarFilter />
        ) : (
          lostItem[item.key] || <div>{item.placeholder}</div>
        )}
      </span>
    );

    return withConditionalWrapper(
      StyledSearchBarItem,
      StyledSearchBarButton,
      Child,
      item.key === turnedOnInput,
      item.key === turnedOnInput
        ? {}
        : {
            key: item.key,
            type: 'button',
            onClick: () => handleOptionButtonClick(item.key),
          },
    );
  });

  return (
    <StyledSearchBarContainer width={width}>
      <StyledSearchBarList>
        {SearchBarContent}
        <StyledSearchBarItem>
          <StyledToggleItem>
            습득물 찾기
            <ToggleButton />
            분실물 찾기
          </StyledToggleItem>
        </StyledSearchBarItem>
        <StyledSearchBarButton type="button" onClick={navigateToLost}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
          >
            <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
          </svg>
        </StyledSearchBarButton>
      </StyledSearchBarList>
    </StyledSearchBarContainer>
  );
}
