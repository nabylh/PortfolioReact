// src/models/User.js
import pool from "../config/db.js";

class User {
    static async findAll() {
        try {
            const [rows] = await pool.query("SELECT id, pseudo, email, role, created_at, status FROM user");
            return rows;
        } catch (error) {
            throw new Error(`Error fetching users: ${error.message}`);
        }
    }

    static async findById(id) {
        try {
            const [rows] = await pool.query("SELECT id, pseudo, email, role, created_at, status FROM user WHERE id = ?", [id]);
            return rows[0];
        } catch (error) {
            throw new Error(`Error fetching user by ID: ${error.message}`);
        }
    }

    static async findByEmail(email) {
        try {
            const [rows] = await pool.query("SELECT * FROM user WHERE email = ?", [email]);
            return rows[0];
        } catch (error) {
            throw new Error(`Error fetching user by email: ${error.message}`);
        }
    }

    static async create({ pseudo, email, password, role = 'user' }) {
        try {
            const [result] = await pool.query(
                "INSERT INTO user (pseudo, email, password, role) VALUES (?, ?, ?, ?)",
                [pseudo, email, password, role]
            );
            return { id: result.insertId, pseudo, email, role };
        } catch (error) {
            throw new Error(`Error creating user: ${error.message}`);
        }
    }

    static async update({ pseudo, email, role, status }, id) {
        try {
            await pool.query(
                "UPDATE user SET pseudo = ?, email = ?, role = ?, status = ? WHERE id = ?",
                [pseudo, email, role, status, id]
            );
            return { id, pseudo, email, role, status };
        } catch (error) {
            throw new Error(`Error updating user: ${error.message}`);
        }
    }

    static async updatePassword(password, id) {
        try {
            await pool.query("UPDATE user SET password = ? WHERE id = ?", [password, id]);
            return { id };
        } catch (error) {
            throw new Error(`Error updating user password: ${error.message}`);
        }
    }

    static async remove(id) {
        try {
            await pool.query("DELETE FROM user WHERE id = ?", [id]);
            return { id };
        } catch (error) {
            throw new Error(`Error deleting user: ${error.message}`);
        }
    }
}

export default User;