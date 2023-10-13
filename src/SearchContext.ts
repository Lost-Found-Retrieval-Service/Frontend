import { createContext } from 'react';
import { SearchContextType } from './SearchProvider';
const SearchContext = createContext<SearchContextType | null>(null);
export default SearchContext;
