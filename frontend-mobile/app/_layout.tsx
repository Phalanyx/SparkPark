import React, { useEffect } from 'react';
import { Stack } from "expo-router";
import "../global.css";
import { StripeProvider } from "@stripe/stripe-react-native";
import { StatusBar } from 'expo-status-bar';
import { Platform, NativeEventEmitter, NativeModules, LogBox } from 'react-native';
import Constants from 'expo-constants';

// Ignore the specific warning about NativeEventEmitter
LogBox.ignoreLogs([
  'new NativeEventEmitter()' // Ignore the NativeEventEmitter warning
]);

const stripePublishableKey = "pk_test_51R6zlRQMuXbi9oGHjnS5lRSugpZbhhqg24tbGRoMJ7B2CqcORkn45cmvDa8Qu05dybWxRWutDyfYnQ3Od5gcGC5S00SxTT5vI2"
export default function RootLayout() {
  // Create a harmless empty emitter to prevent the null argument error
  useEffect(() => {
    const stripeFix = new NativeEventEmitter(NativeModules.StripeTerminal || {});
    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <StripeProvider publishableKey={stripePublishableKey}>
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </StripeProvider>
  );
}
