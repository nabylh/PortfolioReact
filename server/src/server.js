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

// Middlewares
app.use(cors());

// Gestion des fichiers statiques (images par exemple)
app.use('/images', express.static(path.join(process.cwd(), 'server/public/images')));

// Utilisation des routes modulaires
app.use('/articles', articlesRoutes); // Pour toutes les routes liées aux articles
app.use('/undercategory', undercategoryRoutes); // Routes pour les sous-catégories
app.use('/category', categoryRoutes); // Routes pour les catégories
app.use('/images', imagesRoutes); // Routes pour la gestion des images

// Route d'accueil pour tester la connexion à la base de données
app.get('/', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        console.log("Connecté à la base de données :", connection.config.database);
        
        // Exemple : récupérer les 10 premiers articles
        const [rows] = await connection.query('SELECT * FROM article LIMIT 10');
        connection.release();
        
        res.json(rows);
    } catch (err) {
        console.error("Erreur de connexion à la base de données :", err);
        res.status(500).send('Erreur de connexion à la base de données.');
    }
});

// Exemple de route individuelle pour récupérer un article par ID
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

// Lancer le serveur
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
