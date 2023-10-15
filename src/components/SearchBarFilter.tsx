import React, { useContext } from 'react';
import SearchContext from '../contexts/SearchContext';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import styled from 'styled-components';

const StyledSearchBarFilterContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export default function SearchBarFilter() {
  const {
    setLostItem,
    turnedOnInput,
    setTurnedOnInput,
    inputValue,
    setInputValue,
    dateInputValue,
    setDateInputValue,
  } = useContext(SearchContext)!;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleDateInputChange = (newDate: Dayjs | null) => {
    setDateInputValue(newDate);
  };

  const handleFilterButtonClick = () => {
    if (turnedOnInput === null) {
      throw new Error('TypeError: variable turnedOnInput is null.');
    } else if (turnedOnInput === 'date') {
      const dateInputString =
        dateInputValue && dateInputValue.format('YYYY/MM/DD');

      setLostItem((lostItem) => ({
        ...lostItem,
        [turnedOnInput]: dateInputString,
      }));

      setTurnedOnInput(null);
      setInputValue('');
    } else {
      setLostItem((lostItem) => ({
        ...lostItem,
        [turnedOnInput]: inputValue,
      }));
      setTurnedOnInput(null);
      setInputValue('');
    }
  };

  if (turnedOnInput === 'date') {
    return (
      <StyledSearchBarFilterContainer>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="분실 날짜"
            value={dateInputValue}
            onChange={handleDateInputChange}
            format={'YYYY/MM/DD'}
          />
        </LocalizationProvider>
        <button type="button" onClick={handleFilterButtonClick}>
          ✅
        </button>
      </StyledSearchBarFilterContainer>
    );
  }
  if (typeof inputValue !== 'string')
    throw new Error('TypeError, check the type of inputValue again.');
  return (
    <>
      {turnedOnInput && (
        <div>
          <input
            type="text"
            value={inputValue}
            placeholder={`${turnedOnInput}을 입력하세요`}
            onChange={handleInputChange}
          />
          <button type="button" onClick={handleFilterButtonClick}>
            ✅
          </button>
        </div>
      )}
    </>
  );
}
