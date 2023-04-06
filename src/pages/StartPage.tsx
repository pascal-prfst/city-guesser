import classes from "./StartPage.module.css";
import Button from "../components/UIElements/Button";

function StartPage() {
  return (
    <section className={classes.startpage_container}>
      <div className={classes.headline_container}>
        <h1>GEO GUESSER</h1>
        <img src="images/marker.png" alt="marker-icon" />
      </div>
      <div className={classes.image_container}>
        <img src="images/europe.png" alt="europe-map" />
      </div>
      <div className={classes.rules_container}>
        <h2>Spielregeln:</h2>
        <p>
          Du siehst eine einfache Karte von Europa. Über der Karte wird dir eine zufällige Stadt
          angezeigt, die du auf der Karte finden musst. Setze einfach per Klick einen Marker an der
          Stelle, wo du denkst dort ist die gesuchte Stadt. Bist du innerhalb eines Radius von 50km
          bekommst du einen Punkt für die gesuchte Stadt. Die Differenz von der gesuchten Stadt zu
          deinem Marker, wird dir von deinem Kilometer Kontinggent (1500km) abgezogen. Bist du bei
          0km ist das Spiel vorbeit.
        </p>
      </div>
      <div className="actions_container">
        <Button to="/game">STARTE SPIEL</Button>
        <Button to="/score">RANGLISTE</Button>
      </div>
    </section>
  );
}

export default StartPage;
