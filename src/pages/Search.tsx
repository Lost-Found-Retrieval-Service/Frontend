import React from 'react';
import styled from 'styled-components';
import SearchBar from '../components/SearchBar';
import SearchProvider from '../providers/SearchProvider';

const StyledContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledHeader = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledLogoEmoji = styled.span`
  font-size: 80px;
`;

const StyledLogoHeader = styled.span`
  font-size: 100px;
`;

const Search = () => {
  return (
    <StyledContainer>
      <StyledHeader>
        <button type="button">
          <StyledLogoEmoji>🔎</StyledLogoEmoji>
          <StyledLogoHeader>CATCH</StyledLogoHeader>
        </button>
      </StyledHeader>
      <SearchProvider>
        <SearchBar />
      </SearchProvider>
    </StyledContainer>
  );
};

export default Search;
