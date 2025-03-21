import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
  Button
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

interface ProfileData {
  name?: string;
  email?: string;
  uid?: string;
  avatarUrl?: string;
}

interface ProfileScreenProps {
  data: ProfileData;
  handleLogout: () => void;
}

export default function ProfileScreen({ data, handleLogout }: ProfileScreenProps) {
  // Use the avatarUrl if provided, otherwise fallback to an initial-based placeholder
  const renderAvatar = () => {
    console.log(data)
    if (data?.avatarUrl) {
      return <Image source={{ uri: data.avatarUrl }} className="w-14 h-14 rounded-full" />;
    }
    // If no avatar URL, display the first letter of the name or "D" as a default
    const initial = data?.name ? data.name.charAt(0).toUpperCase() : 'D';
    return (
      <View className="w-14 h-14 bg-blue-300 rounded-full mr-3 justify-center items-center">
        <Text className="text-xl font-bold text-white">{initial}</Text>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={['#1d434f', '#2e6165']}
      style={{ flex: 1 }}
    >
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {/* Profile Header */}
          <View className="px-4 pt-6 pb-4 mt-10">
            <Text className="text-white text-2xl font-bold mb-2">Profile</Text>
            <View className="flex-row items-center">
              {renderAvatar()}
              <View>
                <Text className="text-white text-lg font-semibold">
                  {data?.name || 'No name specified'}
                </Text>
                <Text className="text-white text-sm">View profile</Text>
              </View>
            </View>
          </View>

          {/* Main content container - white background */}
          <View className="flex-1 bg-white rounded-t-3xl px-4 py-6">
            {/* GENERAL SETTINGS */}
            <Text className="text-lg font-bold mb-3">General Settings</Text>
            <TouchableOpacity className="flex-row items-center justify-between py-3 border-b border-gray-200">
              <Text className="text-base">Personal information</Text>
              <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center justify-between py-3 border-b border-gray-200">
              <Text className="text-base">Login & security</Text>
              <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center justify-between py-3 border-b border-gray-200 mb-4">
              <Text className="text-base">Notifications</Text>
              <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            </TouchableOpacity>

            {/* TRAVELLING SETTINGS */}
            <Text className="text-lg font-bold mb-3">Travelling Settings</Text>
            <View className="flex-row items-center justify-between py-3 border-b border-gray-200">
              <View>
                <Text className="text-base">My Vehicles</Text>
                {/* You can add vehicle icons here if desired */}
              </View>
              <Text className="text-blue-600 text-sm font-medium">Manage my vehicles</Text>
            </View>
            <TouchableOpacity className="flex-row items-center justify-between py-3 border-b border-gray-200">
              <Text className="text-base">My preferences</Text>
              <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center justify-between py-3 border-b border-gray-200">
              <Text className="text-base">Payment and transaction history</Text>
              <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            </TouchableOpacity>


            {/* HOSTING SETTINGS */}
            <Text className="text-lg font-bold mb-3">Hosting Settings</Text>
            <View className="flex-row items-center justify-between py-3 border-b border-gray-200">
              <Text className="text-base">My listings</Text>
              <Text className="text-blue-600 text-sm font-medium">Manage my spaces</Text>
            </View>
            <TouchableOpacity className="flex-row items-center justify-between py-3 border-b border-gray-200">
              <Text className="text-base">List your new space</Text>
              <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center justify-between py-3 border-b border-gray-200">
              <Text className="text-base">Learn about hosting</Text>
              <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center justify-between py-3 border-b border-gray-200 mb-4">
              <Text className="text-base">Payout and transaction history</Text>
              <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            </TouchableOpacity>

            {/* Logout Button */}
            <View className="mt-4">
  <TouchableOpacity
    onPress={handleLogout}
    className="bg-red-600 py-3 rounded-md"
  >
    <Text className="text-center text-white font-semibold">Logout</Text>
  </TouchableOpacity>
</View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
