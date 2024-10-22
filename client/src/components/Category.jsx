import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/category");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des catégories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []); 

  if (loading) {
    return <p>Chargement des catégories...</p>;
  }

  return (
    <ul>
      {categories.map((category) => (
        <li key={category.id}>
          <h2>{category.name}</h2>
          <p>{category.description}</p>
          {/* Lien vers les articles associés à cette catégorie */}
          <Link
            to={`/category/${category.id}/articles`}
            className="articles-link"
          >
            Voir les articles dans cette catégorie
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Category;
