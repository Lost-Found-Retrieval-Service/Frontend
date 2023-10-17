import { createContext } from 'react';
import { IsLostContextType } from '../providers/IsLostProvider';

const IsLostContext = createContext<IsLostContextType | null>(null);
export default IsLostContext;
