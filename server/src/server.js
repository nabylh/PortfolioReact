import express from 'express';
import pool from './config/db.js'; 
import path from 'path';
import cors from 'cors';
import articlesRoutes from "./routes/articles.routes.js";
import imagesRoutes from './routes/images.routes.js';



const app = express();
const PORT = process.env.PORT || 3000;
const imagesPath = path.join(process.cwd(), './client/public/assets/images')


app.use(cors());

 app.use('/images', express.static(path.join(process.cwd(), 'server/public/images')));
 app.use('/articles', articlesRoutes);
 app.use('/images', imagesRoutes);
 
 

app.get('/', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        console.log("Connecté à la bdd blog :", connection.config.database);
        
        
        const [rows] = await connection.query('SELECT * FROM article LIMIT 10'); 
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





app.get('/article/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const connection = await pool.getConnection();
        console.log('Connecté à la bdd blog :', connection.config.database);

        const [rows] = await connection.query('SELECT * FROM article WHERE id = ?', [id]);
        connection.release();

        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).send('Article non trouvé.');
        }
    } catch (err) {
        console.error('Erreur de connexion à la base de données :', err);
        res.status(500).send('Erreur de connexion à la base de données.');
    }
});


