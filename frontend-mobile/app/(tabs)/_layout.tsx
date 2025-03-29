import React from 'react';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'white', headerShown: false,
               tabBarStyle: { backgroundColor: '#1d434f' }, 
  }}>
      <Tabs.Screen
        name="map"
        options={{
          title: 'Find Parking',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="car" color={color} />,
        }}
        />
      <Tabs.Screen
        name="login"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
        }}
      />
      <Tabs.Screen
        name='listing'
        options={{
          title: "Create Listings",
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="plus" color={color} />,
        }}
      />
      <Tabs.Screen
        name='booking'
        options={{
          title: "Booking",
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="calendar" color={color} />,
        }}
      />
    </Tabs>
  );
}
