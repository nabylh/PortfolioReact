// server/src/server.js
import express from 'express';
import pool from './config/db.js'; // Assure-toi que le chemin est correct

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        console.log("Connecté à la bdd blog :", connection.config.database);
        
        // Exécute une requête simple (par exemple, obtenir les articles)
        const [rows] = await connection.query('SELECT * FROM article LIMIT 10'); 
        connection.release(); // Libérer la connexion après utilisation
        
        res.json(rows); // Retourne les résultats au format JSON
    } catch (err) {
        console.error("Erreur de connexion à la base de données :", err);
        res.status(500).send('Erreur de connexion à la base de données.');
    }
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});

