// routes/undercategory.routes.js
import express from 'express';
import db from '../config/db.js';  // Assurez-vous que ce fichier exporte la connexion à la base de données

const router = express.Router();

// Route pour récupérer toutes les sous-catégories
router.get('/', async (req, res) => {
  const query = 'SELECT * FROM undercategory';  // Assurez-vous que la table existe
  
  try {
    const [results] = await db.query(query); 
    res.json(results); 
  } catch (err) {
    return res.status(500).json({ message: 'Erreur lors de la récupération des sous-catégories', error: err });
  }
});

// Route pour récupérer une sous-catégorie par son ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM undercategory WHERE id = ?';
  
  try {
    const [rows] = await db.query(query, [id]);
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ message: 'Sous-catégorie non trouvée.' });
    }
  } catch (err) {
    console.error("Erreur lors de la récupération de la sous-catégorie :", err);
    res.status(500).json({ message: 'Erreur lors de la récupération de la sous-catégorie', error: err });
  }
});

export default router;



