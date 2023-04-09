import { useState } from "react";

import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import { LatLngExpression } from "leaflet";

// Compontent that handles the card click and get coordinates
type MapEventProps = {
  clickHandler: (lat: number, lng: number) => void;
};

function MapEventComponent({ clickHandler }: MapEventProps) {
  const map = useMapEvents({
    click: event => {
      clickHandler(event.latlng.lat, event.latlng.lng);
    },
  });
  return null;
}

function MapComponent() {
  const [markerPosition, setMarkerPosition] = useState<[number, number] | null>(null);
  const center: LatLngExpression = [54.526, 15.2551];

  function handleMapClick(lat: number, lng: number) {
    setMarkerPosition([lat, lng]);
  }

  return (
    <MapContainer center={center} zoom={4} maxZoom={7} minZoom={3}>
      <MapEventComponent clickHandler={handleMapClick} />
      <TileLayer
        url="https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}?blankTile=false"
        attribution='Map data © <a href="https://arcgisonline.com">Arcgis Online</a>'
      />
      <Marker position={[53.55, 9.9937]}>
        <Popup>Hamburg</Popup>
      </Marker>
      {markerPosition && (
        <Marker position={markerPosition}>
          <Popup>Du</Popup>
        </Marker>
      )}
    </MapContainer>
  );
}

export default MapComponent;
