import React, { useState } from 'react';
import styled from 'styled-components';
import SearchBar from '../components/SearchBar';
import SearchProvider from '../providers/SearchProvider';
import Modal from '../components/Modal';
import ModalSearchBar from '../components/ModalSearchBar';

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

export default function Search() {
  const [IsModalOpened, setModalOpened] = useState<boolean>(false);

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
          <ModalSearchBar />
        </Modal>
      </SearchProvider>
      <button type="button" onClick={handleActivateModal}>
        이메일 알림🔔
      </button>
    </StyledContainer>
  );
}
