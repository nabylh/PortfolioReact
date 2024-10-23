import "dotenv/config"; 
import express from "express"; 
import path from "path"; 
import cors from "cors"; 
import session from "express-session"; 

import { createRequire } from "module"; 
const require = createRequire(import.meta.url);
const MySQLStore = require("express-mysql-session")(session); 

import router from "./routes/index.routes.js"; 


const app = express(); 

const PORT = process.env.PORT || 3000; 

// Configuration de CORS
app.use(
    cors({
        origin: "http://localhost:5173", 
        credentials: true, 
        methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"], 
        allowedHeaders: ["Content-Type"], 
    })
);

// Configuration des sessions
app.use(
    session({
        secret: process.env.SECRET_KEY_SESSION,  // Clé secrète pour la session
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24, // Durée de vie de la session : 24 heures
            httpOnly: true,
            secure: false, // Changez à true en production avec HTTPS
        },
        store: new MySQLStore({
            host: process.env.DB_HOST, // Hôte de la base de données
            port: process.env.DB_PORT, // Port de la base de données
            user: process.env.DB_USER, // Utilisateur de la base de données
            password: process.env.DB_PASS, // Mot de passe de la base de données
            database: process.env.DB_NAME, // Nom de la base de données
        }),
    })
);

// Middleware pour servir des fichiers statiques
app.use("/img", express.static(path.join(process.cwd(), "public/img"))); // Servir les images

app.use(express.json()); // Middleware pour parser le JSON
app.use(express.urlencoded({ extended: false })); // Middleware pour parser les données URL-encodées

// Middleware pour les requêtes entrantes (pour débogage, à supprimer en production)
// app.use(async (req, res, next) => {
//     console.log("user session", req.session.user);
//     try {
//         const [[result]] = await pool.query("SELECT COUNT(session_id) AS session FROM sessions");
//         console.log("Active sessions:", result.session);
//         console.log("User session:", req.session.user ? req.session : "No user session");
//         next();
//     } catch (err) {
//         console.error("Error fetching sessions:", err.message);
//         next(); // Continuer même en cas d'erreur
//     }
// });

// Utilisation des routes définies dans index.routes.js
app.use('/', router); 

// Démarrage du serveur
app.listen(PORT, () =>
    console.log(`Server is running at http://localhost:${PORT}`)
);

