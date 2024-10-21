// server/controllers/category.controller.js

// Importation de la base de données ou du module pour interagir avec la base de données
const db = require('../db'); // ou utilise ta configuration de base de données

// Fonction qui récupère les articles pour une catégorie et sous-catégorie spécifiques
exports.getCategoryWithUndercategory = async (req, res) => {
  const { category, undercategory } = req.params; // Récupère les paramètres de l'URL

  try {
    // Requête SQL pour récupérer les articles en fonction de la catégorie et sous-catégorie
    const query = `
      SELECT article.*
      FROM article
      JOIN undercategory ON article.undercategory_id = undercategory.id
      JOIN category ON undercategory.category_id = category.id
      WHERE category.name = ? AND undercategory.name = ?
    `;
    // Exécution de la requête SQL avec les paramètres
    const articles = await db.query(query, [category, undercategory]);

    if (articles.length > 0) {
      res.status(200).json({ articles }); // Retourne les articles sous forme de JSON
    } else {
      res.status(404).json({ message: "Aucun article trouvé pour cette catégorie et sous-catégorie." });
    }
  } catch (error) {
    res.status(500).json({ error: "Une erreur est survenue lors de la récupération des articles." });
  }
};
