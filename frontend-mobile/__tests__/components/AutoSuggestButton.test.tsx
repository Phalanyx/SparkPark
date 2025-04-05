import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import AutoSuggestButton from '../../app/components/AutoSuggestButton';

describe('AutoSuggestButton Component', () => {
  it('renders correctly', () => {
    const { getByText } = render(<AutoSuggestButton onPress={() => {}} />);
    expect(getByText('Find Best Spot')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(<AutoSuggestButton onPress={mockOnPress} />);
    
    fireEvent.press(getByText('Find Best Spot'));
    
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('has the correct styling', () => {
    const { getByText } = render(<AutoSuggestButton onPress={() => {}} />);
    const button = getByText('Find Best Spot');
    
    // Check if the button has the correct text color
    expect(button.props.style).toHaveProperty('color', 'white');
    
    // Check if the button has the correct font weight
    expect(button.props.style).toHaveProperty('fontWeight', 'bold');
  });
}); 