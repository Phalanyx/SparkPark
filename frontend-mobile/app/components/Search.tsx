import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
} from 'react-native';
import { Icon } from 'react-native-elements';

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface SearchProps {
  setData: (data: any[]) => void;
  setCenter: (center: Coordinates) => void;
}

const Search: React.FC<SearchProps> = ({ setData, setCenter }) => {
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(true);
  const [minLength, setMinLength] = useState('');
  const [minWidth, setMinWidth] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  interface IsochroneResponse {
    points: any[];
  }

  const handleSearch = async (query: string): Promise<void> => {
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND}/geolocation/isochrones`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({ address: query }),
      });
      const data = (await response.json()) as IsochroneResponse;
      setData(data.points);
    } catch (error) {
      console.error('Error in handleSearch', error);
    }
  };

  const handleApplyFilters = async () => {
    try {
      const queryParams: Record<string, string> = {};
      if (minLength) queryParams.minLength = minLength;
      if (minWidth) queryParams.minWidth = minWidth;
      if (date) queryParams.date = date;
      if (time) queryParams.time = time;

      const queryString = Object.keys(queryParams)
        .map(
          key => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`
        )
        .join('&');

      const url = `${process.env.EXPO_PUBLIC_BACKEND}/search-parking${
        queryString ? `?${queryString}` : ''
      }`;
      const response = await fetch(url, { method: 'GET' });
      const result = (await response.json()) as any[];
      setData(result);
      if (result && result.length > 0 && result[0].location) {
        setCenter({
          latitude: result[0].location.lat,
          longitude: result[0].location.lon,
        });
      }
    } catch (error) {
      console.error('Error applying filters', error);
    }
  };

  const toggleFilters = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowFilters(prev => !prev);
  };

  return (
    <View className="p-2">
      {/* Search Bar */}
      <View className="flex-row items-center bg-[#1d434f] rounded-lg">
        <TextInput
          className="h-12 pl-2 text-white flex-1"
          placeholder="Search"
          placeholderTextColor="#aaa"
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={(
            e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
          ) => handleSearch(e.nativeEvent.text)}
        />
        <TouchableOpacity
          onPress={toggleFilters}
          className="w-12 h-12 flex items-center justify-center"
        >
          <Icon name="filter" type="font-awesome" color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Filters Section */}
      <View
        style={{ display: showFilters ? 'flex' : 'none' }}
        className="mt-2 p-4 bg-[#1d434f] rounded-lg"
      >
        <Text className="text-white mb-2 font-bold">Filters</Text>
        <View className="flex flex-wrap flex-row">
          <View className="mb-2 w-1/4">
            <Text className="text-white">Min Length</Text>
            <TextInput
              className="h-10 border border-gray-300 rounded px-2"
              placeholder="e.g., 4.5"
              keyboardType="numeric"
              value={minLength}
              onChangeText={setMinLength}
            />
          </View>
          <View className="mb-2 w-1/4">
            <Text className="text-white">Min Width</Text>
            <TextInput
              className="h-10 border border-gray-300 rounded px-2"
              placeholder="e.g., 2.0"
              keyboardType="numeric"
              value={minWidth}
              onChangeText={setMinWidth}
            />
          </View>
          <View className="mb-2 w-1/4">
            <Text className="text-white">Date</Text>
            <TextInput
              className="h-10 border border-gray-300 rounded px-2"
              placeholder="YYYY-MM-DD"
              value={date}
              onChangeText={setDate}
            />
          </View>
          <View className="mb-2 w-1/4">
            <Text className="text-white">Time</Text>
            <TextInput
              className="h-10 border border-gray-300 rounded px-2"
              placeholder="HH:MM"
              value={time}
              onChangeText={setTime}
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={handleApplyFilters}
          className="mt-2 bg-[#0a2d38] py-2 rounded"
        >
          <Text className="text-center text-white font-semibold">
            Apply Filters
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Search;
