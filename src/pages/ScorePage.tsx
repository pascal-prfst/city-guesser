import { useState, useEffect } from "react";

import classes from "./ScorePage.module.css";
import Button from "../components/UIElements/Button";
import Pagination from "../components/UIElements/Pagination";

function ScorePage() {
  const [score, setScore] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getScoreData() {
      try {
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
      <div className={classes.scoreboard}>
        <Pagination itemsPerPage={7} items={score} />
      </div>
      <div className={classes.actions_container}>
        <Button to="/game">NEUES SPIEL</Button>
      </div>
    </section>
  );
}

export default ScorePage;
