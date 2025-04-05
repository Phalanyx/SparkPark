import React, { useState, useEffect } from 'react';
import { View, Text, Alert, ActivityIndicator, NativeEventEmitter, NativeModules } from 'react-native';
import { Button } from 'react-native-paper';
import { useStripe } from '@stripe/stripe-react-native';
import Constants from 'expo-constants';
import auth from '@react-native-firebase/auth';
import { router } from 'expo-router';
// Fix for "new NativeEventEmitter() requires a non-null argument" warning
// This is needed for @stripe/stripe-react-native
const eventEmitter = new NativeEventEmitter(NativeModules.StripeTerminal || {});

interface PaymentProps {
  amount: number; // Amount in cents
  onPaymentSuccess?: () => void;
  onPaymentFailure?: (error: string) => void;
  drivewayId?: string; // change this later
  startTime?: string;
  endTime?: string;
  vehicleDetails?: {
    make: string;
    model: string;
    licensePlate: string;
    color: string;
  };
}

const PaymentButton = ({ amount, onPaymentSuccess, onPaymentFailure, drivewayId, startTime, endTime, vehicleDetails }: PaymentProps) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const user = auth().currentUser;

  useEffect(() => {
    console.log("startTime:", startTime);
    console.log("endTime:", endTime);
  }, [startTime, endTime]);

  const PaymentSuccess = async () => {
    const backendUrl = process.env.EXPO_PUBLIC_BACKEND || 'http://localhost:4000';
    let response = await fetch(`${backendUrl}/payments/success`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        paymentIntentId: paymentId,
        bookingId: drivewayId || '67cbc1017a9102e1af5c8c16',
        amount: amount * 100,
        email: user?.email || 'test@test.com',
        drivewayId: drivewayId || '123',
        userId: user?.uid || '123',
      }),
    });

    if (!response.ok) {
      console.log("PaymentSuccess Error");
      throw new Error('Network response was not ok');
    }
    response = await response.json();
    const token = await user?.getIdToken();
    console.log("BookingCreate");

    if (!vehicleDetails) {
      throw new Error('Vehicle details are required');
    }

    response = await fetch(`${backendUrl}/bookings/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        listingId: drivewayId || "67cbc1017a9102e1af5c8c16",
        startTime: startTime,
        endTime: endTime,
        vehicleDetails,
      }),
    });

    if (!response.ok) {
      console.log("BookingCreate Error");
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    router.push('/(tabs)/booking');
    console.log(data);
  }

  const fetchPaymentIntent = async () => {
    try {
      const backendUrl = process.env.EXPO_PUBLIC_BACKEND || 'http://localhost:4000';
      const response = await fetch(`${backendUrl}/payments/intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Extract both client secret and payment intent ID
      const { clientSecret, paymentIntentId } = await response.json();
      
      // Store the actual payment intent ID, not the client secret
      setPaymentId(paymentIntentId);
      
      console.log('Payment Intent ID:', paymentIntentId); // For debugging
      
      return clientSecret;
    } catch (error) {
      onPaymentFailure?.(error instanceof Error ? error.message : 'Unknown error');
      return null;
    }
  };

  const initializePaymentSheet = async () => {
    setLoading(true);
    try {
      const clientSecret = await fetchPaymentIntent();
      if (!clientSecret) {
        setLoading(false);
        return;
      }

      const { error } = await initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: 'Parking Spot',
      });

      if (error) {
        //console.error('Error initializing payment sheet:', error);
        //onPaymentFailure?.(error.message);
      }
    } catch (error) {
      console.error('Error initializing payment:', error);
      onPaymentFailure?.(error instanceof Error ? error.message : 'Unknown error');
    }
    setLoading(false);
  };

  const openPaymentSheet = async () => {
    setLoading(true);
    try {
      const { error } = await presentPaymentSheet();

      if (error) {
        console.error('Payment error:', error);
        Alert.alert('Payment failed', error.message);
        onPaymentFailure?.(error.message);
      } else {
        Alert.alert('Success', 'Your payment was successful!');

        await PaymentSuccess();
        setPaymentId(null);
        await initializePaymentSheet();
      }
    } catch (error) {
      //console.error('Error presenting payment sheet:', error);
      //onPaymentFailure?.(error instanceof Error ? error.message : 'Unknown error');
      //await initializePaymentSheet();
    }
    setLoading(false);
  };

  useEffect(() => {
    initializePaymentSheet();
  }, [amount]);

  return (
    <View className="my-4">
      <Button
        mode="contained"
        onPress={openPaymentSheet}
        disabled={loading}
        loading={loading}
        className="w-full py-2"
      >
        {loading ? 'Processing...' : `Pay $${(amount).toFixed(2)}`}
      </Button>
    </View>
  );
};

export default PaymentButton;