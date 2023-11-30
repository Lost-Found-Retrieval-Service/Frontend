import React, { ReactNode, useState } from 'react';
import SearchContext from '../contexts/SearchContext';
import dayjs, { Dayjs } from 'dayjs';

interface SearchProviderProps {
  children: ReactNode;
}

export type LostItem = {
  name: null | string;
  date: null | string;
  place: null | string;
  office: null | string;
  isLost: boolean;
};

export type SearchContextType = {
  lostItem: LostItem;
  setLostItem: React.Dispatch<React.SetStateAction<LostItem>>;
  turnedOnInput: null | string;
  setTurnedOnInput: React.Dispatch<React.SetStateAction<null | string>>;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  dateInputValue: null | Dayjs;
  setDateInputValue: React.Dispatch<React.SetStateAction<null | Dayjs>>;
};

export default function SearchProvider({ children }: SearchProviderProps) {
  const [lostItem, setLostItem] = useState<LostItem>({
    name: null,
    date: null,
    place: null,
    office: null,
    isLost: true,
  });
  const [turnedOnInput, setTurnedOnInput] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const [dateInputValue, setDateInputValue] = useState<dayjs.Dayjs | null>(
    dayjs(),
  );

  return (
    <SearchContext.Provider
      value={{
        lostItem,
        setLostItem,
        turnedOnInput,
        setTurnedOnInput,
        inputValue,
        setInputValue,
        dateInputValue,
        setDateInputValue,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
