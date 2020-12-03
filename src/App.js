import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import Routes from "./Routes";
import { BrowserRouter } from "react-router-dom";

function App() {
  const [state, setState] = useState({ verify: false });
  const Refresh = async () => {
    try {
      const res = await axios({
        method: "post",
        url: "https://cors-anywhere.herokuapp.com/https://social-mediasite.herokuapp.com/verify",
        data: {
          refreshToken: localStorage.getItem("refreshToken"),
          username: localStorage.getItem("username"),
          accessToken: localStorage.getItem("accessToken"),
        },
      });
      localStorage.setItem("refreshToken", res.data.refreshToken);
      localStorage.setItem("accessToken", res.data.accessToken);
      setState({ verify: true });
    } catch (err) {
      if (err.response.status === 401) {
        setState({ verify: false });
        localStorage.clear();
      }
    }
  };
  return (
    <div className="bg-grey-200 App">
      <BrowserRouter>
        <Routes data={state.verify} refresh={Refresh} />
      </BrowserRouter>
    </div>
  );
}

export default App;
