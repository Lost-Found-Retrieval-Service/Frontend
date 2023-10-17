import React, { ReactNode, useState } from 'react';
import IsLostContext from '../contexts/IsLostContext';

interface IsLostProviderProps {
  children: ReactNode;
}

export interface IsLostContextType {
  isLost: boolean;
  setIsLost: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function IsLostProvider({ children }: IsLostProviderProps) {
  const [isLost, setIsLost] = useState(true);

  return (
    <IsLostContext.Provider value={{ isLost, setIsLost }}>
      {children}
    </IsLostContext.Provider>
  );
}
