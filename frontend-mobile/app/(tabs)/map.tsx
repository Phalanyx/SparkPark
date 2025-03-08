import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { TextInput } from 'react-native';
import Search from '../components/Search';



const Map = () => {
    const [datas, setDatas] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:4000/', { method: "GET" });
                const result = await response.json();
                setDatas(result);
            } catch (error) {
                setDatas([]);
                console.error('There was an error making the request!', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="blackrr" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                showsUserLocation={true}
                followsUserLocation={true}
                provider={undefined}
                initialRegion={{
                    latitude: 43.65107,
                    longitude: -79.347015,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <View className="mt-20">
                    <Search setData={setDatas}/>
                </View>
                {datas.map((data: any, index: number) => (
                    <Marker
                        key={index}
                        coordinate={{ latitude: data.location.coordinates[1], longitude: data.location.coordinates[0] }}
                        title={data.address}
                        description={data.pricePerHour.toString()}
                    />
                ))}
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