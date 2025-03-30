import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';

interface TimeSlot {
  availableFrom: string;
  availableUntil: string;
  date: string;
}

interface TimeSliderProps {
  startTime: Date;
  endTime: Date;
  onStartTimeChange: (time: Date) => void;
  onEndTimeChange: (time: Date) => void;
  availableSlots: TimeSlot[];
  selectedDate: Date;
}

export default function TimeSlider({
  startTime,
  endTime,
  onStartTimeChange,
  onEndTimeChange,
  availableSlots,
  selectedDate,
}: TimeSliderProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const getMinutesFromMidnight = (date: Date) => {
    return date.getHours() * 60 + date.getMinutes();
  };

  const getDateFromMinutes = (minutes: number) => {
    const date = new Date(selectedDate);
    date.setHours(Math.floor(minutes / 60));
    date.setMinutes(minutes % 60);
    return date;
  };

  // Find the available slot for the selected date
  const selectedSlot = availableSlots.find(slot => {
    const slotDate = new Date(slot.date);
    console.log("Slot date:", slotDate.toISOString().split('T')[0]);
    console.log("Selected date:", selectedDate.toISOString().split('T')[0]);
    return slotDate.toISOString().split('T')[0] === selectedDate.toISOString().split('T')[0];
  });

  if (!selectedSlot) {
    return (
      <View className="p-4 bg-white rounded-xl shadow-sm">
        <Text className="text-center text-gray-500">No available time slots for this date</Text>
      </View>
    );
  }

  // Convert available times to minutes from midnight
  const [minHour, minMinute] = selectedSlot.availableFrom.split(':').map(Number);
  const [maxHour, maxMinute] = selectedSlot.availableUntil.split(':').map(Number);
  
  const minMinutes = minHour * 60 + minMinute;
  const maxMinutes = maxHour * 60 + maxMinute;
  const startMinutes = getMinutesFromMidnight(startTime);
  const endMinutes = getMinutesFromMidnight(endTime);

  return (
    <View className="p-4 bg-white rounded-xl shadow-sm">
      <View className="flex-row justify-between mb-4">
        <View>
          <Text className="text-sm text-gray-500">Start Time</Text>
          <Text className="text-lg font-semibold text-gray-800">
            {formatTime(startTime)}
          </Text>
        </View>
        <View>
          <Text className="text-sm text-gray-500">End Time</Text>
          <Text className="text-lg font-semibold text-gray-800">
            {formatTime(endTime)}
          </Text>
        </View>
      </View>

      <View className="px-2">
        <Slider
          style={{ height: 40 }}
          minimumValue={minMinutes}
          maximumValue={maxMinutes}
          value={startMinutes}
          onValueChange={(value) => {
            const newTime = getDateFromMinutes(value);
            if (newTime < endTime) {
              onStartTimeChange(newTime);
            }
          }}
          minimumTrackTintColor="#1d434f"
          maximumTrackTintColor="#E5E7EB"
          thumbTintColor="#1d434f"
        />
        <Slider
          style={{ height: 40 }}
          minimumValue={minMinutes}
          maximumValue={maxMinutes}
          value={endMinutes}
          onValueChange={(value) => {
            const newTime = getDateFromMinutes(value);
            if (newTime > startTime) {
              onEndTimeChange(newTime);
            }
          }}
          minimumTrackTintColor="#1d434f"
          maximumTrackTintColor="#E5E7EB"
          thumbTintColor="#1d434f"
        />
      </View>

      <View className="flex-row justify-between mt-2">
        <Text className="text-xs text-gray-500">{selectedSlot.availableFrom}</Text>
        <Text className="text-xs text-gray-500">{selectedSlot.availableUntil}</Text>
      </View>
    </View>
  );
} 