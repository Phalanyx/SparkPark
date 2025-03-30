import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import auth from '@react-native-firebase/auth';

interface Booking {
  _id: string;
  startTime: string;
  endTime: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
  vehicleDetails?: {
    make: string;
    model: string;
    licensePlate: string;
    color: string;
  };
}

export default function BookingScreen() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const user = auth().currentUser;

  useEffect(() => {
    fetchBookings();
  }, [user]);

  const fetchBookings = async () => {
    try {
      let token = await user?.getIdToken();

      const response = await fetch('http://localhost:4000/bookings/all',
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
        return 'bg-green-100 text-green-800';
  };

  const renderBookingCard = ({ item }: { item: Booking }) => (
    <TouchableOpacity className="bg-white rounded-xl shadow-sm mb-4 p-4 mx-4">
      <View className="flex-row justify-between items-start mb-2">
        <View>
          <Text className="text-lg font-semibold text-gray-800">
            {formatDate(item.startTime)}
          </Text>
          <Text className="text-sm text-gray-500">
            to {formatDate(item.endTime)}
          </Text>
        </View>
        <View className={`px-3 py-1 rounded-full ${getStatusColor(item.status)}`}>
          <Text className="text-xs font-medium capitalize">{"Confirmed"}</Text>
        </View>
      </View>

      <View className="flex-row items-center mb-2">
        <Ionicons name="car-outline" size={16} color="#4B5563" />
        <Text className="text-sm text-gray-600 ml-1">
          {item.vehicleDetails?.make} {item.vehicleDetails?.model} ({item.vehicleDetails?.licensePlate})
        </Text>
      </View>

      <View className="flex-row justify-between items-center mt-2">
        <View className="flex-row items-center">
          <Ionicons name="cash-outline" size={16} color="#4B5563" />
          <Text className="text-sm font-medium text-gray-800 ml-1">
            ${item.totalPrice.toFixed(2)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#1d434f" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
        <Text className="text-xl font-bold text-gray-800">My Bookings</Text>
        <TouchableOpacity onPress={fetchBookings}>
          <Ionicons name="refresh-outline" size={24} color="#1d434f" />
        </TouchableOpacity>
      </View>

      {bookings.length === 0 ? (
        <View className="flex-1 justify-center items-center px-4">
          <Ionicons name="calendar-outline" size={48} color="#9CA3AF" />
          <Text className="text-gray-500 text-center mt-2">No bookings found</Text>
        </View>
      ) : (
        <FlatList
          data={bookings}
          renderItem={renderBookingCard}
          keyExtractor={(item) => item._id}
          contentContainerClassName="py-4"
        />
      )}
    </SafeAreaView>
  );
}
