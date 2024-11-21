import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/category"); // Remplace l'URL par celle pour récupérer les catégories
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des catégories");
        }
        const data = await response.json();
        console.log(data); // Vérifiez ici les données reçues
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
        <li key={category.id} className="category-item">
          <h2>{category.name}</h2>
      {category.description}
          <Link
            to={`/category/${encodeURIComponent(category.name)}/`}
            className="category-link"
          >
            Voir les articles
          </Link>
          

          
         
          
        </li>
      ))}
    </ul>
  );
};





export default Categories;
