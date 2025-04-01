import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import auth from '@react-native-firebase/auth';

interface Listing {
  _id: string;
  title: string;
  address: string;
  description: string;
  images: string[];
  pricePerHour: number;
  features: string[];
  size: { length: number; width: number };
}

export default function ListingsScreen() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const user = auth().currentUser;
      if (!user) return;

      const token = await user.getIdToken();
      const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND}/user-listings`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setListings(data);
      } else {
        throw new Error('Failed to fetch listings');
      }
    } catch (error) {
      console.error('Error fetching listings:', error);
      Alert.alert('Error', 'Failed to load your listings');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteListing = async (listingId: string) => {
    try {
      const user = auth().currentUser;
      if (!user) return;

      const token = await user.getIdToken();
      const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND}/listings/${listingId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        Alert.alert('Success', 'Listing deleted successfully');
        fetchListings();
      } else {
        throw new Error('Failed to delete listing');
      }
    } catch (error) {
      console.error('Error deleting listing:', error);
      Alert.alert('Error', 'Failed to delete listing');
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-white">Loading...</Text>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={['#1d434f', '#2e6165']}
      style={{ flex: 1, paddingTop: 70 }}
    >
      <View className="flex-1">
        <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-700">
          <Text className="text-xl font-bold text-white">My Listings</Text>
          <TouchableOpacity
            onPress={() => router.push('/listing/add')}
            className="bg-[#48BB78] px-4 py-2 rounded-full"
          >
            <Text className="text-white">Add New Listing</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="flex-1 p-4">
          {listings.length === 0 ? (
            <View className="flex-1 justify-center items-center py-8">
              <Ionicons name="home-outline" size={48} color="#9CA3AF" />
              <Text className="text-gray-400 text-center mt-4">No listings found</Text>
              <TouchableOpacity
                onPress={() => router.push('/listing/add')}
                className="mt-4 bg-[#48BB78] px-6 py-3 rounded-full"
              >
                <Text className="text-white">Create Your First Listing</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View className="space-y-4 gap-3">
              {listings.map((listing) => (
                <TouchableOpacity
                  key={listing._id}
                  onPress={() => router.push(`/listing/${listing._id}`)}
                  className="bg-[#2F4858] rounded-xl overflow-hidden flex-row"
                >
                  {listing.images.length > 0 ? (
                    <Image
                      source={{ uri: listing.images[0] }}
                      className="w-1/3 h-full"
                      resizeMode="cover"
                    />
                  ) : (
                    <View className="w-32 h-32 bg-gray-700 justify-center items-center">
                      <Ionicons name="image-outline" size={40} color="#9CA3AF" />
                    </View>
                  )}
                  <View className="flex-1 p-4">
                    <Text className="text-white text-lg font-semibold">{listing.title}</Text>
                    <Text className="text-gray-300 mt-1">{listing.address}</Text>
                    <Text className="text-gray-400 mt-2" numberOfLines={2}>
                      {listing.description}
                    </Text>
                    <Text className="text-white font-semibold mt-4">
                      ${listing.pricePerHour}/hour
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </ScrollView>
      </View>
    </LinearGradient>
  );
}
