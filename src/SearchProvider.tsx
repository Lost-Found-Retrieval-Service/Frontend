import React, { ReactNode, useState } from 'react';
import SearchContext from './SearchContext';
import dayjs, { Dayjs } from 'dayjs';

interface SearchProviderProps {
  children: ReactNode;
}

type LostItem = {
  name: null | string;
  date: null | string;
  place: null | string;
  office: null | string;
};

export type SearchContextType = {
  lostItem: LostItem;
  setLostItem: React.Dispatch<React.SetStateAction<LostItem>>;
  turnedOnInput: null | string;
  setTurnedOnInput: React.Dispatch<React.SetStateAction<null | string>>;
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  day: dayjs.Dayjs;
  setDay: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>;
};

export default function SearchProvider({ children }: SearchProviderProps) {
  const [lostItem, setLostItem] = useState<LostItem>({
    name: null,
    date: null,
    place: null,
    office: null,
  });
  const [turnedOnInput, setTurnedOnInput] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const [day, setDay] = useState<Dayjs>(dayjs());

  return (
    <SearchContext.Provider
      value={{
        lostItem,
        setLostItem,
        turnedOnInput,
        setTurnedOnInput,
        inputValue,
        setInputValue,
        day,
        setDay,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
