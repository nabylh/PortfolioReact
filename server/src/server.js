import express from 'express';
import pool from './config/db.js'; 
import path from 'path';
import cors from 'cors';

// Import des routes modulaire
import articlesRoutes from './routes/articles.routes.js';
import undercategoryRoutes from './routes/undercategory.routes.js';
import categoryRoutes from './routes/category.routes.js';
import imagesRoutes from './routes/images.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;
const imagesPath = path.join(process.cwd(), './client/public/assets/images');


app.use(cors());

//  fichiers statiques (a voir si je garde ce chemin )
app.use('/images', express.static(path.join(process.cwd(), 'server/public/images')));


app.use('/articles', articlesRoutes);
app.use('/undercategory', undercategoryRoutes); 
app.use('/category', categoryRoutes); 
app.use('/images', imagesRoutes);


app.get('/', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        console.log("Connecté à la base de données :", connection.config.database);
        
     
        const [rows] = await connection.query('SELECT * FROM article LIMIT 10');
        connection.release();
        
        res.json(rows);
        
    } catch (err) {
        console.error("Erreur de connexion à la base de données :", err);
        res.status(500).send('Erreur de connexion à la base de données.');
    }
});

//  article par ID
app.get('/article/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const connection = await pool.getConnection();
        console.log('Connecté à la base de données :', connection.config.database);

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


app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
