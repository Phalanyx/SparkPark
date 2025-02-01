"use client";

import React, { useEffect, useState}  from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';


const MapView = () => {
  const [datas, setDatas] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api', { method: "GET" });
        const result = await response.json();
        setDatas(result);
      } catch (error) {
        console.error('There was an error making the request!', error);
      }
    };

    fetchData();
  }, []);


  return (
    <MapContainer
      center={[43.794386769176114, -79.19636721704391]}
      zoom={14}
      scrollWheelZoom={true}
      style={{ height: '100%', width: '100%', position: 'relative', zIndex: 1 }} // Assuming navbar height is 60px
    >
      <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {datas.map((data: any, index: any) => (
      <Marker key={index} position={[data.lat, data.lng]}>
        <Popup>
        {data.address}
        </Popup>
      </Marker>
      ))}


      <Marker position={[43.6532, 79.3832]}>
        <Popup>
          A marker for testing.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapView;
