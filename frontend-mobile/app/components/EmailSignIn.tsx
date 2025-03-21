import React from 'react';
import { useState } from 'react';
import {
  Alert,
  Button,
  KeyboardAvoidingView,
  Text,
  TextInput,
  View
} from 'react-native';
import auth from '@react-native-firebase/auth';

interface AuthFormProps {
  handleBackend: (token: string) => void;
  mode: 'login' | 'signup';
}

export default function AuthForm({ handleBackend, mode }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const validatePassword = (pwd: string) => pwd.length >= 6;

  const handleAuth = () => {
    if (mode === 'login') {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then((user) => {
          user.user.getIdToken().then((token) => {
            handleBackend(token);
          });
        })
        .catch(error => {
          if (error.code === 'auth/invalid-email') {
            Alert.alert('Invalid email', 'That email address is invalid!');
          }
          // You could add more specific error handling here
          console.error(error);
        });
    } else {
      // Sign Up
      if (password !== confirmPassword) {
        Alert.alert('Error', 'Passwords do not match!');
        return;
      }

      if (!validatePassword(password)) {
        Alert.alert('Error', 'Password must be at least 6 characters long.');
        return;
      }

      auth()
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
          user.user.getIdToken().then((token) => {
            handleBackend(token);
          });
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            Alert.alert('Email in use', 'That email address is already in use!');
          } else if (error.code === 'auth/invalid-email') {
            Alert.alert('Invalid email', 'That email address is invalid!');
          }
          // You could add more specific error handling here
          console.error(error);
        });
    }
  };

  return (
    <View className="bg-white p-4 rounded-md shadow-md">
      <Text className="text-xl font-semibold mb-4">
        {mode === 'login' ? 'Log In' : 'Sign Up'}
      </Text>

      {/* Email Field */}
      <KeyboardAvoidingView behavior="padding">
        <View className="mb-4">
          <Text className="text-base font-medium">Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            className="border border-gray-300 rounded-md px-3 py-2 mt-1"
          />
        </View>

        {/* Password Field */}
        <View className="mb-4">
          <Text className="text-base font-medium">Password</Text>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry
            className="border border-gray-300 rounded-md px-3 py-2 mt-1"
          />
        </View>

        {/* Confirm Password (only for signup) */}
        {mode === 'signup' && (
          <View className="mb-4">
            <Text className="text-base font-medium">Confirm Password</Text>
            <TextInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Re-enter your password"
              secureTextEntry
              className="border border-gray-300 rounded-md px-3 py-2 mt-1"
            />
          </View>
        )}

        {/* Action Button */}
        <Button
          title={mode === 'login' ? 'Log In' : 'Sign Up'}
          onPress={handleAuth}
          color="#007AFF" // iOS default blue, adjust if you like
        />
      </KeyboardAvoidingView>
    </View>
  );
}
