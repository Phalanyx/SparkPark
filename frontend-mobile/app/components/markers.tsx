import React, { useState, useEffect } from 'react';
import { Marker } from 'react-native-maps';

const Markers = () => {
    const [datas, setDatas] = useState<any>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(process.env.EXPO_PUBLIC_BACKEND + "", { method: "GET" });
                const result = await response.json();
                setDatas(result);
            } catch (error) {
                setDatas([]);
                console.error('There was an error making the request!', error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            {datas.map((data: any, index: number) => (
                <Marker
                    key={index}
                    coordinate={{ latitude: data.lat, longitude: data.lng }}
                    title={data.address}
                    description={data.rate}
                />
            ))}
        </>
    );
};

export default Markers;