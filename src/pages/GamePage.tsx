import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import classes from "./GamePage.module.css";
import Button from "../components/UIElements/Button";
import Overlay from "../components/UIElements/Overlay";
import Modal from "../components/UIElements/Modal";
import MapComponent from "../components/MapComponent";
import { City } from "../types/types";
import { capitalCities } from "../data/capitalCities.json";

function GamePage() {
  const [distanceContingent, setDistanceContingent] = useState(1500);
  const [distance, setDistance] = useState<number>(0);
  const [foundCities, setFoundCities] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [markerPlaced, setMarkerPlaced] = useState(false);
  const [cityData, setCityData] = useState(capitalCities);
  const [usedCity, setUsedCity] = useState<City>();
  const [infoMessage, setInfoMessage] = useState("");

  useEffect(() => {
    selectRandomCity();
  }, []);

  // gamelogic
  useEffect(() => {
    if (distance < 50 && markerPlaced) {
      setFoundCities(prevCities => prevCities + 1);
    }
    if (distanceContingent < 0) {
      setIsModalOpen(true);
    }
  }, [markerPlaced]);

  // select a random city and fetch the coordinates
  async function selectRandomCity() {
    const randomNum = Math.floor(Math.random() * cityData.length);
    const response = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${cityData[randomNum].capitalCity}&limit=1&appid=db4da4cf573027c1713e12f5bcda8729`
    );
    const data = await response.json();
    const foundCity = {
      capitalCity: data[0].name,
      lat: data[0].lat,
      long: data[0].lon,
    };
    setUsedCity(foundCity);
  }

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
        <p className={classes.question}>Wo liegt {usedCity && usedCity.capitalCity}?</p>
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
