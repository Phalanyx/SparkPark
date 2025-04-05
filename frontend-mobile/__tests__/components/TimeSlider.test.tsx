import React from 'react';
import { render } from '@testing-library/react-native';
import TimeSlider from '../../app/components/TimeSlider';
import { ViewProps } from 'react-native';

// Mock the Slider component
jest.mock('@react-native-community/slider', () => {
  const { View } = require('react-native');
  return function MockSlider(props: ViewProps) {
    return <View testID="slider" {...props} />;
  };
});

describe('TimeSlider Component', () => {
  const mockStartTime = new Date('2023-01-01T10:00:00');
  const mockEndTime = new Date('2023-01-01T12:00:00');
  const mockSelectedDate = new Date('2023-01-01');
  const mockAvailableSlots = [
    {
      availableFrom: '09:00',
      availableUntil: '17:00',
      date: '2023-01-01',
    },
  ];

  const defaultProps = {
    startTime: mockStartTime,
    endTime: mockEndTime,
    onStartTimeChange: jest.fn(),
    onEndTimeChange: jest.fn(),
    availableSlots: mockAvailableSlots,
    selectedDate: mockSelectedDate,
  };

  it('renders time range information', () => {
    const { getByText } = render(<TimeSlider {...defaultProps} />);
    expect(getByText('Start Time')).toBeTruthy();
    expect(getByText('End Time')).toBeTruthy();
  });

  it('renders available time slots', () => {
    const { getByText } = render(<TimeSlider {...defaultProps} />);
    expect(getByText('09:00')).toBeTruthy();
    expect(getByText('17:00')).toBeTruthy();
  });

  it('displays message when no slots are available', () => {
    const propsWithNoSlots = {
      ...defaultProps,
      availableSlots: [],
    };
    
    const { getByText } = render(<TimeSlider {...propsWithNoSlots} />);
    expect(getByText('No available time slots for this date')).toBeTruthy();
  });

  it('renders sliders', () => {
    const { getAllByTestId } = render(<TimeSlider {...defaultProps} />);
    const sliders = getAllByTestId('slider');
    expect(sliders).toHaveLength(2); // One for start time, one for end time
  });
}); 