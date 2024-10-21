import express from 'express';
import db from '../config/db.js';  // Assurez-vous que ce fichier exporte la connexion à la base de données

const router = express.Router();

// Route pour récupérer tous les articles
router.get('/', async (req, res) => {
  const query = 'SELECT * FROM article';
  
  try {
    const [results] = await db.query(query); 
    res.json(results); 
  } catch (err) {
    return res.status(500).json({ message: 'Erreur lors de la récupération des articles', error: err });
  }
});

// Route pour récupérer un article par son ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM article WHERE id = ?';
  
  try {
    const [rows] = await db.query(query, [id]);  // Utilisation directe de db.query() avec l'ID
    if (rows.length > 0) {
      res.json(rows[0]);  // Si l'article est trouvé, on le retourne
    } else {
      res.status(404).json({ message: 'Article non trouvé.' });  // Sinon, on retourne une erreur 404
    }
  } catch (err) {
    console.error("Erreur lors de la récupération de l'article :", err);
    res.status(500).json({ message: 'Erreur lors de la récupération de l\'article', error: err });
  }
});

export default router;







