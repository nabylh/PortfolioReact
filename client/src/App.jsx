import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "../src/components/Header.jsx";
import Main from "../src/components/Main.jsx";
import "../public/assets/styles/responsive.scss";

function App() {
  return (
    <Router>
      <Routes>
        {}
        <Route
          path="/"
          element={
            <>
              <Header />
              <Main />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
