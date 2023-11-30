import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import SearchContext from '../contexts/SearchContext';
import { useNavigate } from 'react-router-dom';
import SearchBarFilter from './SearchBarFilter';
import withConditionalWrapper from '../utils/withConditionalWrapper';
import ToggleButton from './ToggleButton';
import dayjs from 'dayjs';
import { LostItem } from '../providers/SearchProvider';
import axios from 'axios';
import ModalSearchBarFilter from './ModalSearchBarFilter';

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
  EMAIL = 'email',
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
  {
    key: SearchKey.EMAIL,
    mainText: '이메일',
    placeholder: '메일 주소를 적어주세요.',
  },
];

export default function ModalSearchBar({ width }: SearchBarProps) {
  const [lostItem, setLostItem] = useState<
    Omit<LostItem, 'isLost'> & { email: string | null }
  >({
    name: null,
    date: null,
    place: null,
    office: null,
    email: null,
  });
  const [turnedOnInput, setTurnedOnInput] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const [dateInputValue, setDateInputValue] = useState<dayjs.Dayjs | null>(
    dayjs(),
  );

  const registerNotification = () => {
    // const fetchData = async () => {
    //   const { name: item, date, place: location_detail, office, email } = lostItem;
    //   try {
    //     axios.post('/lost', {
    //       baseURL: process.env.REACT_APP_API_URL,
    //       params: {
    //         item,
    //         date,
    //         location_detail,
    //         office,
    //         email,
    //       },
    //     });
    //   } catch (error) {
    //     console.error('API 호출 오류:', error);
    //   }
    // };
    // fetchData();
  };

  const handleOptionButtonClick = (option: string) => {
    setTurnedOnInput(option);
  };

  const SearchBarContent = searchItems.map((item) => {
    const Child = (
      <span key={item.key}>
        <StyledMainText>{item.mainText}</StyledMainText>
        {turnedOnInput === item.key ? (
          <ModalSearchBarFilter
            setLostItem={setLostItem}
            turnedOnInput={turnedOnInput}
            setTurnedOnInput={setTurnedOnInput}
            inputValue={inputValue}
            setInputValue={setInputValue}
            dateInputValue={dateInputValue}
            setDateInputValue={setDateInputValue}
          />
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
        <StyledSearchBarButton type="button" onClick={registerNotification}>
          🔔
        </StyledSearchBarButton>
      </StyledSearchBarList>
    </StyledSearchBarContainer>
  );
}
