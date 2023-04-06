import { Route, Routes } from "react-router";

import StartPage from "../src/pages/StartPage";
import GamePage from "../src/pages/GamePage";
import ScorePage from "../src/pages/ScorePage";

function App() {
  return (
    <>
      <Routes>
        <Route element={<StartPage />} path="/"></Route>
        <Route element={<GamePage />} path="/game"></Route>
        <Route element={<ScorePage />} path="/score"></Route>
      </Routes>
    </>
  );
}

export default App;
