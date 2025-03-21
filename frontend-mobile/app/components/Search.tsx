import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  LayoutAnimation
} from 'react-native';
import { Icon } from 'react-native-elements';
import Filters from './filter'; // adjust the import path as needed

interface SearchProps {
  setData: (data: any[]) => void;
  setCenter: (data: any[]) => void;
}

const Search: React.FC<SearchProps> = ({ setData, setCenter }) => {
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(true);
  const [minLength, setMinLength] = useState('');
  const [minWidth, setMinWidth] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSearch = async (query: string): Promise<void> => {
    // ... your se  arch logic here
  };

  const handleApplyFilters = async () => {
    try {
      const queryParams: Record<string, string> = {};
      if (minLength) queryParams.minLength = minLength;
      if (minWidth) queryParams.minWidth = minWidth;
      if (date) queryParams.date = date;
      if (time) queryParams.time = time;
  
      const queryString = Object.keys(queryParams)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
        .join("&");
  
      const url = `${process.env.EXPO_PUBLIC_BACKEND}/search-parking${queryString ? `?${queryString}` : ''}`;
      const response = await fetch(url, { method: 'GET' });
      const result = await response.json();
      setData(result);
      if (result && result.length > 0 && result[0].location) {
        setCenter([result[0].location.lat, result[0].location.lon]);
      }
    } catch (error) {
      console.error("Error applying filters", error);
    }
  };
  

  const toggleFilters = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowFilters((prev) => !prev);
  };

  return (
    <View className="p-2">
      <View className="flex-row items-center">
        <TextInput
          className="h-12 border pl-2 bg-[#004B25] rounded-lg text-white flex-1"
          placeholder="Search"
          placeholderTextColor="#aaa"
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={(e) => handleSearch(e.nativeEvent.text)}
        />
        <TouchableOpacity
          onPress={toggleFilters}
          className="w-12 h-12 flex items-center justify-center"
        >
          <Icon name="filter" type="font-awesome" color="#fff" />
        </TouchableOpacity>
      </View>

      <Filters
        showFilters={showFilters}
        minLength={minLength}
        minWidth={minWidth}
        date={date}
        time={time}
        setMinLength={setMinLength}
        setMinWidth={setMinWidth}
        setDate={setDate}
        setTime={setTime}
        handleApplyFilters={handleApplyFilters}
      />
    </View>
  );
};

export default Search;
