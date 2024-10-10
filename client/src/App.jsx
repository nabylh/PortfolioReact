import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "../src/components/Header.jsx";
import Main from "../src/components/Main.jsx";
import Articles from "../src/components/Articles.jsx"; // Assurez-vous que le chemin est correct
import "../public/assets/styles/responsive.scss";

function App() {
  return (
    <Router>
      <Header />{" "}
      {/* Header en dehors des Routes pour l'afficher sur toutes les pages */}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/articles" element={<Articles />} />{" "}
        {/* Route pour afficher les articles */}
      </Routes>
    </Router>
  );
}

export default App;
