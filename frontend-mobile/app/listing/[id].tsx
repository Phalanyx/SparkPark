import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { useLocalSearchParams, Stack } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import PaymentButton from '../components/Payment';
import 'react-native-gesture-handler';
import TimeSlider from '../components/TimeSlider';
import { Calendar, DateData } from 'react-native-calendars';

// Define a type for the availability slots
interface Availability {
  _id: string;
  availableFrom: string;
  availableUntil: string;
  date: string;
}


interface Listing {
  _id: string;
  title: string;
  address: string;
  description: string;
  images: string[];
  pricePerHour: number;
  features: string[];
  availability?: Availability[];
}

export default function ListingDetail() {
  const { id } = useLocalSearchParams();
  const [listing, setListing] = useState<Listing>({
    _id: '',
    title: '',
    address: '',
    description: '',
    images: [],
    pricePerHour: 0,
    features: [],
    availability: [],
  });
  const [loading, setLoading] = useState(true);
  const [showBooking, setShowBooking] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date().toISOString());
  const [endTime, setEndTime] = useState(new Date(new Date().getTime() + 1 * 60 * 60 * 1000).toISOString());
  const [amount, setAmount] = useState(0);
  useEffect(() => {
    fetchListingDetails();
  }, [id]);


  useEffect(() => {
    setAmount(Math.round((new Date(endTime).getTime() - new Date(startTime).getTime()) / (1000 * 60 * 60) * listing.pricePerHour * 100) / 100);
  }, [startTime, endTime, listing.pricePerHour]);

  useEffect(() => {
    console.log("Listing availability:", listing.availability);
  }, [listing]);

  const fetchListingDetails = async () => {
    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND}/listing/${id}`);
      const data = await response.json();
      setListing(data);
    } catch (error) {
      console.error('Error fetching listing details:', error);
    } finally {
      setLoading(false);
    }
  };

  // Create marked dates for the calendar
  const getMarkedDates = () => {
    const marked: { [date: string]: any } = {};
    
    listing.availability?.forEach(slot => {
      const date = new Date(slot.date).toISOString().split('T')[0];
      marked[date] = {
        marked: true,
        dotColor: '#48BB78',
        textColor: '#000000',
      };
    });

    // Mark selected date
    const selectedDateStr = selectedDate.toISOString().split('T')[0];
    if (marked[selectedDateStr]) {
      marked[selectedDateStr].selected = true;
      marked[selectedDateStr].selectedColor = '#48BB78';
    } else {
      marked[selectedDateStr] = {
        selected: true,
        selectedColor: '#48BB78',
      };
    }

    return marked;
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text style={{ color: 'white' }}>Loading...</Text>
      </View>
    );
  }

  if (!listing) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text style={{ color: 'white' }}>Listing not found</Text>
      </View>
    );
  }

  const screenWidth = Dimensions.get('window').width;

  return (
    <LinearGradient
      colors={['#1d434f', '#2e6165']}
      style={{ flex: 1 }}
    >
      <Stack.Screen
        options={{
          title: listing.title,
          headerStyle: { backgroundColor: '#1d434f' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      />

      <View className="flex-1">
        <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
          {/* Image Gallery */}
          <View style={{ height: screenWidth }}>
            <ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
            >
              {listing.images.map((img, index) => (
                <View
                  key={index}
                  style={{ width: screenWidth, height: screenWidth }}
                  className="flex justify-center items-center p-3"
                >
                  <Image
                    source={{ uri: img }}
                    contentFit="cover"
                    style={{ width: "100%", height: "100%", borderRadius: 10 }}
                  />
                </View>
              ))}
            </ScrollView>
          </View>

          {/* Content */}
          <View className="p-4">
            <Text className="text-2xl font-bold mb-2 text-white">{listing.title}</Text>
            <Text className="text-gray-400 mb-4">{listing.address}</Text>

            {/* Separator */}
            <View className="h-px bg-gray-500 my-2" />

            {/* Price */}
            <Text className="text-lg font-semibold mb-2 text-white">Price</Text>
            <Text className="text-gray-400 mb-4">${listing.pricePerHour}/hour</Text>

            {/* Separator */}
            <View className="h-px bg-gray-500 my-2" />

            {/* Description */}
            <Text className="text-lg font-semibold mb-2 text-white">Description</Text>
            <Text className="text-gray-400 mb-4">{listing.description}</Text>

            {/* Separator */}
            <View className="h-px bg-gray-500 my-2" />

            {/* Availability */}
            {listing.availability && listing.availability.length > 0 && (
              <>
                <Text className="text-lg font-semibold mb-2 text-white">Available Time</Text>
                {listing.availability.map((slot) => {
                  // Convert the date string into a readable format
                  const formattedDate = new Date(slot.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  });
                  return (
                    <View key={slot._id} className="mb-4">
                      <Text className="text-gray-400">Date: {formattedDate}</Text>
                      <Text className="text-gray-400">Time: {slot.availableFrom} - {slot.availableUntil}</Text>
                    </View>
                  );
                })}
              </>
            )}

            {/* Separator */}
            <View className="h-px bg-gray-500 my-2" />

            {/* Features */}
            {listing.features?.filter(f => f.trim() !== '').length > 0 && (
              <>
                <Text className="text-lg font-semibold mb-2 text-white">Features</Text>
                <View className="mb-4">
                  {listing.features.map((feature, index) =>
                    feature.trim() !== '' && (
                      <Text key={index} className="text-gray-400">• {feature}</Text>
                    )
                  )}
                </View>
              </>
            )}
          </View>
        </ScrollView>

        {/* Fixed Booking Button */}
        <View className="absolute bottom-0 left-0 right-0 bg-white p-4 border-t border-gray-200">
          <TouchableOpacity
            onPress={() => setShowBooking(true)}
            className="bg-[#48BB78] py-4 rounded-lg"
          >
            <Text style={{ color: 'white' }} className="text-center text-lg font-semibold">
              Book Now - ${listing.pricePerHour}
            </Text>
          </TouchableOpacity>
        </View>
            
        {/* Booking Modal */}
        {showBooking && (
          <View className="absolute inset-0 justify-center items-center bg-black bg-opacity-50">
            <View className="bg-white w-11/12 rounded-lg p-4">
              <Text className="text-xl font-bold mb-4 text-gray-800">Select Date & Time</Text>
              
              <Calendar
                current={selectedDate.toISOString().split('T')[0]}
                onDayPress={(day: DateData) => {
                  setSelectedDate(new Date(day.dateString));
                  // Reset times when date changes
                  const newDate = new Date(day.dateString);
                  setStartTime(newDate.toISOString());
                  setEndTime(new Date(newDate.getTime() + 1 * 60 * 60 * 1000).toISOString());
                }}
                markedDates={getMarkedDates()}
                theme={{
                  backgroundColor: '#ffffff',
                  calendarBackground: '#ffffff',
                  textSectionTitleColor: '#1d434f',
                  selectedDayBackgroundColor: '#48BB78',
                  selectedDayTextColor: '#ffffff',
                  todayTextColor: '#48BB78',
                  dayTextColor: '#2d3748',
                  textDisabledColor: '#d9d9d9',
                  dotColor: '#48BB78',
                  monthTextColor: '#1d434f',
                  arrowColor: '#48BB78',
                }}
              />
              
              <TimeSlider
                startTime={new Date(startTime)}
                endTime={new Date(endTime)}
                onStartTimeChange={(time) => setStartTime(time.toISOString())}
                onEndTimeChange={(time) => setEndTime(time.toISOString())}
                availableSlots={listing.availability || []}
                selectedDate={selectedDate}
              />

              <View className="mt-4">
                <Text className="text-gray-600 mb-2">Duration: {Math.round((new Date(endTime).getTime() - new Date(startTime).getTime()) / (1000 * 60 * 60) * 10) / 10} hours</Text>
                <Text className="text-gray-600 mb-4">Total: ${Math.round((new Date(endTime).getTime() - new Date(startTime).getTime()) / (1000 * 60 * 60) * listing.pricePerHour * 100) / 100}</Text>
              </View>

              <PaymentButton 
                amount={amount} 
                drivewayId={id as string} 
                startTime={startTime} 
                endTime={endTime} 
              />

              <TouchableOpacity
                onPress={() => setShowBooking(false)}
                className="mt-4 bg-gray-200 py-2 rounded"
              >
                <Text className="text-center text-gray-800">Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </LinearGradient>
  );
}
