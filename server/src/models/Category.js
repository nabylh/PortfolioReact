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

    static async findById(id) {
        try {
            const [rows] = await pool.query("SELECT * FROM category WHERE id = ?", [id]);
            return rows[0];
        } catch (error) {
            throw new Error(`Error fetching category by ID: ${error.message}`);
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