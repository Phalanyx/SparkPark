import React, { useState, useRef } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
  Modal,
  ScrollView,
} from 'react-native';
import { Icon } from 'react-native-elements';
import MapView from 'react-native-maps';
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface Listing {
  _id: string;
  title: string;
  address: string;
  size: {
    length: number;
    width: number;
  };
  pricePerHour: number;
  images: string[];
  location: {
    lat: number;
    lon: number;
  };
}

interface SearchProps {
  setData: (data: any[]) => void;
  setCenter: (center: Coordinates) => void;
  mapRef: React.RefObject<MapView>;
}

const sizeGuideData = [
  { minSize: '10.0 x 4.5', category: 'X-LARGE', examples: 'RV, bus, large truck' },
  { minSize: '6.5 x 3.0',  category: 'LARGE',   examples: 'Van, minivans, pickup' },
  { minSize: '5.5 x 2.7',  category: 'MEDIUM',  examples: 'Small/crossover SUV' },
  { minSize: '5.0 x 2.5',  category: 'SMALL',   examples: 'Sedan' },
  { minSize: '3.5 x 1.8',  category: 'X-SMALL', examples: 'Motorcycle, scooter, etc.' },
];

const Search: React.FC<SearchProps> = ({ setData, setCenter, mapRef }) => {
  const [query, setQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [time, setTime] = useState(new Date());
  const [listings, setListings] = useState<Listing[]>([]);

  const handleSearch = async (query: string): Promise<void> => {
    try {
      if (query === '') {
        return;
      }
      const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND}/geolocation/isochrones`, {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({ address: query }),
      });
      const data = (await response.json())
      setData(data.points);

      const region = {
        latitude: data.lat,
        longitude: data.lon,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };

      setCenter({ latitude: region.latitude, longitude: region.longitude });
      mapRef.current?.animateToRegion(region, 1000);

    } catch (error) {
      console.error('Error in handleSearch', error);
    }
  };

  const handleApplyFilters = async () => {
    try {
      const queryParams: Record<string, string> = {};
      if (selectedCategory) {
        const size = sizeGuideData.find(cat => cat.category === selectedCategory)?.minSize;
        if (size) {
          const [length, width] = size.split('x').map(s => s.trim());
          queryParams.minLength = length;
          queryParams.minWidth = width;
        }
      }
      if (date) queryParams.date = date.toISOString().split('T')[0];
      if (time) queryParams.time = time.toLocaleTimeString('en-US', { hour12: false });

      const queryString = Object.keys(queryParams)
        .map(
          key => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`
        )
        .join('&');

      const url = `${process.env.EXPO_PUBLIC_BACKEND}/search-parking${
        queryString ? `?${queryString}` : ''
      }`;
      const response = await fetch(url, { method: 'GET' });
      const result = (await response.json()) as Listing[];
      setData(result);
      setListings(result);
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

  const getSizeCategory = (length: number, width: number) => {
    const size = `${length} x ${width}`;
    return sizeGuideData.find(cat => {
      const [minLength, minWidth] = cat.minSize.split('x').map(s => parseFloat(s.trim()));
      return length >= minLength && width >= minWidth;
    })?.category || 'CUSTOM';
  };

  return (
    <View className="overflow-hidden">
      {/* Search Bar */}
      <View className="rounded-xl overflow-hidden">
        <LinearGradient
          colors={['#1d434f', '#2e6165']}
        >
        <View className="flex-row items-center rounded-xl">
          <TextInput
            className="h-12 pl-4 text-white flex-1"
            placeholder="Search location..."
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
        </LinearGradient>
      </View>



      {/* Filters Section */}
      {showFilters && (
        <View className="rounded-xl overflow-hidden mt-2">
          <LinearGradient
            colors={['#1d434f', '#2e6165']}
        >
          <View className="p-4">
          <View className="flex flex-row justify-between items-center">
            <Text className="text-white text-lg font-bold mb-4 rounded-xl">Filters</Text>
            <Text className="text-white text-sm" 
            onPress={() => {
              setSelectedCategory('');
              setDate(new Date());
              setTime(new Date());
            }}>Clear</Text>
          </View>
          
          {/* Size Category Selection */}
          <View className="mb-4">
            <Text className="text-white mb-2">Space Size</Text>
            <View className="flex-row flex-wrap gap-2">
              {sizeGuideData.map((size, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setSelectedCategory(size.category)}
                  className={`px-3 py-1.5 rounded-full ${
                    selectedCategory === size.category
                      ? 'bg-[#48BB78]'
                      : 'bg-[#2F4858]'
                  }`}
                >
                  <Text className="text-white text-sm">{size.category}</Text>
                </TouchableOpacity>
              ))}
            </View>
            {selectedCategory && (
              <View className="mt-2 p-3 bg-[#2F4858] rounded-xl">
                <Text className="text-white">
                  Selected: {sizeGuideData.find(cat => cat.category === selectedCategory)?.minSize}
                </Text>
                <Text className="text-gray-300 text-sm">
                  {sizeGuideData.find(cat => cat.category === selectedCategory)?.examples}
                </Text>
              </View>
            )}
          </View>

          {/* Date Selection */}
          <View className="mb-4">
            <Text className="text-white mb-2">Date</Text>
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              className="bg-[#2F4858] p-3 rounded-xl"
            >
              <Text className="text-white">
                {date.toLocaleDateString()}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Time Selection */}
          <View className="mb-4">
            <Text className="text-white mb-2">Time</Text>
            <TouchableOpacity
              onPress={() => setShowTimePicker(true)}
              className="bg-[#2F4858] p-3 rounded-xl"
            >
              <Text className="text-white">
                {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Apply Filters Button */}
          <TouchableOpacity
            onPress={handleApplyFilters}
            className="bg-[#48BB78] py-3 rounded-xl mt-2"
          >
            <Text className="text-white text-center font-semibold">
              Apply Filters
              </Text>
          </TouchableOpacity>
          </View>
          </LinearGradient>
        </View>
      )}

      {/* Date Picker Modal */}
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              setDate(selectedDate);
            }
          }}
          minimumDate={new Date()}
        />
      )}

      {/* Time Picker Modal */}
      {showTimePicker && (
        <DateTimePicker
          value={time}
          mode="time"
          display="default"
          onChange={(event, selectedTime) => {
            setShowTimePicker(false);
            if (selectedTime) {
              setTime(selectedTime);
            }
          }}
        />
      )}
    </View>
  );
};

export default Search;
