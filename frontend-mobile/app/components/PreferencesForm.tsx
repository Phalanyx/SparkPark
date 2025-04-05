import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Switch,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import auth from '@react-native-firebase/auth';

interface Preferences {
  preferredSpotSize: {
    length: number;
    width: number;
  };
  maxPricePerHour: number;
  maxPricePerDay?: number;
  maxPricePerMonth?: number;
  preferredSearchRadius: number;
  coveredParking: boolean;
  EVCharging: boolean;
  securityFeatures: boolean;
  payAsYouGoPreferred: boolean;
  defaultParkingDuration: number;
}

interface PreferencesFormProps {
  visible: boolean;
  onClose: () => void;
  initialData?: Preferences;
}

export default function PreferencesForm({ visible, onClose, initialData }: PreferencesFormProps) {
  const [preferences, setPreferences] = useState<Preferences>({
    preferredSpotSize: {
      length: 5.5,
      width: 2.7
    },
    maxPricePerHour: 10,
    preferredSearchRadius: 5,
    coveredParking: false,
    EVCharging: false,
    securityFeatures: false,
    payAsYouGoPreferred: false,
    defaultParkingDuration: 2
  });

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const user = auth().currentUser;
        if (!user) return;

        const token = await user.getIdToken();
        const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND}/preferences/get`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          
          // Check for missing fields and use defaults if needed
          const updatedPreferences = {
            preferredSpotSize: {
              length: data.preferredSpotSize?.length || 5.5,
              width: data.preferredSpotSize?.width || 2.7
            },
            maxPricePerHour: data.maxPricePerHour || 10,
            preferredSearchRadius: data.preferredSearchRadius || 5,
            coveredParking: data.coveredParking ?? false,
            EVCharging: data.EVCharging ?? false,
            securityFeatures: data.securityFeatures ?? false,
            payAsYouGoPreferred: data.payAsYouGoPreferred ?? false,
            defaultParkingDuration: data.defaultParkingDuration || 2
          };

          // Log which fields were missing
          const missingFields = [];
          if (!data.preferredSpotSize?.length || !data.preferredSpotSize?.width) missingFields.push('Spot Size');
          if (!data.maxPricePerHour) missingFields.push('Max Price per Hour');
          if (!data.preferredSearchRadius) missingFields.push('Search Radius');
          if (data.coveredParking === undefined) missingFields.push('Covered Parking');
          if (data.EVCharging === undefined) missingFields.push('EV Charging');
          if (data.securityFeatures === undefined) missingFields.push('Security Features');
          if (data.payAsYouGoPreferred === undefined) missingFields.push('Pay As You Go Preference');
          if (!data.defaultParkingDuration) missingFields.push('Default Parking Duration');

          if (missingFields.length > 0) {
            console.log('Missing preferences fields:', missingFields);
            Alert.alert(
              'Missing Preferences',
              `The following preferences were not set: ${missingFields.join(', ')}. Using default values.`
            );
          }

          setPreferences(updatedPreferences);
        }
      } catch (error) {
        console.error('Error fetching preferences:', error);
        Alert.alert('Error', 'Failed to fetch preferences. Using default values.');
      }
    };
    if (visible) {
      fetchPreferences();
    }
  }, [visible]);

  const handleSubmit = async () => {
    try {
      const user = auth().currentUser;
      if (!user) {
        Alert.alert('Error', 'User not authenticated');
        return;
      }

      const token = await user.getIdToken();
      const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND}/preferences/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          userId: user.uid,
          ...preferences
        })
      });

      if (!response.ok) {
        throw new Error('Failed to save preferences');
      }

      Alert.alert('Success', 'Preferences updated successfully');
      onClose();
    } catch (error) {
      console.error('Error saving preferences:', error);
      Alert.alert('Error', 'Failed to save preferences');
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
    >
      <LinearGradient
        colors={['#1d434f', '#2e6165']}
        style={{ flex: 1 }}
      >
        <View className="flex-1">
          {/* Header */}
          <View className="flex-row items-center justify-between p-6 border-b border-gray-300 mt-10">
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="white" />
            </TouchableOpacity>
            <Text className="text-xl font-bold text-white">Parking Preferences</Text>
          </View>

          <ScrollView className="flex-1 p-4">
            {/* Spot Size */}
            <View className="bg-white/10 rounded-lg p-4 mb-4">
              <Text className="text-white text-lg font-semibold mb-2">Spot Size</Text>
              
              {/* Size categories */}
              <View className="flex-row flex-wrap gap-2 mb-4">
                {[
                  { minSize: '10.0 x 4.5', category: 'X-LARGE', examples: 'RV, bus, large truck' },
                  { minSize: '6.5 x 3.0',  category: 'LARGE',   examples: 'Van, minivans, pickup' },
                  { minSize: '5.5 x 2.7',  category: 'MEDIUM',  examples: 'Small/crossover SUV' },
                  { minSize: '5.0 x 2.5',  category: 'SMALL',   examples: 'Sedan' },
                  { minSize: '3.5 x 1.8',  category: 'X-SMALL', examples: 'Motorcycle, scooter, etc.' },
                ].map((row, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      const [len, wid] = row.minSize.split('x').map(s => s.trim());
                      setPreferences({
                        ...preferences,
                        preferredSpotSize: {
                          length: parseFloat(len),
                          width: parseFloat(wid)
                        }
                      });
                    }}
                    className={`px-4 py-2 rounded-full border ${
                      preferences.preferredSpotSize.length === parseFloat(row.minSize.split('x')[0].trim()) &&
                      preferences.preferredSpotSize.width === parseFloat(row.minSize.split('x')[1].trim())
                        ? 'bg-[#48BB78] border-[#48BB78]'
                        : 'bg-[#2F4858] border-gray-400'
                    }`}
                  >
                    <Text className="text-white">{row.category}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Manual input */}
              <View className="space-y-2">
                <View className="flex-row space-x-4">
                  <View className="flex-1">
                    <Text className="text-gray-300">Length (m)</Text>
                    <TextInput
                      className="bg-white/20 text-white p-2 rounded"
                      value={preferences.preferredSpotSize.length.toString()}
                      onChangeText={(text) => setPreferences({
                        ...preferences,
                        preferredSpotSize: {
                          ...preferences.preferredSpotSize,
                          length: parseFloat(text) || 0
                        }
                      })}
                      keyboardType="numeric"
                    />
                  </View>
                  <View className="flex-1">
                    <Text className="text-gray-300">Width (m)</Text>
                    <TextInput
                      className="bg-white/20 text-white p-2 rounded"
                      value={preferences.preferredSpotSize.width.toString()}
                      onChangeText={(text) => setPreferences({
                        ...preferences,
                        preferredSpotSize: {
                          ...preferences.preferredSpotSize,
                          width: parseFloat(text) || 0
                        }
                      })}
                      keyboardType="numeric"
                    />
                  </View>
                </View>
              </View>
            </View>

            {/* Pricing */}
            <View className="bg-white/10 rounded-lg p-4 mb-4">
              <Text className="text-white text-lg font-semibold mb-2">Pricing</Text>
              <View className="space-y-2">
                <View>
                  <Text className="text-gray-300">Max Price per Hour ($)</Text>
                  <TextInput
                    className="bg-white/20 text-white p-2 rounded"
                    value={preferences.maxPricePerHour.toString()}
                    onChangeText={(text) => setPreferences({
                      ...preferences,
                      maxPricePerHour: parseFloat(text) || 0
                    })}
                    keyboardType="numeric"
                  />
                </View>
                <View>
                  <Text className="text-gray-300">Max Price per Day ($)</Text>
                  <TextInput
                    className="bg-white/20 text-white p-2 rounded"
                    value={preferences.maxPricePerDay?.toString() || ''}
                    onChangeText={(text) => setPreferences({
                      ...preferences,
                      maxPricePerDay: parseFloat(text) || undefined
                    })}
                    keyboardType="numeric"
                  />
                </View>
                <View>
                  <Text className="text-gray-300">Max Price per Month ($)</Text>
                  <TextInput
                    className="bg-white/20 text-white p-2 rounded"
                    value={preferences.maxPricePerMonth?.toString() || ''}
                    onChangeText={(text) => setPreferences({
                      ...preferences,
                      maxPricePerMonth: parseFloat(text) || undefined
                    })}
                    keyboardType="numeric"
                  />
                </View>
              </View>
            </View>

            {/* Search Radius */}
            <View className="bg-white/10 rounded-lg p-4 mb-4">
              <Text className="text-white text-lg font-semibold mb-2">Search Radius</Text>
              <View>
                <Text className="text-gray-300">Preferred Search Radius (km)</Text>
                <TextInput
                  className="bg-white/20 text-white p-2 rounded"
                  value={preferences.preferredSearchRadius.toString()}
                  onChangeText={(text) => setPreferences({
                    ...preferences,
                    preferredSearchRadius: parseFloat(text) || 0
                  })}
                  keyboardType="numeric"
                />
              </View>
            </View>

            {/* Features */}
            <View className="bg-white/10 rounded-lg p-4 mb-4">
              <Text className="text-white text-lg font-semibold mb-2">Features</Text>
              <View className="space-y-4">
                <View className="flex-row justify-between items-center">
                  <Text className="text-gray-300">Covered Parking</Text>
                  <Switch
                    value={preferences.coveredParking}
                    onValueChange={(value) => setPreferences({
                      ...preferences,
                      coveredParking: value
                    })}
                  />
                </View>
                <View className="flex-row justify-between items-center">
                  <Text className="text-gray-300">EV Charging</Text>
                  <Switch
                    value={preferences.EVCharging}
                    onValueChange={(value) => setPreferences({
                      ...preferences,
                      EVCharging: value
                    })}
                  />
                </View>
                <View className="flex-row justify-between items-center">
                  <Text className="text-gray-300">Security Features</Text>
                  <Switch
                    value={preferences.securityFeatures}
                    onValueChange={(value) => setPreferences({
                      ...preferences,
                      securityFeatures: value
                    })}
                  />
                </View>
              </View>
            </View>

            {/* Payment Preferences */}
            <View className="bg-white/10 rounded-lg p-4 mb-4">
              <Text className="text-white text-lg font-semibold mb-2">Payment Preferences</Text>
              <View className="space-y-4">
                <View className="flex-row justify-between items-center">
                  <Text className="text-gray-300">Pay As You Go</Text>
                  <Switch
                    value={preferences.payAsYouGoPreferred}
                    onValueChange={(value) => setPreferences({
                      ...preferences,
                      payAsYouGoPreferred: value
                    })}
                  />
                </View>
                {!preferences.payAsYouGoPreferred && (
                  <View>
                    <Text className="text-gray-300">Default Parking Duration (hours)</Text>
                    <TextInput
                      className="bg-white/20 text-white p-2 rounded"
                      value={preferences.defaultParkingDuration.toString()}
                      onChangeText={(text) => setPreferences({
                        ...preferences,
                        defaultParkingDuration: parseInt(text) || 0
                      })}
                      keyboardType="numeric"
                    />
                  </View>
                )}
              </View>
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              onPress={handleSubmit}
              className="bg-[#48BB78] py-4 rounded-lg mb-8"
            >
              <Text className="text-white text-center font-semibold text-lg">Save Preferences</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </LinearGradient>
    </Modal>
  );
} 