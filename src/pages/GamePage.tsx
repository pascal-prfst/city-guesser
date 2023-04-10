import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import classes from "./GamePage.module.css";
import Button from "../components/UIElements/Button";
import Overlay from "../components/UIElements/Overlay";
import Modal from "../components/UIElements/Modal";
import MapComponent from "../components/MapComponent";
import { City } from "../types/types";

function GamePage() {
  const [distanceContingent, setDistanceContingent] = useState(1500);
  const [distance, setDistance] = useState<number>(0);
  const [foundCities, setFoundCities] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [markerPlaced, setMarkerPlaced] = useState(false);
  const [cityData, setCityData] = useState();
  const [usedCity, setUsedCity] = useState<City | undefined>();
  const [infoMessage, setInfoMessage] = useState("");

  // gamelogic
  useEffect(() => {
    if (distance < 50 && markerPlaced) {
      setFoundCities(prevCities => prevCities + 1);
    }

    if (distanceContingent < 0) {
      setIsModalOpen(true);
    }
  }, [markerPlaced]);

  function closeModal() {
    setIsModalOpen(false);
  }

  function placedMarkerHandler() {
    setMarkerPlaced(prev => !prev);
  }

  function getTheDistance(distance: number) {
    setDistance(distance);
    setDistanceContingent(prevDistance => prevDistance - distance);
  }

  return (
    <>
      {isModalOpen && <Overlay closeModal={closeModal} />}
      {isModalOpen &&
        createPortal(<Modal closeModal={closeModal} />, document.getElementById("modal")!)}
      <div className={classes.gamepage_container}>
        <div className={classes.stats_container}>
          <div>
            <p>{distanceContingent.toFixed(0)} km übrig</p>
          </div>
          <div>
            <p>{foundCities} Städte</p>
          </div>
        </div>
        <p className={classes.question}>Wo liegt Amsterdam?</p>
        <div className={classes.map_container}>
          <MapComponent markerPlaced={markerPlaced} city={usedCity} getDistance={getTheDistance} />
        </div>
        <div className={classes.actions_container}>
          {!markerPlaced ? (
            <Button onClick={placedMarkerHandler}>PLATZIEREN</Button>
          ) : (
            <Button onClick={placedMarkerHandler}>NÄCHSTE STADT</Button>
          )}
        </div>
      </div>
    </>
  );
}

export default GamePage;
