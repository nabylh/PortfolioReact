import pool from '../config/db.js';

// Récupérer toutes les sous-catégories
export const getAllUndercategories = async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const sql = `SELECT * FROM undercategory ORDER BY name ASC`; // Trier les sous-catégories par nom (ordre croissant)
        const [rows] = await connection.query(sql);
        connection.release();

        res.json(rows);
    } catch (err) {
        console.error('Erreur de connexion à la base de données :', err);
        res.status(500).send('Erreur de connexion à la base de données.');
    }
};

// Récupérer une sous-catégorie par ID
export const getUndercategoryById = async (req, res) => {
    const { id } = req.params;
    try {
        const connection = await pool.getConnection();
        const sql = `SELECT * FROM undercategory WHERE id = ?`;
        const [rows] = await connection.query(sql, [id]);
        connection.release();

        if (rows.length > 0) {
            res.json(rows[0]); // Retourner la sous-catégorie correspondante
        } else {
            res.status(404).send('Sous-catégorie non trouvée.');
        }
    } catch (err) {
        console.error('Erreur de connexion à la base de données :', err);
        res.status(500).send('Erreur de connexion à la base de données.');
    }
};

// Récupérer les articles associés à une sous-catégorie par ID
export const getArticlesByUndercategoryId = async (req, res) => {
    const { id } = req.params; // ID de la sous-catégorie
    try {
        const connection = await pool.getConnection();
        const sql = `
            SELECT a.*
            FROM article AS a
            WHERE a.undercategory_id = ?`; // Assurez-vous que undercategory_id existe dans la table article
        const [rows] = await connection.query(sql, [id]);
        connection.release();

        if (rows.length > 0) {
            res.json(rows); // Retourner les articles associés à la sous-catégorie
        } else {
            res.status(404).send('Aucun article trouvé pour cette sous-catégorie.');
        }
    } catch (err) {
        console.error('Erreur de connexion à la base de données :', err);
        res.status(500).send('Erreur de connexion à la base de données.');
    }
};

// Récupérer une sous-catégorie par nom
export const getUndercategoryByName = async (req, res) => {
    const { name } = req.params; // Nom de la sous-catégorie
    try {
        const connection = await pool.getConnection();
        const sql = `SELECT * FROM undercategory WHERE name = ?`;
        const [rows] = await connection.query(sql, [name]);
        connection.release();

        if (rows.length > 0) {
            res.json(rows[0]); // Retourner la sous-catégorie correspondante
        } else {
            res.status(404).send('Sous-catégorie non trouvée.');
        }
    } catch (err) {
        console.error('Erreur de connexion à la base de données :', err);
        res.status(500).send('Erreur de connexion à la base de données.');
    }
};
export const getArticlesByUndercategoryName = async (req, res) => {
    const { name } = req.params; // Récupère le nom de la sous-catégorie

    try {
        const connection = await pool.getConnection();
        
        // Recherche la sous-catégorie par son nom
        const [undercategory] = await connection.query('SELECT * FROM undercategory WHERE name = ?', [name]);

        if (undercategory.length === 0) {
            return res.status(404).send('Sous-catégorie non trouvée.');
        }

        const undercategoryId = undercategory[0].id; // Récupère l'ID de la sous-catégorie

        // Recherche les articles associés à cette sous-catégorie
        const [articles] = await connection.query('SELECT * FROM article WHERE undercategory_id = ?', [undercategoryId]);
        connection.release();

        res.json(articles); // Renvoie les articles trouvés
    } catch (err) {
        console.error('Erreur lors de la récupération des articles :', err);
        res.status(500).send('Erreur lors de la récupération des articles.');
    }
};