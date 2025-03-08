import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, Alert, Switch } from 'react-native';
import auth from '@react-native-firebase/auth';
import { Redirect } from "expo-router";

//43.65107, -79.347015
//12x20
//https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.summerwood.com%2Fproducts%2Fgarages%2Furban-garage%2F276992&psig=AOvVaw3lRu1FWhoB__F2fBmHmxAH&ust=1741493954196000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCJii_NXQ-YsDFQAAAAAdAAAAABAJ
//2025-04-01 09:00 17:00, 2025-04-02 10:00 16:00

const AddListingForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState('');
  const [size, setSize] = useState('');
  const [images, setImages] = useState([]);
  const [pricePerHour, setPricePerHour] = useState('');
  const [pricePerDay, setPricePerDay] = useState('');
  const [pricePerMonth, setPricePerMonth] = useState('');
  const [payAsYouGo, setPayAsYouGo] = useState(false);
  const [availability, setAvailability] = useState('');
  const [features, setFeatures] = useState('');

  // If the user is not logged in, navigate to the Profile page immediately.

    useEffect(() => {
        
        const unsubscribe = auth().onAuthStateChanged(user => {
        if (!user) {
            // Redirect to login page if not authenticated
            <Redirect href="/login" />;
        }
        });
    
        return () => unsubscribe();
    }, []);

  const handleSubmit = async () => {
    try {
      // Get the Firebase auth token
      const token = await auth().currentUser?.getIdToken(false);
      if (!token) {
        Alert.alert('Error', 'User not authenticated');
        return <Redirect href="/login"/>;
      }

      // Build the payload to match your backend schema
      const payload = {
        title,
        description,
        address,
        location: {
          type: 'Point',
          coordinates: location.split(',').map(coord => parseFloat(coord.trim()))
        },
        size: {
          length: parseFloat(size.split('x')[0]),
          width: parseFloat(size.split('x')[1])
        },
        images: images.map(img => img.trim()),
        pricePerHour: parseFloat(pricePerHour),
        pricePerDay: pricePerDay ? parseFloat(pricePerDay) : undefined,
        pricePerMonth: pricePerMonth ? parseFloat(pricePerMonth) : undefined,
        payAsYouGo,
        availability: availability.split(',').map(entry => {
          const parts = entry.trim().split(' ');
          return {
            date: new Date(parts[0]),
            availableFrom: parts[1],
            availableUntil: parts[2]
          };
        }),
        features: features.split(',').map(feature => feature.trim())
      };

      // Submit the listing to the backend
      const response = await fetch(process.env.EXPO_PUBLIC_BACKEND + '/add-listing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert('Success', 'Listing added successfully');
      } else {
        Alert.alert('Error', data.message || 'Error adding listing');
      }
    } catch (error) {
      console.error('Error submitting listing:', error);
      Alert.alert('Error', 'An error occurred while submitting the listing.');
    }
  };

  return (
    <ScrollView>
      <View className='p-12 mt-10'>
        <Text>Title</Text>
        <TextInput value={title} onChangeText={setTitle} placeholder="Enter title" />

        <Text>Description</Text>
        <TextInput value={description} onChangeText={setDescription} placeholder="Enter description" />

        <Text>Address</Text>
        <TextInput value={address} onChangeText={setAddress} placeholder="Enter address" />

        <Text>Location (longitude, latitude)</Text>
        <TextInput value={location} onChangeText={setLocation} placeholder="e.g., -122.4194, 37.7749" />

        <Text>Size (length x width)</Text>
        <TextInput value={size} onChangeText={setSize} placeholder="e.g., 20x15" />

        <Text>Images (comma separated URLs)</Text>
        <TextInput
          value={images.join(', ')}
          onChangeText={(text) => setImages(text.split(',').map(item => item.trim()))}
          placeholder="Enter image URLs separated by commas"
        />

        <Text>Price Per Hour</Text>
        <TextInput
          value={pricePerHour}
          onChangeText={(text) => setPricePerHour(text.replace(/[^0-9.]/g, ''))}
          keyboardType="numeric"
          placeholder="Enter price per hour"
        />

        <Text>Price Per Day</Text>
        <TextInput
          value={pricePerDay}
          onChangeText={(text) => setPricePerDay(text.replace(/[^0-9.]/g, ''))}
          keyboardType="numeric"
          placeholder="Enter price per day (optional)"
        />

        <Text>Price Per Month</Text>
        <TextInput
          value={pricePerMonth}
          onChangeText={(text) => setPricePerMonth(text.replace(/[^0-9.]/g, ''))}
          keyboardType="numeric"
          placeholder="Enter price per month (optional)"
        />

        <Text>Pay As You Go</Text>
        <Switch value={payAsYouGo} onValueChange={setPayAsYouGo} />

        <Text>
          Availability (format: YYYY-MM-DD HH:MM HH:MM, separate multiple entries with commas)
        </Text>
        <TextInput
          value={availability}
          onChangeText={setAvailability}
          placeholder="e.g., 2025-04-01 09:00 17:00, 2025-04-02 10:00 16:00"
        />

        <Text>Features (comma separated)</Text>
        <TextInput
          value={features}
          onChangeText={setFeatures}
          placeholder="e.g., WiFi, Parking, AC"
        />

        <Button title="Add Listing" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
};

export default AddListingForm;
