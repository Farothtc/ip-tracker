"use client";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";

type Props = {
  lat: number;
  lng: number;
  ip: string;
  city: string;
  region: string;
};

const customIcon = new L.Icon({
  iconUrl: "/icon-location.svg",
  iconSize: [46, 56],
  iconAnchor: [16, 32],
});

function ChangeView({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
}

export default function MapNoSSR({ lat, lng, ip, city, region }: Props) {
  return (
    <MapContainer
      center={[lat, lng]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
    >
      <ChangeView center={[lat, lng]} />
      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lng]} icon={customIcon}>
        <Popup>
          {ip} <br /> {city}, {region}
        </Popup>
      </Marker>
    </MapContainer>
  );
}
