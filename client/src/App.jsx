import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "../src/components/Header.jsx";
import Main from "../src/components/Main.jsx";
import Articles from "../src/components/Articles.jsx";
import "../public/assets/styles/responsive.scss";
import CommentsPage from "./components/CommentsPage";
import Undercategory from "./components/Undercategory.jsx";
import Category from "./components/Category";

function App() {
  return (
    <Router>
      <Header />
      {/* Header en dehors des Routes pour l'afficher sur toutes les pages */}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/articles" element={<Articles />} />
        {/* Route pour afficher les articles */}
        <Route path="/comments/:articleId" element={<CommentsPage />} />
        {/* Correction ici : Utilisation de `element` à la place de `component` */}
        <Route path="/undercategory" element={<Undercategory />} />
        <Route path="/category" element={<Category />} />
      </Routes>
    </Router>
  );
}

export default App;
