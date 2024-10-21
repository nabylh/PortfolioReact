import express from 'express';
import db from '../config/db.js'; 
const router = express.Router();


router.get('/', async (req, res) => {
  const query = 'SELECT id, pseudo, email, role, created_at, status FROM user'; 
  
  try {
    const [results] = await db.query(query); 
    res.json(results); 
  } catch (err) {
    return res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs', error: err });
  }
});

export default router;