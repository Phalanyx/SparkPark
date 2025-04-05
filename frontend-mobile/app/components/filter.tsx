import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

interface FiltersProps {
  showFilters: boolean;
  minLength: string;
  minWidth: string;
  date: string;
  time: string;
  setMinLength: (text: string) => void;
  setMinWidth: (text: string) => void;
  setDate: (text: string) => void;
  setTime: (text: string) => void;
  handleApplyFilters: () => void;
}

const Filters: React.FC<FiltersProps> = ({
  showFilters,
  minLength,
  minWidth,
  date,
  time,
  setMinLength,
  setMinWidth,
  setDate,
  setTime,
  handleApplyFilters,
}) => {
  return (
    <View
      style={[styles.container, { display: showFilters ? 'flex' : 'none' }]}
    >
      <View className="flex flex-row justify-between items-center">
        <Text className="text-white mb-2 font-bold">Filters</Text>
        <Text>Clear</Text>
      </View>
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
        <Text className="text-center text-white font-semibold">Apply Filters</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    padding: 16,
    backgroundColor: '#1d434f',
    borderRadius: 8,
  },
});

export default Filters;
