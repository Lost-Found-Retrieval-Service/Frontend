import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import SearchProvider from '../providers/SearchProvider';
import SearchBar from './SearchBar';

const Header = () => {
  const location = useLocation();

  // 메인 페이지가 아닌 경우에만 헤더를 렌더링
  return location.pathname === '/' ? null : (
    <Container>
      <SearchProvider>
        <SearchBar width="50%" />
      </SearchProvider>
      <Nav>
        <Link to="/">
          <StyledButton>홈</StyledButton>
        </Link>

        <Link to="found">
          <StyledButton>습득물</StyledButton>
        </Link>

        <Link to="lost">
          <StyledButton>분실물</StyledButton>
        </Link>
      </Nav>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: #3498db;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  padding: 0.5rem;
`;

const Nav = styled.div`
  display: flex;
  gap: 3px;
  align-items: center; /* 수직 가운데 정렬을 위한 추가 스타일 */
`;

const StyledButton = styled.button`
  background-color: #3498db;
  color: #ffffff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2980b9;
  }
`;
