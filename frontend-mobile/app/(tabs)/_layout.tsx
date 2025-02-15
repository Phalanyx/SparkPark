import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'black', headerShown: false }}>
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
    </Tabs>
  );
}
