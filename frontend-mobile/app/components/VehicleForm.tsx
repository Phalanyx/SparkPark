import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import auth from '@react-native-firebase/auth';

interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: string;
  licensePlate: string;
  color: string;
}

interface VehicleFormProps {
  visible: boolean;
  onClose: () => void;
  initialData?: Vehicle;
  onSave: (vehicle: Vehicle) => void;
}

export default function VehicleForm({ visible, onClose, initialData, onSave }: VehicleFormProps) {
  const [vehicle, setVehicle] = useState<Vehicle>({
    id: '',
    make: '',
    model: '',
    year: '',
    licensePlate: '',
    color: ''
  });

  useEffect(() => {
    if (initialData) {
      setVehicle(initialData);
    } else {
      setVehicle({
        id: '',
        make: '',
        model: '',
        year: '',
        licensePlate: '',
        color: ''
      });
    }
  }, [initialData]);

  const handleSubmit = () => {
    if (!vehicle.make || !vehicle.model || !vehicle.year || !vehicle.licensePlate || !vehicle.color) {
      Alert.alert('Error', 'All fields are required');
      return;
    }
    onSave(vehicle);
    onClose();
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
            <Text className="text-xl font-bold text-white">
              {initialData ? 'Edit Vehicle' : 'Add New Vehicle'}
            </Text>
          </View>

          <ScrollView className="flex-1 p-4">
            <View className="bg-white/10 rounded-lg p-4 mb-4">
              <View className="space-y-4">
                <View>
                  <Text className="text-gray-300 mb-1">Make</Text>
                  <TextInput
                    className="bg-white/20 text-white p-2 rounded"
                    value={vehicle.make}
                    onChangeText={(text) => setVehicle({ ...vehicle, make: text })}
                    placeholder="Enter make"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>

                <View>
                  <Text className="text-gray-300 mb-1">Model</Text>
                  <TextInput
                    className="bg-white/20 text-white p-2 rounded"
                    value={vehicle.model}
                    onChangeText={(text) => setVehicle({ ...vehicle, model: text })}
                    placeholder="Enter model"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>

                <View>
                  <Text className="text-gray-300 mb-1">Year</Text>
                  <TextInput
                    className="bg-white/20 text-white p-2 rounded"
                    value={vehicle.year}
                    onChangeText={(text) => setVehicle({ ...vehicle, year: text })}
                    placeholder="Enter year"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="numeric"
                  />
                </View>

                <View>
                  <Text className="text-gray-300 mb-1">License Plate</Text>
                  <TextInput
                    className="bg-white/20 text-white p-2 rounded"
                    value={vehicle.licensePlate}
                    onChangeText={(text) => setVehicle({ ...vehicle, licensePlate: text })}
                    placeholder="Enter license plate"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>

                <View>
                  <Text className="text-gray-300 mb-1">Color</Text>
                  <TextInput
                    className="bg-white/20 text-white p-2 rounded"
                    value={vehicle.color}
                    onChangeText={(text) => setVehicle({ ...vehicle, color: text })}
                    placeholder="Enter color"
                    placeholderTextColor="#9CA3AF"
                  />
                </View>
              </View>
            </View>

            <TouchableOpacity
              onPress={handleSubmit}
              className="bg-[#48BB78] py-4 rounded-xl mb-4"
            >
              <Text className="text-white text-center font-semibold text-lg">
                {initialData ? 'Update Vehicle' : 'Add Vehicle'}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </LinearGradient>
    </Modal>
  );
} 