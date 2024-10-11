// server/controllers/image.controller.js
import db from '../config/database.js'; // Assurez-vous que votre configuration de base de données est correcte

// Récupérer toutes les images
export const getImages = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM image'); // Remplacez par votre requête SQL appropriée
    res.json(rows);
  } catch (error) {
    console.error('Erreur lors de la récupération des images:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

