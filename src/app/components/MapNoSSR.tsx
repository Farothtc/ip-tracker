"use client";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect, useState } from "react";

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
    try {
      if (map && center) {
        map.setView(center);
      }
    } catch (e) {
      console.log(e);
    }
  }, [center, map]);
  return null;
}

export default function MapNoSSR({ lat, lng, ip, city, region }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <MapContainer
      key="main-map"
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
