import pool from '../config/db.js';

// Récupérer toutes les catégories avec leurs articles associés
export const getAllCategoriesWithArticles = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const sql = `
            SELECT c.*, a.title AS article_title, a.id AS article_id
            FROM category AS c
            LEFT JOIN article AS a ON c.id = a.undercategory_id
            ORDER BY c.id`;
        
        const [rows] = await connection.query(sql);
        connection.release();
        
        // Formater les résultats pour regrouper les articles par catégorie
        const categories = rows.reduce((acc, row) => {
            const category = acc.find(cat => cat.id === row.id);
            if (category) {
                category.articles.push({ id: row.article_id, title: row.article_title });
            } else {
                acc.push({
                    id: row.id,
                    name: row.name,
                    articles: row.article_id ? [{ id: row.article_id, title: row.article_title }] : []
                });
            }
            return acc;
        }, []);

        res.json(categories);
    } catch (err) {
        console.error('Erreur de connexion à la base de données :', err);
        res.status(500).send('Erreur de connexion à la base de données.');
    }
};

// Récupérer une catégorie par ID avec ses articles associés
export const getCategoryByIdWithArticles = async (req, res) => {
    const { id } = req.params;
    try {
        const connection = await pool.getConnection();
        const sql = `
            SELECT c.*, a.title AS article_title, a.id AS article_id
            FROM category AS c
            LEFT JOIN article AS a ON c.id = a.undercategory_id
            WHERE c.id = ?`;
        
        const [rows] = await connection.query(sql, [id]);
        connection.release();
        
        if (rows.length > 0) {
            const category = {
                id: rows[0].id,
                name: rows[0].name,
                articles: rows.filter(row => row.article_id).map(row => ({ id: row.article_id, title: row.article_title }))
            };
            res.json(category);
        } else {
            res.status(404).send('Catégorie non trouvée.');
        }
    } catch (err) {
        console.error('Erreur de connexion à la base de données :', err);
        res.status(500).send('Erreur de connexion à la base de données.');
    }
};

// Récupérer une catégorie par nom avec les articles associés
export const getCategoryByName = async (req, res) => {
    const { name } = req.params;

    try {
        const connection = await pool.getConnection();
        const sql = `
            SELECT c.*, a.id AS article_id, a.title AS article_title
            FROM category AS c
            LEFT JOIN article AS a ON c.id = a.undercategory_id
            WHERE c.name = ?`;
        
        const [rows] = await connection.query(sql, [name]);
        connection.release();

        if (rows.length > 0) {
            const category = {
                id: rows[0].id,
                name: rows[0].name,
                articles: rows.filter(row => row.article_id).map(row => ({ id: row.article_id, title: row.article_title }))
            };
            res.json(category);
        } else {
            res.status(404).send('Catégorie non trouvée.');
        }
    } catch (err) {
        console.error('Erreur de connexion à la base de données :', err);
        res.status(500).send('Erreur de connexion à la base de données.');
    }
};
