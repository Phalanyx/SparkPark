"use client";

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { relative } from 'path';


const MapView = () => {
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
      <Marker position={[43.6532, 79.3832]}>
        <Popup>
          A marker for testing.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapView;
