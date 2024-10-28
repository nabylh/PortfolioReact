import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "../src/components/Header.jsx";
import Main from "../src/components/Main.jsx";
import Articles from "../src/components/Articles.jsx";
import "../public/assets/styles/responsive.scss";
import CommentsPage from "./components/CommentsPage";
import Undercategory from "./components/Undercategory.jsx";
import Category from "./components/Category";
import UndercategoryArticles from "./components/UndercategoryArticles";
import NotFound from "./components/NotFound"; // Assurez-vous de créer ce composant

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/article" element={<Articles />} />
        <Route path="/comments/:articleId" element={<CommentsPage />} />
        <Route path="/undercategory" element={<Undercategory />} />
        <Route path="/category" element={<Category />} />
        <Route path="/category/:categoryName" element={<Category />} />
        <Route path="/undercategory/:undercategoryName"element={<UndercategoryArticles />}/>
        <Route path="/category/:categoryName/undercategory/:undercategoryName/article" element={<UndercategoryArticles />} />

        <Route path="/category/:categoryName" element={<Category />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;