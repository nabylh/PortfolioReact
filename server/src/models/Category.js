// src/models/Category.js
import pool from "../config/db.js";

class Category {
    static async findAll() {
        try {
            const [rows] = await pool.query("SELECT * FROM category ORDER BY name");
            return rows;
        } catch (error) {
            throw new Error(`Error fetching categories: ${error.message}`);
        }
    }


    static async findByName(name) {
        try {
            const [rows] = await pool.query("SELECT * FROM category WHERE name = ?", [name]);
            return rows[0];
        } catch (error) {
            throw new Error(`Error fetching category by name: ${error.message}`);
        }
    }
    static async getCategoryBy_Name(categoryName) {
        try {
            const [rows] = await pool.query(
                `SELECT * 
                 FROM category
                 WHERE name = ?
                 LIMIT 1`,
                [categoryName]
            );
            return rows[0] || null; // Retourne null si aucune catégorie n'est trouvée
        } catch (error) {
            throw new Error(`Error fetching category by name: ${error.message}`);
        }
    }
    static async getUndercategoriesByCategoryName(categoryName) {
        try {
            const [rows] = await pool.query(
                `SELECT u.id, u.category_id, u.name, u.description
                FROM undercategory u
                JOIN category c ON u.category_id = c.id
                WHERE c.name = ?`,
                [categoryName]
            );
            return rows;
        } catch (error) {
            throw new Error(`Error fetching undercategories by category name: ${error.message}`);
        }
    }
    static async getCategoryByCategoryName(categoryName) {
        try {
            const [rows] = await pool.query(
                `SELECT * 
                 FROM category
                 WHERE name = ?
                 LIMIT 1`, // Limiter à un seul résultat si chaque nom de catégorie est unique
                [categoryName]
            );
            return rows[0]; // Renvoyer uniquement la première ligne si une seule catégorie est attendue
        } catch (error) {
            throw new Error(`Error fetching category by category name: ${error.message}`);
        }
    }
    static async create({ name, description }) {
        try {
            const [result] = await pool.query(
                "INSERT INTO category (name, description) VALUES (?, ?)",
                [name, description]
            );
            return { id: result.insertId, name, description };
        } catch (error) {
            throw new Error(`Error creating category: ${error.message}`);
        }
    }

    static async update({ name, description }, id) {
        try {
            await pool.query(
                "UPDATE category SET name = ?, description = ? WHERE id = ?",
                [name, description, id]
            );
            return { id, name, description };
        } catch (error) {
            throw new Error(`Error updating category: ${error.message}`);
        }
    }

    static async remove(id) {
        try {
            await pool.query("DELETE FROM category WHERE id = ?", [id]);
            return { id };
        } catch (error) {
            throw new Error(`Error deleting category: ${error.message}`);
        }
    }
}

export default Category;