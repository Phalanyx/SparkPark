import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Search from '../components/Search';
import ListingCard from '../components/listingPanel';

interface Listing {
    _id: string;
    title: string;
    address: string;
    description: string;
    images: string[];
    pricePerHour: number;
    pricePerDay: number;
    pricePerMonth: number;
    // add additional properties as needed
  }

const Map = () => {
  const [datas, setDatas] = useState<any[]>([]);
  const [displayData, setDisplayData] = useState<Listing>();
  const [loading, setLoading] = useState<boolean>(true);
  const [center, setCenter] = useState({
    latitude: 43.65107,
    longitude: -79.347015,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/', { method: "GET" });
        const result = await response.json();
        // If result is an array, use it; otherwise check if it has a points property
        if (Array.isArray(result)) {
          setDatas(result);
        } else if (result.points && Array.isArray(result.points)) {
          setDatas(result.points);
          setDisplayData(result.points[0])
          // Optionally, update the center using result.lat and result.lon if needed
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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="black" />
      </View>
    );
  }

  // Guard against datas being undefined
  const safeDatas = Array.isArray(datas) ? datas : [];

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation={true}
        followsUserLocation={true}
        initialRegion={{
          ...center,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <View className="mt-20">
          <Search setData={(data) => setDatas(Array.isArray(data) ? data : [])} setCenter={setCenter} />
        </View>
        {safeDatas.map((data: any, index: number) => {
          console.log(data.address);
          console.log(data.location.coordinates);
          return (
            <Marker
              key={index}
              coordinate={{
                latitude: data.location.coordinates[1],
                longitude: data.location.coordinates[0],
              }}
              title={data.address}
              description={data.pricePerHour.toString()}
              onPress={() => {console.log(data); setDisplayData(data)}}
            />
          );
        })}
        <View className='mt-[41.5vh]'>
             <ListingCard data={displayData}/>
        </View>

      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
    zIndex: 1000,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Map;
