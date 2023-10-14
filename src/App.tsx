import React from 'react';
import './App.css';
import GlobalStyle from './styles/GlobalStyle';
import SearchPage from './pages/SearchPage';
('react-router-dom');
function App() {
  return (
    <>
      <GlobalStyle />
      <SearchPage />
    </>
  );
}

export default App;
