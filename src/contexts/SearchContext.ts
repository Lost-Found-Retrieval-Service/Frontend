import { createContext } from 'react';
import { SearchContextType } from '../providers/SearchProvider';
const SearchContext = createContext<SearchContextType | null>(null);
export default SearchContext;
