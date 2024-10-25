import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const Category = () => {
  const {categoryName} = useParams();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(`http://localhost:3000/category/${encodeURIComponent(categoryName)}`);
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération de la catégorie");
        }
        const data = await response.json();
        setCategory(data);
      } catch (error) {
        console.error("Erreur lors de la récupération de la catégorie :", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [categoryName]);

  if (loading) {
    return <p>Chargement de la catégorie...</p>;
  }

  if (error) {
    return <p>Erreur : {error}</p>;
  }

  if (!category) {
    return <p>Catégorie non trouvée.</p>;
  }

  return (
    <ul>
      <h2>{category.name}</h2>
      <p>{category.description}</p>
      {/* Ici, vous pouvez ajouter la liste des articles de cette catégorie */}
      <h3>Articles dans cette catégorie :</h3>
      
      {category.articles && category.articles.length > 0 ? (
        <ul>
          {category.articles.map((article) => (
            <li key={article.id}>
              <Link to={`/article/${article.id}`}>{article.title}</Link>
              
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucun article dans cette catégorie.</p>
      )}
    </ul>
  );
};

export default Category;