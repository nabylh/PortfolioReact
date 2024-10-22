import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
    <ul>
      {articles.map((article, index) => (
        <li
          key={article.id}
          className={index >= 1 ? `article-${article.id}` : "regular-article"}
        >
          <h2>{article.title}</h2>
          <p>{article.content}</p>
          <small>
            Publié le : {new Date(article.created_at).toLocaleDateString()}
          </small>
          {/* Lien vers la page des articles sous catégorie */}
          <Link
            to={`/undercategory/${article.undercategory_name}/articles`}
            className="undercategory-link"
          >
            {article.undercategory_name}
            {"web "}
            {/* Affichage du nom de la sous-catégorie */}
          </Link>



          {/* Lien vers la page des commentaires de l'article */}
          <Link to={`/comments/${article.id}`} className="comments-link">
            Voir les commentaires
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Articles;
