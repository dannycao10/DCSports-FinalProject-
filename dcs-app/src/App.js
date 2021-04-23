import NavbarContainer from "./components/NavbarContainer.jsx";
import { BrowserRouter } from "react-router-dom";
import React, { useState, useEffect } from "react";
import UserContext from "./context/UserContext.js";
import uri from "./context/APIPort";
import Axios from "axios";
import './App.css';

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    userInfo: {
      username: undefined,
      fname: undefined,
      lname: undefined,
      city: undefined,
      state: undefined,
      unc: undefined,
      favorite: undefined,
      dcs: undefined,
    }
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if (token == null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await Axios.post(uri + "/users/validateToken", null, {
        headers: { "auth-token": token }
      });
      if (tokenRes.data.valid) {
        const userRes = await Axios.get(uri + "/users/" + tokenRes.data.user._id);
        setUserData({
          token: tokenRes.data.token,
          userInfo: userRes.data,
        });
      }
      if (!userData) {
        console.log("still not here");
      }
    }
    checkLoggedIn();
  }, []);

  return (
    <BrowserRouter>
      <UserContext.Provider>
        <NavbarContainer />
      </UserContext.Provider>
    </BrowserRouter >
  );
}

export default App;
