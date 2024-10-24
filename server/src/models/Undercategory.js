// src/models/Undercategory.js
import pool from "../config/db.js";

class Undercategory {
    static async findAll() {
        try {
            const [rows] = await pool.query("SELECT * FROM undercategory ORDER BY name");
            return rows;
        } catch (error) {
            throw new Error(`Error fetching undercategories: ${error.message}`);
        }
    }
    static async findByName(name) {
        try {
            const [rows] = await pool.query("SELECT * FROM undercategory WHERE name = ?", [name]);
            return rows[0]; // Retourne la première sous-catégorie trouvée (ou undefined si aucune n'est trouvée)
        } catch (error) {
            throw new Error(`Error fetching undercategory by name: ${error.message}`);
        }
    }

    

    static async create({ category_id, name, description }) {
        try {
            const [result] = await pool.query(
                "INSERT INTO undercategory (category_id, name, description) VALUES (?, ?, ?)",
                [category_id, name, description]
            );
            return { id: result.insertId, category_id, name, description };
        } catch (error) {
            throw new Error(`Error creating undercategory: ${error.message}`);
        }
    }

    static async update({ category_id, name, description }, id) {
        try {
            await pool.query(
                "UPDATE undercategory SET category_id = ?, name = ?, description = ? WHERE id = ?",
                [category_id, name, description, id]
            );
            return { id, category_id, name, description };
        } catch (error) {
            throw new Error(`Error updating undercategory: ${error.message}`);
        }
    }

    static async remove(id) {
        try {
            await pool.query("DELETE FROM undercategory WHERE id = ?", [id]);
            return { id };
        } catch (error) {
            throw new Error(`Error deleting undercategory: ${error.message}`);
        }
    }
}

export default Undercategory;