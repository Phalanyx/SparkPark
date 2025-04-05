import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Filters from '../../app/components/filter';

describe('Filters Component', () => {
  const defaultProps = {
    showFilters: true,
    minLength: '',
    minWidth: '',
    date: '',
    time: '',
    setMinLength: jest.fn(),
    setMinWidth: jest.fn(),
    setDate: jest.fn(),
    setTime: jest.fn(),
    handleApplyFilters: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly when showFilters is true', () => {
    const { getByText } = render(<Filters {...defaultProps} />);
    expect(getByText('Filters')).toBeTruthy();
  });

  it('does not render when showFilters is false', () => {
    const propsWithHiddenFilters = {
      ...defaultProps,
      showFilters: false,
    };
    
    const { queryByText } = render(<Filters {...propsWithHiddenFilters} />);
    expect(queryByText('Filters')).toBeNull();
  });

  it('handles min length input changes', () => {
    const { getByPlaceholderText } = render(<Filters {...defaultProps} />);
    
    fireEvent.changeText(getByPlaceholderText('e.g., 4.5'), '5.0');
    expect(defaultProps.setMinLength).toHaveBeenCalledWith('5.0');
  });

  it('handles min width input changes', () => {
    const { getByPlaceholderText } = render(<Filters {...defaultProps} />);
    
    fireEvent.changeText(getByPlaceholderText('e.g., 2.0'), '2.5');
    expect(defaultProps.setMinWidth).toHaveBeenCalledWith('2.5');
  });

  it('handles date input changes', () => {
    const { getByPlaceholderText } = render(<Filters {...defaultProps} />);
    
    fireEvent.changeText(getByPlaceholderText('YYYY-MM-DD'), '2023-01-01');
    expect(defaultProps.setDate).toHaveBeenCalledWith('2023-01-01');
  });

  it('handles time input changes', () => {
    const { getByPlaceholderText } = render(<Filters {...defaultProps} />);
    
    fireEvent.changeText(getByPlaceholderText('HH:MM'), '14:30');
    expect(defaultProps.setTime).toHaveBeenCalledWith('14:30');
  });

  it('handles apply filters button press', () => {
    const { getByText } = render(<Filters {...defaultProps} />);
    
    fireEvent.press(getByText('Apply Filters'));
    expect(defaultProps.handleApplyFilters).toHaveBeenCalledTimes(1);
  });
}); 