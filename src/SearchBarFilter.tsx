import React, { useContext } from 'react';
import SearchContext from './SearchContext';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function SearchBarFilter() {
  const {
    setLostItem,
    turnedOnInput,
    setTurnedOnInput,
    inputValue,
    setInputValue,
    day,
    setDay,
  } = useContext(SearchContext)!;

  console.log(day);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleFilterButtonClick = () => {
    if (turnedOnInput !== null) {
      setLostItem((lostItem) => ({
        ...lostItem,
        [turnedOnInput]: inputValue,
      }));
      setTurnedOnInput(null);
    }
  };
  if (turnedOnInput === 'date') {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="분실 날짜"
          value={day}
          onChange={(newDate) => {
            if (newDate === null) {
              throw new Error('???');
            }
            setDay(newDate);
          }}
        />
      </LocalizationProvider>
    );
  }

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
            클릭
          </button>
        </div>
      )}
    </>
  );
}
