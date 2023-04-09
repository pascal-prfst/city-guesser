import { useState } from "react";
import { createPortal } from "react-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression } from "leaflet";

import classes from "./GamePage.module.css";
import Button from "../components/UIElements/Button";
import Overlay from "../components/UIElements/Overlay";
import Modal from "../components/UIElements/Modal";

function GamePage() {
  const [distanceContingent, setDistanceContingent] = useState(1500);
  const [foundCities, setFoundCities] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cityData, setCityData] = useState();
  const [usedCity, setUsedCity] = useState();
  const [infoMessage, setInfoMessage] = useState("");

  const center: LatLngExpression = [54.526, 15.2551];

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <>
      {isModalOpen && <Overlay closeModal={closeModal} />}
      {isModalOpen &&
        createPortal(<Modal closeModal={closeModal} />, document.getElementById("modal")!)}
      <div className={classes.gamepage_container}>
        <div className={classes.stats_container}>
          <div>
            <p>{distanceContingent} km übrig</p>
          </div>
          <div>
            <p>{foundCities} Städte</p>
          </div>
        </div>
        <p className={classes.question}>Wo liegt Amsterdam?</p>
        <div className={classes.map_container}>
          <MapContainer center={center} zoom={4} maxZoom={7} minZoom={3}>
            <TileLayer
              url="https://services.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}?blankTile=false"
              attribution='Map data © <a href="https://arcgisonline.com">Arcgis Online</a>'
            />
            <Marker position={[53.55, 9.9937]}>
              <Popup>Hamburg</Popup>
            </Marker>
          </MapContainer>
        </div>
        <div className={classes.actions_container}>
          <Button>PLATZIEREN</Button>
        </div>
      </div>
    </>
  );
}

export default GamePage;
