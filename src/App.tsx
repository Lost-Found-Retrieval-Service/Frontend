import React from 'react';
import './App.css';
import Router from './Router';
import GlobalStyle from './styles/GlobalStyle';
import IsLostProvider from './providers/IsLostProvider';

function App() {
  return (
    <div>
      <GlobalStyle />
      <IsLostProvider>
        <Router />
      </IsLostProvider>
    </div>
  );
}

export default App;
