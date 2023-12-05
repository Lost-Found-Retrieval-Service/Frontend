import React, { useState } from 'react';
import styled from 'styled-components';
import SearchBar from '../components/SearchBar';
import SearchProvider from '../providers/SearchProvider';
import Modal from '../components/Modal';
import axios from 'axios';

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

const StyledInput = styled.input`
  border: #ececec solid 16px;
  background-color: #ececec;
  border-radius: 16px;
`;

const InputRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledButton = styled.button`
  font-size: 24px;
`;

export default function Search() {
  const [IsModalOpened, setModalOpened] = useState<boolean>(false);
  const [email, setEmail] = useState('');

  const registerEmail = () => {
    const fetchEmail = async () => {
      axios.get(`/subs?email=${email}`, {
        baseURL: process.env.REACT_APP_API_URL,
      });
    };
    fetchEmail();
  };

  const handleActivateModal = () => {
    setModalOpened((currentIsModalOpened) => !currentIsModalOpened);
  };

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
        <Modal
          hasCloseButton={true}
          isOpen={IsModalOpened}
          onModalAction={() =>
            setModalOpened((currentModalOpened) => !currentModalOpened)
          }
        >
          <InputRow>
            <StyledInput
              type="email"
              name="fdsdf"
              placeholder="이메일을 입력하세요"
              onChange={(event) => setEmail(event.target.value)}
            />
            <StyledButton type="button" onClick={() => registerEmail()}>
              ✅
            </StyledButton>
          </InputRow>
        </Modal>
      </SearchProvider>
      <button type="button" onClick={handleActivateModal}>
        이메일 알림🔔
      </button>
    </StyledContainer>
  );
}
