import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import SearchContext from '../contexts/SearchContext';
import dayjs from 'dayjs';
import ToggleButton from '../components/ToggleButton';

type ToggleButtonStoryArgs = {
  isLost: boolean;
};

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

const meta = {
  title: 'Search/ToggleButton',
  component: ToggleButton,
  decorators: [
    (Story, context) => {
      const mockData = {
        ...mockInitialState,
        lostItem: {
          ...mockInitialState.lostItem,
          isLost: context.args.isLost,
        },
      };

      return (
        <SearchContext.Provider value={mockData}>
          <Story />
        </SearchContext.Provider>
      );
    },
  ],
  tags: ['autodocs'],
} satisfies Meta<ToggleButtonStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ToggleOn: Story = {
  args: {
    isLost: true,
  },
};

export const ToggleOff: Story = {
  args: {
    isLost: false,
  },
};
