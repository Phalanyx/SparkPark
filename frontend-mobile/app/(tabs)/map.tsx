import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, ActivityIndicator, TouchableWithoutFeedback } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Search from '../components/Search';
import ListingCard from '../components/listingPanel';
import AutoSuggestButton from '../components/AutoSuggestButton';
import * as Location from 'expo-location';
import auth from '@react-native-firebase/auth';
import Constants from 'expo-constants';

interface Listing {
  _id: string;
  title: string;
  address: string;
  description: string;
  images: string[];
  pricePerHour: number;
  pricePerDay: number;
  pricePerMonth: number;
  location: {
    type: string;
    coordinates: [number, number];
  }
}

const Map = () => {
  const [datas, setDatas] = useState<any[]>([]);
  const [displayData, setDisplayData] = useState<Listing | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [center, setCenter] = useState({
    latitude: 43.65107,
    longitude: -79.347015,
  });

  const mapRef = useRef<MapView>(null);
  const backendUrl = Constants.expoConfig?.extra?.EXPO_PUBLIC_BACKEND || 'http://localhost:4000';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${backendUrl}/`, { method: "GET" });
        const result = await response.json();

        if (Array.isArray(result)) {
          setDatas(result);
        } else if (result.points && Array.isArray(result.points)) {
          setDatas(result.points);
          setDisplayData(result.points[0]);

          if (result.lat && result.lon) {
            setCenter({
              latitude: result.lat,
              longitude: result.lon,
            });
          }
        } else {
          setDatas([]);
        }
      } catch (error) {
        console.error('There was an error making the request!', error);
        setDatas([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const fetchBestSpot = async () => {
    try {
      const token = await auth().currentUser?.getIdToken();

      if (!token) return;

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      const date = new Date().toISOString().split('T')[0];
      const time = new Date().toISOString().split('T')[1].slice(0, 5);
      const queryUrl = `${backendUrl}/best-parking-spot?latitude=${latitude}&longitude=${longitude}&date=${date}&time=${time}`;

      console.log("Request URL:", queryUrl);

      const response = await fetch(queryUrl, {
        method: "GET",
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const result = await response.json();

      console.log("Response from Server:", result);

      if (response.ok && result._id) {
        setDisplayData(result);

        const region = {
          latitude: result.location.coordinates[1],
          longitude: result.location.coordinates[0],
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };

        setCenter({ latitude: region.latitude, longitude: region.longitude });
        mapRef.current?.animateToRegion(region, 1000);
      }

    } catch (error) {
      console.error("Error fetching best parking spot:", error);
    }
  };

  if (loading) {
    return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="black" />
        </View>
    );
  }

  const safeDatas = Array.isArray(datas) ? datas : [];

  return (
      <TouchableWithoutFeedback onPress={() => setDisplayData(null)}>
        <View style={styles.container}>
          <MapView
              ref={mapRef}
              style={styles.map}
              showsUserLocation={true}
              followsUserLocation={true}
              initialRegion={{
                ...center,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
          >
            {safeDatas.map((data: any, index: number) => (
                <Marker
                    key={index}
                    coordinate={{
                      latitude: data.location.coordinates[1],
                      longitude: data.location.coordinates[0],
                    }}
                    title={data.title}
                    description={data.pricePerHour.toString()}
                    onPress={() => {
                      setDisplayData(data);
                      const region = {
                        latitude: data.location.coordinates[1],
                        longitude: data.location.coordinates[0],
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                      };
                      mapRef.current?.animateToRegion(region, 1000);
                    }}
                />
            ))}
          </MapView>

          {/* Search Component */}
          <View style={styles.searchContainer}>
            <Search
                setData={(data) => setDatas(Array.isArray(data) ? data : [])}
                setCenter={setCenter}
            />
          </View>

          {/* Auto-Suggest Button */}
          {!displayData && (
              <AutoSuggestButton onPress={fetchBestSpot} />
          )}

          {/* Display ListingCard If A Marker Is Clicked */}
          {displayData && (
              <View style={styles.listingCard}>
                <ListingCard data={displayData} />
              </View>
          )}

          {/* Bottom Navigation Bar */}
          <View style={styles.navBar} />
        </View>
      </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    position: 'absolute',
    top: 80,
    width: '90%',
    zIndex: 10,
  },
  listingCard: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
  },
  navBar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 0,
    backgroundColor: '#1d434f',
  },
});

export default Map;