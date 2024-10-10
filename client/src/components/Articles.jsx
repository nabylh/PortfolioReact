// Articles.jsx
import React, { useState, useEffect } from "react";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch("http://localhost:3000/articles");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des articles");
        }
        const data = await response.json();
        setArticles(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des articles :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return <p>Chargement des articles...</p>;
  }

  return (
    <div>
      <h1>Liste des articles</h1>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <h2>{article.title}</h2>
            <p>{article.content}</p>
            <small>
              Publié le : {new Date(article.created_at).toLocaleDateString()}
            </small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Articles;
