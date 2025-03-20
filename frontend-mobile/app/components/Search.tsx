import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  LayoutAnimation
} from 'react-native';
import { Icon } from 'react-native-elements';

interface SearchProps {
  setData: (data: any[]) => void;
  setCenter: (data: any[]) => void;
}

const Search: React.FC<SearchProps> = ({ setData, setCenter }) => {
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [minLength, setMinLength] = useState('');
  const [minWidth, setMinWidth] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSearch = async (query: string): Promise<void> => {
    if (query.length < 3) {
      try {
        const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND}/`, { method: 'GET' });
        const result = await response.json();
        console.log(result);
        setData(result);
      } catch (error) {
        setData([]);
        console.error('There was an error making the request!', error);
      }
      return;
    }
    
    const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND}/geolocation/isochrones`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ address: query }),
    });
    const data = await response.json();
    setData(data.points);
    setCenter([data.lat, data.lon]);
    console.log(data);
  };

  const handleApplyFilters = async () => {
    if (!minLength || !minWidth || !date || !time) {
      console.log("Missing required filters");
      return;
    }
    try {
      const url = `${process.env.EXPO_PUBLIC_BACKEND}/search-parking?minLength=${minLength}&minWidth=${minWidth}&date=${date}&time=${time}`;
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

      {/* Always rendered but toggled visible using NativeWind's "hidden" utility */}
      <View className={`mt-2 p-4 bg-[#004B25] rounded-lg ${showFilters ? '' : 'hidden'}`}>
        <Text className="text-white mb-2 font-bold">Filters</Text>
        <View className="mb-2">
          <Text className="text-white">Min Length</Text>
          <TextInput
            className="h-10 border border-gray-300 rounded px-2"
            placeholder="e.g., 4.5"
            keyboardType="numeric"
            value={minLength}
            onChangeText={setMinLength}
          />
        </View>
        <View className="mb-2">
          <Text className="text-white">Min Width</Text>
          <TextInput
            className="h-10 border border-gray-300 rounded px-2"
            placeholder="e.g., 2.0"
            keyboardType="numeric"
            value={minWidth}
            onChangeText={setMinWidth}
          />
        </View>
        <View className="mb-2">
          <Text className="text-white">Date</Text>
          <TextInput
            className="h-10 border border-gray-300 rounded px-2"
            placeholder="YYYY-MM-DD"
            value={date}
            onChangeText={setDate}
          />
        </View>
        <View className="mb-2">
          <Text className="text-white">Time</Text>
          <TextInput
            className="h-10 border border-gray-300 rounded px-2"
            placeholder="HH:MM"
            value={time}
            onChangeText={setTime}
          />
        </View>
        <TouchableOpacity
          onPress={handleApplyFilters}
          className="mt-2 bg-blue-500 py-2 rounded"
        >
          <Text className="text-center text-white font-semibold">Apply Filters</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Search;
