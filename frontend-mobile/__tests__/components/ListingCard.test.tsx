import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ListingCard from '../../app/components/listingPanel';

// Mock expo-router
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock expo-image
jest.mock('expo-image', () => {
  const { View } = require('react-native');
  return {
    Image: ({ onLoadEnd }) => {
      // Simulate image loading
      setTimeout(() => onLoadEnd(), 0);
      return <View testID="mock-image" />;
    },
  };
});

// Mock expo-linear-gradient
jest.mock('expo-linear-gradient', () => {
  const { View } = require('react-native');
  return {
    LinearGradient: ({ children }) => <View testID="mock-gradient">{children}</View>,
  };
});

describe('ListingCard Component', () => {
  const mockListing = {
    _id: '123',
    title: 'Test Listing',
    address: '123 Test St',
    description: 'This is a test listing description',
    images: ['https://example.com/image.jpg'],
    pricePerHour: 10,
    pricePerDay: 100,
    pricePerMonth: 1000,
  };

  const defaultProps = {
    data: mockListing,
    visible: true,
    onPrevious: jest.fn(),
    onNext: jest.fn(),
    hasPrevious: true,
    hasNext: true,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly when visible', () => {
    const { getByText } = render(<ListingCard {...defaultProps} />);
    
    // Check if the title is rendered
    expect(getByText('Test Listing')).toBeTruthy();
    
    // Check if the address is rendered
    expect(getByText('123 Test St')).toBeTruthy();
    
    // Check if the description is rendered
    expect(getByText('This is a test listing description')).toBeTruthy();
    
    // Check if the price is rendered
    expect(getByText('$10/hr')).toBeTruthy();
  });

  it('does not render when not visible', () => {
    const propsWithHiddenCard = {
      ...defaultProps,
      visible: false,
    };
    
    const { queryByText } = render(<ListingCard {...propsWithHiddenCard} />);
    expect(queryByText('Test Listing')).toBeNull();
  });

  it('does not render when data is undefined', () => {
    const propsWithNoData = {
      ...defaultProps,
      data: undefined,
    };
    
    const { queryByText } = render(<ListingCard {...propsWithNoData} />);
    expect(queryByText('Test Listing')).toBeNull();
  });

  it('toggles between collapsed and expanded views when pressed', () => {
    const { getByText, queryByText } = render(<ListingCard {...defaultProps} />);
    
    // Initially, only the hourly price should be visible
    expect(getByText('$10/hr')).toBeTruthy();
    expect(queryByText('$100/day')).toBeNull();
    expect(queryByText('$1000/month')).toBeNull();
    
    // Press the card to expand it
    fireEvent.press(getByText('Test Listing'));
    
    // Now all prices should be visible
    expect(getByText('$10/hr')).toBeTruthy();
    expect(getByText('$100/day')).toBeTruthy();
    expect(getByText('$1000/month')).toBeTruthy();
    
    // Press again to collapse
    fireEvent.press(getByText('Test Listing'));
    
    // Back to only hourly price
    expect(getByText('$10/hr')).toBeTruthy();
    expect(queryByText('$100/day')).toBeNull();
    expect(queryByText('$1000/month')).toBeNull();
  });

  it('calls onPrevious when previous button is pressed', () => {
    const { getByText } = render(<ListingCard {...defaultProps} />);
    
    // Find and press the previous button
    fireEvent.press(getByText('←'));
    
    expect(defaultProps.onPrevious).toHaveBeenCalledTimes(1);
  });

  it('calls onNext when next button is pressed', () => {
    const { getByText } = render(<ListingCard {...defaultProps} />);
    
    // Find and press the next button
    fireEvent.press(getByText('→'));
    
    expect(defaultProps.onNext).toHaveBeenCalledTimes(1);
  });
}); 