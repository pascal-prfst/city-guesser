import { useState } from "react";
import { createPortal } from "react-dom";

import classes from "./GamePage.module.css";
import Button from "../components/UIElements/Button";
import Overlay from "../components/UIElements/Overlay";
import Modal from "../components/UIElements/Modal";
import MapComponent from "../components/MapComponent";

function GamePage() {
  const [distanceContingent, setDistanceContingent] = useState(1500);
  const [foundCities, setFoundCities] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cityData, setCityData] = useState();
  const [usedCity, setUsedCity] = useState();
  const [infoMessage, setInfoMessage] = useState("");

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
          <MapComponent />
        </div>
        <div className={classes.actions_container}>
          <Button>PLATZIEREN</Button>
        </div>
      </div>
    </>
  );
}

export default GamePage;
