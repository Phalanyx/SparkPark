import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Platform } from 'react-native';
import { Calendar } from 'react-native-calendars';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

interface AvailabilitySlot {
  date: string;
  startTime: Date;
  endTime: Date;
}

interface Step2AvailabilityAndFeaturesProps {
  handleSubmit: () => void;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  availabilityList: AvailabilitySlot[];
  setAvailabilityList: React.Dispatch<React.SetStateAction<AvailabilitySlot[]>>;
  features: string[];
  setFeatures: React.Dispatch<React.SetStateAction<string[]>>;
}

interface StepNavigationProps {
  onBack?: () => void;
  onNext: () => void;
  handleSubmit: () => void;
}

const StepNavigation: React.FC<StepNavigationProps> = ({ onBack, onNext, handleSubmit }) => {
  return (
    <View className="flex-row justify-center mt-4">
      <TouchableOpacity onPress={onBack} className="w-1/4 mr-2 p-4 rounded-md items-center bg-[#064c4f]">
        <Text className="text-white font-bold">Back</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleSubmit} className="w-1/2 mr-2 p-4 rounded-md items-center bg-[#064c4f]">
        <Text className="text-white font-bold">Submit Listing</Text>
      </TouchableOpacity>
    </View>
  );
};

const Step2AvailabilityAndFeatures: React.FC<Step2AvailabilityAndFeaturesProps> = ({
  handleSubmit,
  currentStep,
  setCurrentStep,
  availabilityList,
  setAvailabilityList,
  features,
  setFeatures,
}) => {
  // Features state
  const commonFeatures: string[] = ['WiFi', 'EV Charger', 'Security Camera'];
  const [customFeature, setCustomFeature] = useState<string>('');

  // Add missing state declarations for date and time handling
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [showStartPicker, setShowStartPicker] = useState<boolean>(false);
  const [showEndPicker, setShowEndPicker] = useState<boolean>(false);

  // Add the current availability slot to the list
  const addAvailability = () => {
    console.log(selectedDate, startTime, endTime);
    if (selectedDate && startTime && endTime) {
      const newSlot: AvailabilitySlot = {
        date: selectedDate,
        startTime,
        endTime,
      };
      setAvailabilityList([...availabilityList, newSlot]);
      console.log(availabilityList); 
      // Reset for next entry
      setSelectedDate('');
      setStartTime(null);
      setEndTime(null);
    }
  };

  // Toggle a common feature using lifted state
  const toggleFeature = (feature: string) => {
    if (features.includes(feature)) {
      setFeatures(features.filter((f) => f !== feature));
    } else {
      setFeatures([...features, feature]);
    }
  };

  // Add a custom feature using lifted state
  const addCustomFeature = () => {
    if (customFeature.trim() !== '') {
      setFeatures([...features, customFeature.trim()]);
      setCustomFeature('');
    }
  };

  // Handlers for the DateTimePicker
  const onChangeStartTime = (event: DateTimePickerEvent, date?: Date) => {
    setShowStartPicker(Platform.OS === 'ios');
    if (date) setStartTime(date);
  };

  const onChangeEndTime = (event: DateTimePickerEvent, date?: Date) => {
    setShowEndPicker(Platform.OS === 'ios');
    if (date) setEndTime(date);
  };

  return (
    <View className="p-10 mt-8 flex-1">
      {/* Availability Section */}
      <Text className="text-xl text-white my-4">Set Availability</Text>
      <Calendar
        onDayPress={(day: any) => setSelectedDate(day.dateString)}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: '#48BB78' },
        }}
      />

      <View className="mt-4">
        <Text className="text-white mb-2">Select Start Time</Text>
        <TouchableOpacity onPress={() => setShowStartPicker(true)} className="bg-[#2F4858] p-3 rounded-lg mb-2">
          <Text className="text-white">
            {startTime ? startTime.toLocaleTimeString() : 'Choose Start Time'}
          </Text>
        </TouchableOpacity>
        {showStartPicker && (
          <DateTimePicker
            value={startTime || new Date()}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={onChangeStartTime}
          />
        )}
      </View>

      <View className="mt-4">
        <Text className="text-white mb-2">Select End Time</Text>
        <TouchableOpacity onPress={() => setShowEndPicker(true)} className="bg-[#2F4858] p-3 rounded-lg mb-2">
          <Text className="text-white">
            {endTime ? endTime.toLocaleTimeString() : 'Choose End Time'}
          </Text>
        </TouchableOpacity>
        {showEndPicker && (
          <DateTimePicker
            value={endTime || new Date()}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={onChangeEndTime}
          />
        )}
      </View>

      <Button title="Add Availability" onPress={() => 
        {addAvailability()
          console.log(availabilityList)
        }} />

      {availabilityList.length > 0 && (
        <View className="mt-4">
          {availabilityList.map((slot, index) => (
            <Text key={index} className="text-white my-1">
              {slot.date} from {slot.startTime.toLocaleTimeString()} to {slot.endTime.toLocaleTimeString()}
            </Text>
          ))}
        </View>
      )}

      {/* Features Section */}
      <Text className="text-xl text-white my-4">Select Features</Text>
      <View className="flex-row flex-wrap mt-4">
        {commonFeatures.map((feature, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => toggleFeature(feature)}
            className={`px-4 py-2 rounded-full m-1 ${
              features.includes(feature) ? 'bg-[#48BB78]' : 'bg-[#2F4858]'
            }`}
          >
            <Text className="text-white">{feature}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text className="text-white mb-2">Add Additional Feature</Text>
      <TextInput
        value={customFeature}
        onChangeText={setCustomFeature}
        placeholder="Type additional feature"
        placeholderTextColor="#99AAB5"
        className="bg-[#2F4858] text-white p-3 rounded-lg mt-2 mb-4"
      />
      <Button title="Add Custom Feature" onPress={addCustomFeature} />

      {/* Navigation */}
      <StepNavigation
        onBack={() => setCurrentStep((prev) => prev - 1)}
        onNext={() => setCurrentStep((prev) => prev)}
        handleSubmit={handleSubmit}
      />
    </View>
  );
};

export default Step2AvailabilityAndFeatures;
