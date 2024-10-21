import pool from '../config/db.js';

// Récupérer tous les articles
export const getAllArticles = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const sql = `SELECT * FROM article ORDER BY created_at DESC`; // Trier les articles par date de création (ordre décroissant)
        const [rows] = await connection.query(sql);
        connection.release();

        res.json(rows);
    } catch (err) {
        console.error('Erreur de connexion à la base de données :', err);
        res.status(500).send('Erreur de connexion à la base de données.');
    }
};

// Récupérer un article par ID
export const getArticleById = async (req, res) => {
    const { id } = req.params;
    try {
        const connection = await pool.getConnection();
        const sql = `SELECT * FROM article WHERE id = ?`;
        const [rows] = await connection.query(sql, [id]);
        connection.release();

        if (rows.length > 0) {
            res.json(rows[0]); // Retourner l'article correspondant
        } else {
            res.status(404).send('Article non trouvé.');
        }
    } catch (err) {
        console.error('Erreur de connexion à la base de données :', err);
        res.status(500).send('Erreur de connexion à la base de données.');
    }
};

// Récupérer les articles par sous-catégorie (undercategory)
export const getArticlesBySubcategory = async (req, res) => {
    const { id } = req.params; // ID de la sous-catégorie (undercategory)
    try {
        const connection = await pool.getConnection();
        const sql = `
            SELECT a.*
            FROM article AS a
            WHERE a.undercategory_id = ?`; // Assurez-vous que undercategory_id existe dans la table article
        const [rows] = await connection.query(sql, [id]);
        connection.release();

        if (rows.length > 0) {
            res.json(rows); // Retourner tous les articles de la sous-catégorie
        } else {
            res.status(404).send('Aucun article trouvé pour cette sous-catégorie.');
        }
    } catch (err) {
        console.error('Erreur de connexion à la base de données :', err);
        res.status(500).send('Erreur de connexion à la base de données.');
    }
};
