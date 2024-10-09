import express from 'express';
import pool from './config/db.js'; 
import path from 'path';
import cors from 'cors';
import articlesRoutes from "./routes/articles.routes.js";



const app = express();
const PORT = process.env.PORT || 3000;
const imagesPath = path.join(process.cwd(), './client/public/assets/images')
 console.log("chemin ok pour les images",imagesPath);

app.use(cors());

app.use('/assets/images', express.static(path.join(process.cwd(), '/public/assets/images')));
app.use('/articles', articlesRoutes);

app.get('/', async (req, res) => {
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

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});

