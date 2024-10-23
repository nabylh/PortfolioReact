// src/models/Article.js
import pool from "../config/db.js";

class Article {
    static async findAll() {
        try {
            const [rows] = await pool.query("SELECT * FROM article ORDER BY created_at DESC");
            return rows;
        } catch (error) {
            throw new Error(`Error fetching articles: ${error.message}`);
        }
    }

    static async findById(id) {
        try {
            const [rows] = await pool.query("SELECT * FROM article WHERE id = ?", [id]);
            return rows[0];
        } catch (error) {
            throw new Error(`Error fetching article by ID: ${error.message}`);
        }
    }

    static async create({ title, content, source, underCategory_id }) {
        try {
            const [result] = await pool.query(
                "INSERT INTO article (title, content, source, underCategory_id) VALUES (?, ?, ?, ?)",
                [title, content, source, underCategory_id]
            );
            return { id: result.insertId, title, content, source, underCategory_id };
        } catch (error) {
            throw new Error(`Error creating article: ${error.message}`);
        }
    }

    static async update({ title, content, source, underCategory_id }, id) {
        try {
            await pool.query(
                "UPDATE article SET title = ?, content = ?, source = ?, underCategory_id = ? WHERE id = ?",
                [title, content, source, underCategory_id, id]
            );
            return { id, title, content, source, underCategory_id };
        } catch (error) {
            throw new Error(`Error updating article: ${error.message}`);
        }
    }

    static async findByUndercategoryName(undercategoryName) {
        try {
            const [rows] = await pool.query(`
                SELECT a.*, u.name as undercategory_name 
                FROM article a
                JOIN undercategory u ON a.undercategory_id = u.id
                WHERE u.name = ?
                ORDER BY a.created_at DESC
            `, [undercategoryName]);
            return rows;
        } catch (error) {
            throw new Error(`Error fetching articles by undercategory name: ${error.message}`);
        }
    }


    static async remove(id) {
        try {
            await pool.query("DELETE FROM article WHERE id = ?", [id]);
            return { id };
        } catch (error) {
            throw new Error(`Error deleting article: ${error.message}`);
        }
        
    }
}



export default Article;