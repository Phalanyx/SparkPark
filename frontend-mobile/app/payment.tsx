import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Alert } from 'react-native';
import { Stack, useLocalSearchParams, router } from 'expo-router';
import { Button, TextInput } from 'react-native-paper';
import PaymentButton from './components/Payment';

export default function PaymentScreen() {
  const params = useLocalSearchParams();
  const [amount, setAmount] = useState(params.amount ? Number(params.amount) : 0);
  const bookingId = params.bookingId as string;
  // Handle successful payment
  const handlePaymentSuccess = () => {
    // Here you would typically update your backend to mark the payment as complete
    // For example, updating the booking status
    Alert.alert(
      'Payment Successful',
      'Your booking has been confirmed!',
      [{ text: 'OK', onPress: () => router.replace('/') }]
    );
  };

  // Handle payment failure
  const handlePaymentFailure = (errorMessage: string) => {
    Alert.alert(
      'Payment Failed',
      `There was an issue processing your payment: ${errorMessage}`,
      [{ text: 'Try Again' }]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Stack.Screen
        options={{
          title: 'Complete Payment',
          headerBackTitle: 'Back',
        }}
      />
      
      <View className="p-4 flex-1 justify-between">
        <View>
          <Text className="text-xl font-bold mb-4">Booking Summary</Text>
          
          {/* Booking details would be fetched and displayed here */}
          <View className="bg-gray-100 rounded-lg p-4 mb-6">
            <Text className="text-base mb-2">Booking ID: {bookingId || 'N/A'}</Text>
            <Text className="text-base mb-2">Total Amount: ${(amount / 100).toFixed(2)}</Text>
          </View>
          
          {/* Allow user to input custom amount for testing */}
          {!params.amount && (
            <View className="mb-6">
              <Text className="text-base mb-2">Enter amount for testing (in cents):</Text>
              <TextInput
                mode="outlined"
                keyboardType="numeric"
                value={amount.toString()}
                onChangeText={(text) => setAmount(Number(text) || 0)}
                className="mb-2"
              />
            </View>
          )}
        </View>
        
        <View>
          {/* The payment button */}
          <PaymentButton 
            amount={amount} 
            onPaymentSuccess={handlePaymentSuccess}
            onPaymentFailure={handlePaymentFailure}
          />
          
          <Button 
            mode="outlined" 
            onPress={() => router.back()}
            className="mt-2"
          >
            Cancel
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
} 