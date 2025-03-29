import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';
import { useRouter } from 'expo-router';

interface PaymentButtonProps {
  amount: number;
}

const PaymentButton: React.FC<PaymentButtonProps> = ({ amount }) => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handlePayment = async () => {
    try {
      setLoading(true);
      
      // Create payment intent on your backend
      const response = await fetch(`${process.env.EXPO_PUBLIC_BACKEND}/payments/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount * 100, // Convert to cents
        }),
      });

      const { clientSecret } = await response.json();

      // Initialize the Payment Sheet
      const { error: initError } = await initPaymentSheet({
        merchantDisplayName: 'Parking App',
        paymentIntentClientSecret: clientSecret,
        defaultBillingDetails: {
          name: 'User Name',
          email: 'user@example.com',
        },
      });

      if (initError) {
        Alert.alert('Error', initError.message);
        return;
      }

      // Present the Payment Sheet
      const { error: paymentError } = await presentPaymentSheet();

      if (paymentError) {
        Alert.alert('Error', paymentError.message);
        return;
      }

      // Payment successful
      Alert.alert('Success', 'Payment completed successfully!');
      router.push('/'); // Navigate to root, which should show the main tab
    } catch (error) {
      console.error('Payment error:', error);
      Alert.alert('Error', 'An error occurred during payment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePayment}
      disabled={loading}
      className={`py-4 rounded-lg ${loading ? 'bg-gray-400' : 'bg-blue-500'}`}
    >
      <Text className="text-white text-center text-lg font-semibold">
        {loading ? 'Processing...' : `Pay $${amount}`}
      </Text>
    </TouchableOpacity>
  );
};

export default PaymentButton;
