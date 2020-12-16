import React from "react";
import "./App.css";
import { RoutesContainer } from "./components/Routes/RoutesContainer";
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
function App() {
  const history = createBrowserHistory();
  return (
    <Router history={history}>
      <div className="bg-grey-200 App">
        <RoutesContainer />
      </div>
    </Router>
  );
}

export default App;
