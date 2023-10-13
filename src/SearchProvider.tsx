import React, { ReactNode, useState } from 'react';
import SearchContext from './SearchContext';

interface SearchProviderProps {
  children: ReactNode;
}

type LostItem = {
  name: null | string;
  date: null | string;
  place: null | string;
  owner: null | string;
};

export type SearchContextType = {
  lostItem: LostItem;
  setLostItem: React.Dispatch<React.SetStateAction<LostItem>>;
  turnedOnInput: null | string;
  setTurnedOnInput: React.Dispatch<React.SetStateAction<null | string>>;
  inputValue: null | string;
  setInputValue: React.Dispatch<React.SetStateAction<null | string>>;
};

export default function SearchProvider({ children }: SearchProviderProps) {
  const [lostItem, setLostItem] = useState({
    name: null,
    date: null,
    place: null,
    owner: null,
  });
  const [turnedOnInput, setTurnedOnInput] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');

  return (
    <SearchContext.Provider
      value={{
        lostItem,
        setLostItem,
        turnedOnInput,
        setTurnedOnInput,
        inputValue,
        setInputValue,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
