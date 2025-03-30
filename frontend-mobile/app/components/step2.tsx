import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Platform, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';

interface AvailabilitySlot {
    date: string;
    availableFrom: Date;
    availableUntil: Date;
}

interface Step2AvailabilityAndFeaturesProps {
    handleSubmit: () => void;
    currentStep: number;
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
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
                                                                                   }) => {
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [availableFrom, setAvailableFrom] = useState<Date | null>(null);
    const [availableUntil, setAvailableUntil] = useState<Date | null>(null);
    const [showStartPicker, setShowStartPicker] = useState<boolean>(false);
    const [showEndPicker, setShowEndPicker] = useState<boolean>(false);
    const [availabilityList, setAvailabilityList] = useState<AvailabilitySlot[]>([]);
    const [selectedDays, setSelectedDays] = useState<string[]>([]);

    const commonFeatures: string[] = ['WiFi', 'EV Charger', 'Security Camera'];
    const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
    const [customFeature, setCustomFeature] = useState<string>('');

    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const toggleDay = (day: string) => {
        if (selectedDays.includes(day)) {
            setSelectedDays(selectedDays.filter((d) => d !== day));
        } else {
            setSelectedDays([...selectedDays, day]);
        }
    };

    const addAvailability = () => {
        if (selectedDate && availableFrom && availableUntil) {
            const newSlot: AvailabilitySlot = {
                date: selectedDate,
                availableFrom,
                availableUntil,
            };
            setAvailabilityList([...availabilityList, newSlot]);
            setSelectedDate('');
            setAvailableFrom(null);
            setAvailableUntil(null);
        }
    };

    const addWeeklyAvailability = () => {
        const now = new Date();
        const fourWeeksFromNow = new Date();
        fourWeeksFromNow.setDate(now.getDate() + 28);

        const newSlots: AvailabilitySlot[] = [];

        for (let day = new Date(now); day <= fourWeeksFromNow; day.setDate(day.getDate() + 1)) {
            const dayName = weekDays[day.getDay()];
            if (selectedDays.includes(dayName)) {
                const dateStr = day.toISOString().split('T')[0];
                newSlots.push({
                    date: dateStr,
                    availableFrom: new Date(`${dateStr}T00:00:00`),
                    availableUntil: new Date(`${dateStr}T23:59:59`),
                });
            }
        }

        setAvailabilityList(newSlots);
    };

    const toggleFeature = (feature: string) => {
        if (selectedFeatures.includes(feature)) {
            setSelectedFeatures(selectedFeatures.filter((f) => f !== feature));
        } else {
            setSelectedFeatures([...selectedFeatures, feature]);
        }
    };

    const addCustomFeature = () => {
        if (customFeature.trim() !== '') {
            setSelectedFeatures([...selectedFeatures, customFeature.trim()]);
            setCustomFeature('');
        }
    };

    const onChangeStartTime = (event: Event, date?: Date) => {
        setShowStartPicker(Platform.OS === 'ios');
        if (date) setAvailableFrom(date);
    };

    const onChangeEndTime = (event: Event, date?: Date) => {
        setShowEndPicker(Platform.OS === 'ios');
        if (date) setAvailableUntil(date);
    };

    return (
        <View className="p-3 mt-8 flex-1">
            <Text className="text-xl text-white my-4">Set Weekly Availability</Text>
            <Text className="text-white mb-2">Select which Days of the week the spot is available</Text>
            <View className="flex-row flex-wrap mb-4">
                {weekDays.map((day, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => toggleDay(day)}
                        className={`px-4 py-2 rounded-full m-1 ${
                            selectedDays.includes(day) ? 'bg-[#48BB78]' : 'bg-[#2F4858]'
                        }`}
                    >
                        <Text className="text-white">{day}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity
                onPress={addWeeklyAvailability}
                className="bg-blue-600 px-4 py-3 rounded-lg items-center mb-4"
            >
                <Text className="text-white font-bold text-base">Confirm Availability</Text>
            </TouchableOpacity>

            {availabilityList.length > 0 && (
                <ScrollView className="mt-4" style={{ maxHeight: 200 }}>
                    {availabilityList.map((slot, index) => (
                        <Text key={index} className="text-white my-1">
                            {slot.date} from {slot.availableFrom.toLocaleTimeString()} to {slot.availableUntil.toLocaleTimeString()}
                        </Text>
                    ))}
                </ScrollView>
            )}

            <Text className="text-xl text-white my-4">Select Features</Text>
            <View className="flex-row flex-wrap mt-4">
                {commonFeatures.map((feature, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => toggleFeature(feature)}
                        className={`px-4 py-2 rounded-full m-1 ${
                            selectedFeatures.includes(feature) ? 'bg-[#48BB78]' : 'bg-[#2F4858]'
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

            <StepNavigation
                onBack={() => setCurrentStep((prev) => prev - 1)}
                onNext={() => setCurrentStep((prev) => prev)}
                handleSubmit={handleSubmit}
            />
        </View>
    );
};

export default Step2AvailabilityAndFeatures;
