import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const StyledBackground = styled.span`
  position: fixed;
  inset: 0px 0px 0px 0px;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const StyledModal = styled.dialog`
  border: none;
  width: 300px;
  margin: 0px;
  border-radius: 16px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  padding: 32px;

  &::backdrop {
    background-color: transparent;
  }
`;

const StyledCloseButton = styled.button`
  border: none;
  font-size: 24px;
  background-color: #ffffff;
  &:hover {
    cursor: pointer;
  }
  &:focus {
    border: none;
  }
`;

const ModalHeading = styled.h1`
  font-size: 24px;
  font-weight: 900;
`;

interface ModalPropsType {
  hasCloseButton: boolean;
  children: React.ReactNode;
  isOpen: boolean;
  onModalAction: () => void;
}

const StyledTitleBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 16px;
`;

export default function Modal({
  hasCloseButton,
  isOpen,
  onModalAction,
  children,
}: ModalPropsType) {
  const modalRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const modalElement = modalRef.current;
    if (modalElement) {
      if (isOpen) {
        modalElement.showModal();
      } else {
        modalElement.close();
      }
    }
  }, [isOpen]);

  const handleCloseModal = () => {
    onModalAction();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === 'Escape') {
      handleCloseModal();
    }
  };

  return (
    <>
      {isOpen && <StyledBackground />}

      <StyledModal ref={modalRef} onKeyDown={handleKeyDown}>
        <StyledTitleBar>
          <ModalHeading>알림 받기</ModalHeading>
          {hasCloseButton && (
            <StyledCloseButton type="button" onClick={handleCloseModal}>
              ✖️
            </StyledCloseButton>
          )}
        </StyledTitleBar>
        {children}
      </StyledModal>
    </>
  );
}
