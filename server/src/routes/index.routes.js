import express from 'express';
import pool from '../config/db.js'; 

const router = express.Router();





router.get('/assets/images', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        console.log("Connecté à la bdd blog :", connection.config.database);
        
        const [rows] = await connection.query('SELECT * FROM image LIMIT 10'); 
        connection.release(); 
        
        res.json(rows); 
    } catch (err) {
        console.error("Erreur de connexion à la base de données :", err);
        res.status(500).send('Erreur de connexion à la base de données.');
    }
});





export default router;

