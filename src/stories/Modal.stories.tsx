import type { Meta, StoryObj } from '@storybook/react';

import Modal from '../components/Modal';
import React from 'react';
import SearchBar from '../components/SearchBar';
import dayjs from 'dayjs';
import SearchContext from '../contexts/SearchContext';
import { MemoryRouter } from 'react-router-dom';

const meta = {
  title: 'Search/Modal',
  component: Modal,
  decorators: [
    (Story) => {
      const mockData = {
        ...mockInitialState,
        lostItem: {
          ...mockInitialState.lostItem,
          isLost: false,
        },
      };

      return (
        <MemoryRouter initialEntries={['/']}>
          <SearchContext.Provider value={mockData}>
            <Story />
          </SearchContext.Provider>
        </MemoryRouter>
      );
    },
  ],
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockInitialState = {
  lostItem: {
    name: null,
    date: null,
    place: null,
    office: null,
    isLost: true,
  },
  turnedOnInput: null,
  inputValue: '',
  dateInputValue: dayjs(),
  setLostItem: () => {},
  setTurnedOnInput: () => {},
  setInputValue: () => {},
  setDateInputValue: () => {},
};

export const OpenedWithCloseButton: Story = {
  args: {
    hasCloseButton: true,
    children: <div>Hello World!</div>,
    isOpen: true,
  },
};

export const ClosedWithCloseButton: Story = {
  args: {
    hasCloseButton: true,
    children: <div>Hello World!</div>,
    isOpen: false,
  },
};

export const OpenedWithModal: Story = {
  args: {
    hasCloseButton: true,
    children: <SearchBar />,
    isOpen: true,
  },
};
