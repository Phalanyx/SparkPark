import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Image,
  Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import PaymentButton from './Payment';
import PreferencesForm from './PreferencesForm';
import VehicleForm from './VehicleForm';
import auth from '@react-native-firebase/auth';
import { Redirect, router } from 'expo-router';

interface ProfileData {
  name?: string;
  email?: string;
  uid?: string;
  avatarUrl?: string;
}

interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: string;
  licensePlate: string;
  color: string;
}

interface ProfileScreenProps {
  data: ProfileData;
  handleLogout: () => void;
}

export default function ProfileScreen({ data, handleLogout }: ProfileScreenProps) {
  const [showPreferences, setShowPreferences] = useState(false);
  const [showVehicleForm, setShowVehicleForm] = useState(false);
  const [preferences, setPreferences] = useState<any>(null);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | undefined>();

  useEffect(() => {
    fetchPreferences();
    fetchVehicles();
  }, []);

  const fetchPreferences = async () => {
    try {
      const user = auth().currentUser;
      if (!user) return;

      const token = await user.getIdToken();
      const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND}/preferences/${user.uid}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setPreferences(data);
      }
    } catch (error) {
      console.error('Error fetching preferences:', error);
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

  const handleAddVehicle = async (vehicle: Vehicle) => {
    try {
      const user = auth().currentUser;
      if (!user) return;

      const token = await user.getIdToken();
      const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND}/user/vehicles`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(vehicle)
      });

      if (response.ok) {
        Alert.alert('Success', 'Vehicle added successfully');
        fetchVehicles();
      } else {
        throw new Error('Failed to add vehicle');
      }
    } catch (error) {
      console.error('Error adding vehicle:', error);
      Alert.alert('Error', 'Failed to add vehicle');
    }
  };

  const handleUpdateVehicle = async (vehicle: Vehicle) => {
    try {
      const user = auth().currentUser;
      if (!user) return;

      const token = await user.getIdToken();
      const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND}/user/vehicles/${vehicle.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(vehicle)
      });

      if (response.ok) {
        Alert.alert('Success', 'Vehicle updated successfully');
        fetchVehicles();
      } else {
        throw new Error('Failed to update vehicle');
      }
    } catch (error) {
      console.error('Error updating vehicle:', error);
      Alert.alert('Error', 'Failed to update vehicle');
    }
  };

  const handleDeleteVehicle = async (vehicleId: string) => {
    try {
      const user = auth().currentUser;
      if (!user) return;

      const token = await user.getIdToken();
      const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND}/user/vehicles/${vehicleId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        Alert.alert('Success', 'Vehicle deleted successfully');
        fetchVehicles();
      } else {
        throw new Error('Failed to delete vehicle');
      }
    } catch (error) {
      console.error('Error deleting vehicle:', error);
      Alert.alert('Error', 'Failed to delete vehicle');
    }
  };

  const renderAvatar = () => {
    const initial = auth().currentUser?.displayName ? auth().currentUser?.displayName?.charAt(0).toUpperCase() : 'D';
    return (
      <View className="w-14 h-14 bg-blue-400 rounded-full justify-center items-center">
        <Text className="text-2xl font-bold text-white">{initial}</Text>
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
          <View className="px-6 pt-20 pb-6">
            <View className="flex-row items-center space-x-4 gap-3">
              {renderAvatar()}
              <View>
                <Text className="text-white text-2xl font-bold">
                  {auth().currentUser?.displayName || 'No name specified'}
                </Text>
                <Text className="text-gray-300">{auth().currentUser?.email}</Text>
              </View>
            </View>
          </View>

          {/* Main content container */}
          <View className="flex-1 bg-white/10 rounded-t-3xl px-6 py-8">
            {/* GENERAL SETTINGS */}
            <View className="mb-8">
              <Text className="text-white text-xl font-bold mb-4">General Settings</Text>
              <View className="space-y-4 gap-2">
                <TouchableOpacity className="flex-row items-center justify-between bg-white/10 p-4 rounded-xl">
                  <View className="flex-row items-center space-x-3">
                    <Ionicons name="person-outline" size={24} color="white" />
                    <Text className="text-white text-lg">Personal information</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={24} color="white" />
                </TouchableOpacity>

                <TouchableOpacity className="flex-row items-center justify-between bg-white/10 p-4 rounded-xl">
                  <View className="flex-row items-center space-x-3">
                    <Ionicons name="notifications-outline" size={24} color="white" />
                    <Text className="text-white text-lg">Notifications</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </View>

            {/* TRAVELLING SETTINGS */}
            <View className="mb-8">
              <Text className="text-white text-xl font-bold mb-4">Travelling Settings</Text>
              <View className="space-y-4 gap-2">
                <View className="bg-white/10 rounded-xl p-4">
                  <View className="flex-row items-center justify-between mb-4">
                    <View className="flex-row items-center space-x-3">
                      <Ionicons name="car-outline" size={24} color="white" />
                      <Text className="text-white text-lg">My Vehicles</Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        setSelectedVehicle(undefined);
                        setShowVehicleForm(true);
                      }}
                      className="bg-[#48BB78] px-4 py-2 rounded-full"
                    >
                      <Text className="text-white">Add Vehicle</Text>
                    </TouchableOpacity>
                  </View>
                  
                  {vehicles.length === 0 ? (
                    <Text className="text-gray-300 text-center py-4">No vehicles added yet</Text>
                  ) : (
                    <View className="space-y-3 gap-2">
                      {vehicles.map((vehicle) => (
                        <View key={vehicle.id} className="bg-[#2F4858] rounded-lg p-4">
                          <View className="flex-row justify-between items-start">
                            <View>
                              <Text className="text-white text-lg font-semibold">
                                {vehicle.make} {vehicle.model}
                              </Text>
                              <Text className="text-gray-300">{vehicle.year}</Text>
                              <Text className="text-gray-300">Plate: {vehicle.licensePlate}</Text>
                              <Text className="text-gray-300">Color: {vehicle.color}</Text>
                            </View>
                            <View className="flex-row space-x-2">
                              <TouchableOpacity
                                onPress={() => {
                                  setSelectedVehicle(vehicle);
                                  setShowVehicleForm(true);
                                }}
                                className="bg-blue-500 p-2 rounded-full"
                              >
                                <Ionicons name="pencil" size={20} color="white" />
                              </TouchableOpacity>
                              <TouchableOpacity
                                onPress={() => handleDeleteVehicle(vehicle.id)}
                                className="bg-red-500 p-2 rounded-full"
                              >
                                <Ionicons name="trash" size={20} color="white" />
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      ))}
                    </View>
                  )}
                </View>

                <TouchableOpacity 
                  onPress={() => setShowPreferences(true)}
                  className="flex-row items-center justify-between bg-white/10 p-4 rounded-xl"
                >
                  <View className="flex-row items-center space-x-3">
                    <Ionicons name="settings-outline" size={24} color="white" />
                    <Text className="text-white text-lg">My Preferences</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={24} color="white" />
                </TouchableOpacity>

                <TouchableOpacity 
                  onPress={() => router.push('/(tabs)/booking')}
                  className="flex-row items-center justify-between bg-white/10 p-4 rounded-xl"
                >
                  <View className="flex-row items-center space-x-3">
                    <Ionicons name="card-outline" size={24} color="white" />
                    <Text className="text-white text-lg">Payment History</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </View>

            {/* HOSTING SETTINGS */}
            <View className="mb-8">
              <Text className="text-white text-xl font-bold mb-4">Hosting Settings</Text>
              <View className="space-y-4 gap-2">
                <TouchableOpacity 
                  className="flex-row items-center justify-between bg-white/10 p-4 rounded-xl"
                  onPress={() => router.push('/(tabs)/listing')}
                >
                  <View className="flex-row items-center space-x-3">
                    <Ionicons name="home-outline" size={24} color="white" />
                    <Text className="text-white text-lg">My Listings</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={24} color="white" />
                </TouchableOpacity>

                <TouchableOpacity 
                  className="flex-row items-center justify-between bg-white/10 p-4 rounded-xl"
                  onPress={() => router.push('/listing/add')}
                >
                  <View className="flex-row items-center space-x-3">
                    <Ionicons name="add-circle-outline" size={24} color="white" />
                    <Text className="text-white text-lg">List New Space</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Logout Button */}
            <TouchableOpacity
              onPress={handleLogout}
              className="bg-red-500 py-4 rounded-xl mt-4"
            >
              <Text className="text-white text-center font-semibold text-lg">Logout</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Preferences Modal */}
      <PreferencesForm
        visible={showPreferences}
        onClose={() => {
          setShowPreferences(false);
          fetchPreferences();
        }}
        initialData={preferences}
      />

      {/* Vehicle Form Modal */}
      <VehicleForm
        visible={showVehicleForm}
        onClose={() => {
          setShowVehicleForm(false);
          setSelectedVehicle(undefined);
        }}
        initialData={selectedVehicle}
        onSave={(vehicle) => {
          if (selectedVehicle) {
            handleUpdateVehicle(vehicle);
          } else {
            handleAddVehicle(vehicle);
          }
        }}
      />
    </LinearGradient>
  );
}
