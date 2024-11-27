// import { useState, useEffect } from "react";
import "./fonts/font.css";
import "./App.css";
// import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";

import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Publish from "./pages/Publish";

import Header from "./components/Header";

function App() {
  const [token, setToken] = useState(Cookies.get("userToken") || null);
  const [title, setTitle] = useState("");

  const handleConnexionStatus = (token) => {
    if (token === null) {
      Cookies.remove("userToken");
    } else {
      Cookies.set("userToken", token, { expires: 14 });
    }
    setToken(token);
  };
  return (
    <Router>
      <Header
        token={token}
        handleConnexionStatus={handleConnexionStatus}
        title={title}
        setTitle={setTitle}
      />
      <Routes>
        <Route path="/" element={<Home title={title} />} />
        <Route path="/offers/:id" element={<Offer />} />
        <Route
          path="/signup"
          element={<Signup handleConnexionStatus={handleConnexionStatus} />}
        />
        <Route
          path="/login"
          element={<Login handleConnexionStatus={handleConnexionStatus} />}
        />
        <Route path="/publish" element={<Publish token={token} />} />
      </Routes>
    </Router>
  );
}

export default App;
