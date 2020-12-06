import React, { useState } from "react";
import "./App.css";
import Routes from "./Routes";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="bg-grey-200 App">
      <BrowserRouter>
        <Routes  />
      </BrowserRouter>
    </div>
  );
}

export default App;
