import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import Markers from './markers';

const Map = () => {
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
            <Markers />
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
});

export default Map;