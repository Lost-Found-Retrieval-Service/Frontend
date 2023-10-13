import { createContext } from 'react';
import { SearchContextType } from './SearchProvider';
const SearchContext = createContext<SearchContextType>({
  lostItem: null,
  setLostItem: null,
  turnedOnInput: null,
  setTurnedOnInput: null,
  inputValue: null,
  setInputValue: null,
});
export default SearchContext;
