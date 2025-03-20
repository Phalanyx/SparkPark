import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Button
} from 'react-native';
import auth from '@react-native-firebase/auth';
import GoogleSignIn from '../components/GoogleSignIn';
import EmailSignIn from '../components/EmailSignIn';
import { LinearGradient } from 'expo-linear-gradient';
import ProfileScreen from '../components/profile';


export default function Login() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [data, setData] = useState<any>();
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      setLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  function handleBackend(token: string) {
    // Your backend login route
    fetch(`${process.env.EXPO_PUBLIC_BACKEND}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      }
    })
      .then((response) => response.json())
      .then((respData) => {
        setData(respData);
      })
      .catch((error) => console.error(error));
  }

  function handleLogout() {
    auth()
      .signOut()
      .then(() => setData(undefined))
      .catch((error) => console.error(error));
  }

  if (loggedIn) {
    return <ProfileScreen data={data} handleLogout={handleLogout} />;
  }

  return (
    <LinearGradient
          colors={['#1d434f', '#2e6165']} // Customize these colors as needed
          style={{ flex: 1 }}
    >
    <View className="flex-1">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <KeyboardAvoidingView behavior="padding" className="flex-1 justify-center px-6 py-8">
          {/* Header */}
          <Text className="text-3xl font-bold text-white mt-4">Login or Sign up</Text>
          <Text className="text-white mt-2">Start parking with BIGOH</Text>

          {/* Email Sign In at the top */}
          <View className="mt-6">
            <EmailSignIn handleBackend={handleBackend} mode={authMode} />
          </View>

          <TouchableOpacity
            onPress={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
            className="mt-6"
          >
            <Text className="text-center text-sm text-gray-300 font-semibold">
              {authMode === 'login' ? 'Need an account? Sign up' : 'Already have an account? Log in'}
            </Text>
          </TouchableOpacity>

          {/* Divider */}
          <View className="mt-6 flex-row items-center justify-center">
            <View className="flex-1 h-px bg-gray-300" />
            <Text className="mx-2 text-gray-500">or</Text>
            <View className="flex-1 h-px bg-gray-300" />
          </View>

          {/* Google Sign In */}
          <View className="mt-6 flex justify-around">
            <GoogleSignIn handleBackend={handleBackend} />
          </View>

          {/* Terms & Conditions */}
          <Text className="text-xs text-center mt-6 px-2 text-gray-400">
            By continuing, you agree to the BIGOH Terms and Conditions and Privacy Statement
          </Text>

          {/* Footer Links */}
          <TouchableOpacity className="mt-4">
            <Text className="text-center text-gray-500">Accessibility and language</Text>
          </TouchableOpacity>
          <TouchableOpacity className="mt-2">
            <Text className="text-center text-gray-500">Learn about hosting</Text>
          </TouchableOpacity>
          <TouchableOpacity className="mt-2">
            <Text className="text-center text-gray-500">List your space with BIGOH</Text>
          </TouchableOpacity>

          {/* Toggle between Login and Signup */}

        </KeyboardAvoidingView>
      </ScrollView>
    </View>
    </LinearGradient>

  );
}
