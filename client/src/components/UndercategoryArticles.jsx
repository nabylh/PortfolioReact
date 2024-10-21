// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";

// const UndercategoryArticles = () => {
//   const { undercategoryName } = useParams(); // Récupérer le nom de la sous-catégorie depuis l'URL
//   const [articles, setArticles] = useState([]); // État pour stocker les articles
//   const [loading, setLoading] = useState(true); // État pour gérer le chargement
//   const [error, setError] = useState(null); // État pour gérer les erreurs

//   useEffect(() => {
//     const fetchArticles = async () => {
//       try {
//         // Effectuer une requête pour récupérer les articles basés sur le nom de la sous-catégorie
//         const response = await fetch(
//           `http://localhost:3000/undercategory/name/${undercategoryName}/articles`
//         );

//         if (!response.ok) {
//           throw new Error("Erreur lors de la récupération des articles");
//         }

//         // Convertir la réponse en JSON
//         const data = await response.json();
//         setArticles(data); // Mettre à jour l'état avec les articles récupérés
//       } catch (error) {
//         setError(error.message); // Mettre à jour l'état d'erreur si une erreur se produit
//         console.error("Erreur lors de la récupération des articles :", error);
//       } finally {
//         setLoading(false); // Changer l'état de chargement à false après la requête
//       }
//     };

//     fetchArticles(); // Appeler la fonction pour récupérer les articles
//   }, [undercategoryName]); // Dépendance pour exécuter à chaque changement de nom de sous-catégorie

//   // Gérer l'état de chargement
//   if (loading) {
//     return <p>Chargement des articles...</p>;
//   }

//   // Gérer les erreurs
//   if (error) {
//     return <p>Erreur : {error}</p>;
//   }

//   // Gérer le cas où aucun article n'est trouvé
//   if (articles.length === 0) {
//     return <p>Aucun article trouvé dans cette sous-catégorie.</p>;
//   }

//   // Afficher les articles
//   return (
//     <ul>
//       {articles.map((article) => (
//         <li key={article.id}>
//           <h2>{article.title}</h2>
//           <p>{article.content}</p>
//           <small>
//             Publié le : {new Date(article.created_at).toLocaleDateString()}
//           </small>
//         </li>
//       ))}
//     </ul>
//   );
// };

// export default UndercategoryArticles;
