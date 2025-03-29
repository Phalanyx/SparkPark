import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { useLocalSearchParams, Stack } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import PaymentButton from '../components/Payment';
import 'react-native-gesture-handler';

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

  useEffect(() => {
    fetchListingDetails();
  }, [id]);

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
              <Text style={{ color: 'white' }} className="text-xl font-bold mb-4">Confirm Booking</Text>
              <Text style={{ color: 'white' }} className="text-gray-600 mb-2">Duration: hour</Text>
              <Text style={{ color: 'white' }} className="text-gray-600 mb-4">Total: ${listing.pricePerHour}</Text>

              <PaymentButton amount={listing.pricePerHour} />

              <TouchableOpacity
                onPress={() => setShowBooking(false)}
                className="mt-4 bg-gray-200 py-2 rounded"
              >
                <Text style={{ color: 'white' }} className="text-center">Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </LinearGradient>
  );
}
