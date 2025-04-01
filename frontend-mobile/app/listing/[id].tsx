import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { Image } from 'expo-image';
import { useLocalSearchParams, Stack } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import PaymentButton from '../components/Payment';
import 'react-native-gesture-handler';
import TimeSlider from '../components/TimeSlider';
import { Calendar, DateData } from 'react-native-calendars';
import auth from '@react-native-firebase/auth';

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
  size: { length: number; width: number };
}

interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: string;
  licensePlate: string;
  color: string;
}

// Add size guide data
const sizeGuideData = [
  { minSize: '10.0 x 4.5', category: 'X-LARGE', examples: 'RV, bus, large truck' },
  { minSize: '6.5 x 3.0',  category: 'LARGE',   examples: 'Van, minivans, pickup' },
  { minSize: '5.5 x 2.7',  category: 'MEDIUM',  examples: 'Small/crossover SUV' },
  { minSize: '5.0 x 2.5',  category: 'SMALL',   examples: 'Sedan' },
  { minSize: '3.5 x 1.8',  category: 'X-SMALL', examples: 'Motorcycle, scooter, etc.' },
];

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
    size: { length: 0, width: 0 },
  });
  const [loading, setLoading] = useState(true);
  const [showBooking, setShowBooking] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date().toISOString());
  const [endTime, setEndTime] = useState(new Date(new Date().getTime() + 1 * 60 * 60 * 1000).toISOString());
  const [amount, setAmount] = useState(0);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  useEffect(() => {
    fetchListingDetails();
    fetchVehicles();
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

  const fetchVehicles = async () => {
    try {
      const user = auth().currentUser;
      if (!user) return;

      const token = await user.getIdToken();
      const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND}/user/vehicles`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setVehicles(data.vehicles || []);
      }
    } catch (error) {
      console.error('Error fetching vehicles:', error);
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

  const getSizeCategory = (length: number, width: number) => {
    return sizeGuideData.find(cat => {
      const [minLength, minWidth] = cat.minSize.split('x').map(s => parseFloat(s.trim()));
      return length >= minLength && width >= minWidth;
    })?.category || 'CUSTOM';
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

            {/* Size Information */}
            <Text className="text-lg font-semibold mb-2 text-white">Space Size</Text>
            <View className="bg-[#2F4858] p-4 rounded-xl mb-4">
              <Text className="text-white text-lg">
                {listing.size.length}m x {listing.size.width}m
              </Text>
              <Text className="text-gray-300">
                Category: {getSizeCategory(listing.size.length, listing.size.width)}
              </Text>
              <Text className="text-gray-400 text-sm mt-1">
                {sizeGuideData.find(cat => cat.category === getSizeCategory(listing.size.length, listing.size.width))?.examples}
              </Text>
            </View>

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

          <TouchableOpacity
            onPress={() => setShowBooking(true)}
            className="bg-[#1d434f] py-6 absolute bottom-0 left-0 right-0 p-4  backdrop-blur-sm border-t border-gray-700"
          >
            <Text className="text-white text-center text-lg font-semibold">
              Book Now - ${listing.pricePerHour}/hour
            </Text>
          </TouchableOpacity>
            
        {/* Booking Modal */}
        {showBooking && (
          <View className="absolute inset-0 pt-10 flex-1 justify-center items-center bg-black/70">
            <LinearGradient
              colors={['#1d434f', '#2e6165']}
              style={{borderRadius: 20, maxHeight: '100%'}}
            >
              <ScrollView className="w-[90vw] rounded-2xl p-6">
                <Text className="text-2xl font-bold text-white">Select Date & Time</Text>
                
                <Calendar
                  current={selectedDate.toISOString().split('T')[0]}
                  onDayPress={(day: DateData) => {
                    setSelectedDate(new Date(day.dateString));
                    const newDate = new Date(day.dateString);
                    setStartTime(newDate.toISOString());
                    setEndTime(new Date(newDate.getTime() + 1 * 60 * 60 * 1000).toISOString());
                  }}
                  markedDates={getMarkedDates()}
                  theme={{
                    backgroundColor: 'transparent',
                    calendarBackground: 'transparent',
                    textSectionTitleColor: '#ffffff',
                    selectedDayBackgroundColor: '#48BB78',
                    selectedDayTextColor: '#ffffff',
                    todayTextColor: '#48BB78',
                    dayTextColor: '#ffffff',
                    textDisabledColor: '#666666',
                    dotColor: '#48BB78',
                    monthTextColor: '#ffffff',
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

                {/* Vehicle Selection */}
                <View className="mt-6">
                  <Text className="text-white text-lg font-semibold mb-3">Select Vehicle</Text>
                  {vehicles.length === 0 ? (
                    <TouchableOpacity 
                      onPress={() => Alert.alert('Add Vehicle', 'Please add a vehicle in your profile before booking.')}
                      className="bg-[#2F4858] p-4 rounded-xl"
                    >
                      <Text className="text-white text-center">Add Vehicle in Profile</Text>
                    </TouchableOpacity>
                  ) : (
                    <ScrollView className="max-h-40">
                      {vehicles.map((vehicle) => (
                        <TouchableOpacity
                          key={vehicle.id}
                          onPress={() => setSelectedVehicle(vehicle)}
                          className={`p-4 rounded-xl mb-2 ${
                            selectedVehicle?.id === vehicle.id ? 'bg-[#48BB78]' : 'bg-[#2F4858]'
                          }`}
                        >
                          <Text className="text-white font-semibold">
                            {vehicle.make} {vehicle.model}
                          </Text>
                          <Text className="text-gray-300">{vehicle.year}</Text>
                          <Text className="text-gray-300">Plate: {vehicle.licensePlate}</Text>
                          <Text className="text-gray-300">Color: {vehicle.color}</Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  )}
                </View>

                <View className="mt-6 bg-[#2F4858] p-4 rounded-xl">
                  <Text className="text-white mb-2">Duration: {Math.round((new Date(endTime).getTime() - new Date(startTime).getTime()) / (1000 * 60 * 60) * 10) / 10} hours</Text>
                  <Text className="text-white font-semibold text-lg">Total: ${Math.round((new Date(endTime).getTime() - new Date(startTime).getTime()) / (1000 * 60 * 60) * listing.pricePerHour * 100) / 100}</Text>
                </View>

                <PaymentButton 
                  amount={amount} 
                  drivewayId={id as string} 
                  startTime={startTime} 
                  endTime={endTime}
                  vehicleDetails={selectedVehicle ? {
                    make: selectedVehicle.make,
                    model: selectedVehicle.model,
                    licensePlate: selectedVehicle.licensePlate,
                    color: selectedVehicle.color
                  } : undefined}
                />

                <TouchableOpacity
                  onPress={() => setShowBooking(false)}
                  className="mt-4 bg-[#2F4858] py-3 rounded-xl"
                >
                  <Text className="text-center text-white font-semibold">Cancel</Text>
                </TouchableOpacity>
              </ScrollView>
            </LinearGradient>
          </View>
        )}
      </View>
    </LinearGradient>
  );
}
