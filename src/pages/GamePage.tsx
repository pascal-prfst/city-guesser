import { useState } from "react";

import classes from "./GamePage.module.css";
import Button from "../components/UIElements/Button";

function GamePage() {
  const [distanceContingent, setDistanceContingent] = useState(1500);
  const [foundCities, setFoundCities] = useState(0);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [cityData, setCityData] = useState();
  const [usedCity, setUsedCity] = useState();
  const [infoMessage, setInfoMessage] = useState("");

  return (
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
      <div className={classes.map_container}></div>
      <div className={classes.actions_container}>
        <Button>PLATZIEREN</Button>
      </div>
    </div>
  );
}

export default GamePage;
