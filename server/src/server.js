import express from 'express';
import pool from './config/db.js'; 
import path from 'path';
import cors from 'cors';
import articlesRoutes from "./routes/articles.routes.js";
import imagesRoutes from './routes/images.routes.js';
import undercategoryRoutes from './routes/undercategory.routes.js';
import categoryRoutes from './routes/category.routes.js'; 



const app = express();
const PORT = process.env.PORT || 3000;
const imagesPath = path.join(process.cwd(), './client/public/assets/images')


app.use(cors());

 app.use('/images', express.static(path.join(process.cwd(), 'server/public/images')));
 app.use('/articles', articlesRoutes);
 app.use('/images', imagesRoutes);
 app.use('/undercategory', undercategoryRoutes);
 app.use('/category', categoryRoutes);
 
 













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




// Article par ID :
app.get('/article/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const connection = await pool.getConnection();
        console.log('Connecté à la bdd blog :', connection.config.database);

        const [rows] = await connection.query('SELECT * FROM article ', [id]);
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

// Sous-catégorie par ID :
app.get('/undercategory/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const connection = await pool.getConnection();
        console.log('Connecté à la bdd blog :', connection.config.database);

        const sql = 'SELECT * FROM undercategory ';
        const [rows] = await connection.query(sql, [id]);
        connection.release();

        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).send('Sous-catégorie non trouvée.');
        }
    } catch (err) {
        console.error('Erreur de connexion à la base de données :', err);
        res.status(500).send('Erreur de connexion à la base de données.');
    }
});



// Articles par sous-catégorie :
app.get('/articles/undercategory/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const connection = await pool.getConnection();
        console.log('Connecté à la bdd blog :', connection.config.database);

        const sql = `
            SELECT 
                article.id, article.title, article.content, article.created_at, 
                undercategory.name AS undercategory_name 
            FROM 
                article 
            JOIN 
                undercategory ON article.undercategory_id = undercategory.id 
            `;

        const [rows] = await connection.query(sql, [id]);
        connection.release();

        if (rows.length > 0) {
            res.json(rows);
        } else {
            res.status(404).send('Aucun article trouvé pour cette sous-catégorie.');
        }
    } catch (err) {
        console.error('Erreur de connexion à la base de données :', err);
        res.status(500).send('Erreur de connexion à la base de données.');
    }
    
});


// Articles par catégorie :
app.get('/articles/category/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const connection = await pool.getConnection();
        console.log('Connecté à la bdd blog :', connection.config.database);

        const sql = `
            SELECT 
                article.id, article.title, article.content, article.created_at, 
                category.name AS category_name 
            FROM 
                article 
            JOIN 
                undercategory ON article.undercategory_id = undercategory.id
            JOIN 
                category ON undercategory.category_id = category.id
            WHERE 
                category.id = ?`;

        const [rows] = await connection.query(sql, [id]);
        connection.release();

        if (rows.length > 0) {
            res.json(rows);
        } else {
            res.status(404).send('Aucun article trouvé pour cette catégorie.');
        }
    } catch (err) {
        console.error('Erreur de connexion à la base de données :', err);
        res.status(500).send('Erreur de connexion à la base de données.');
    }
});

