import { useState, useEffect } from "react";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import { calculateDistance } from "../utils/helper-functions";
import { Icon } from "leaflet";

type MapEventComponentProps = {
  clickHandler: (lat: number, lng: number) => void;
};

// Compontent that handles the card click and get coordinates
function MapEventComponent({ clickHandler }: MapEventComponentProps) {
  const map = useMapEvents({
    click: event => {
      clickHandler(event.latlng.lat, event.latlng.lng);
    },
  });
  return null;
}

type MapComponentProps = {
  markerPlaced: boolean;
  city:
    | {
        capitalCity: string;
        lat: number;
        long: number;
      }
    | undefined;
  getDistance: (distance: number) => void;
};

// Map Component
function MapComponent({ markerPlaced, city, getDistance }: MapComponentProps) {
  const [markerPosition, setMarkerPosition] = useState<[number, number] | null>(null);
  const [distance, setDistance] = useState(0);

  const center: LatLngExpression = [54.526, 15.2551];

  useEffect(() => {
    if (markerPlaced) {
      getDistance(distance);
    }
  }, [markerPlaced]);

  // custom Marker
  const customMarker = new Icon({
    iconUrl: "images/marker.png",
    iconSize: [30, 30],
    iconAnchor: [10, 30],
  });

  function handleMapClick(lat: number, lng: number) {
    setMarkerPosition([lat, lng]);
    const calcDistance = calculateDistance(lat, lng, 53.55, 9.9937);
    setDistance(calcDistance);
  }

  return (
    <MapContainer center={center} zoom={4} maxZoom={7} minZoom={3}>
      <MapEventComponent clickHandler={handleMapClick} />
      <TileLayer
        url="https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}?blankTile=false"
        attribution='Map data © <a href="https://arcgisonline.com">Arcgis Online</a>'
      />
      {markerPlaced && <Marker icon={customMarker} position={[53.55, 9.9937]}></Marker>}
      {markerPosition && <Marker icon={customMarker} position={markerPosition}></Marker>}
    </MapContainer>
  );
}

export default MapComponent;
