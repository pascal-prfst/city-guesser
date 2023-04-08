import { useState, useEffect } from "react";
import PropagateLoader from "react-spinners/PropagateLoader";

import classes from "./ScorePage.module.css";
import Button from "../components/UIElements/Button";
import Pagination from "../components/UIElements/Pagination";

function ScorePage() {
  const [score, setScore] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>();

  useEffect(() => {
    async function getScoreData() {
      try {
        setIsLoading(true);
        const response = await fetch("https://geo-game.vercel.app/api/score");
        const data = await response.json();
        setScore(data.score);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    getScoreData();
  }, []);

  return (
    <section className={classes.scorepage_container}>
      <h1>Rangliste</h1>
      {isLoading ? (
        <div className={classes.loader_container}>
          <PropagateLoader />
        </div>
      ) : (
        <div className={classes.scoreboard}>
          <Pagination itemsPerPage={7} items={score} />
        </div>
      )}
      <div className={classes.actions_container}>
        <Button to="/game">NEUES SPIEL</Button>
        <Button to="/">STARTSEITE</Button>
      </div>
    </section>
  );
}

export default ScorePage;
