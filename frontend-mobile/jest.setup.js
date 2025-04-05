// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

// Mock react-native-gesture-handler
jest.mock('react-native-gesture-handler', () => {
  const { View } = require('react-native');
  return {
    PanGestureHandler: View,
    State: {},
    ScrollView: View,
    PanGestureHandlerGestureEvent: jest.fn(),
  };
});

// Mock expo-router
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  useLocalSearchParams: () => ({}),
}));

// Mock expo-linking
jest.mock('expo-linking', () => ({
  createURL: jest.fn(),
}));

// Mock expo-constants
jest.mock('expo-constants', () => ({
  Constants: {
    manifest: {
      extra: {
        apiUrl: 'http://localhost:3000',
      },
    },
  },
})); 