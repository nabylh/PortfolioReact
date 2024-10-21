// server/routes/category.routes.js
import express from 'express';
import db from '../config/db.js';  // Assure-toi que ce fichier exporte la connexion à la base de données

const router = express.Router();

// Route pour récupérer toutes les catégories
router.get('/', async (req, res) => {
  const query = 'SELECT * FROM category';  // Requête SQL pour récupérer toutes les catégories

  try {
    const [results] = await db.query(query);  // Exécuter la requête SQL
    res.status(200).json(results);  // Réponse avec les résultats sous forme de JSON
  } catch (err) {
    console.error("Erreur lors de la récupération des catégories :", err);
    res.status(500).json({ message: 'Erreur lors de la récupération des catégories', error: err });
  }
});

// Route pour récupérer une catégorie par son ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;  // Récupérer l'ID depuis l'URL
  const query = 'SELECT * FROM category WHERE id = ?';  // Requête SQL pour récupérer une catégorie par ID

  try {
    const [rows] = await db.query(query, [id]);  // Exécuter la requête SQL avec l'ID comme paramètre
    if (rows.length > 0) {
      res.status(200).json(rows[0]);  // Si la catégorie est trouvée, renvoyer la première entrée
    } else {
      res.status(404).json({ message: 'Catégorie non trouvée.' });  // Si aucune catégorie trouvée
    }
  } catch (err) {
    console.error("Erreur lors de la récupération de la catégorie :", err);
    res.status(500).json({ message: 'Erreur lors de la récupération de la catégorie', error: err });
  }
});

export default router;


