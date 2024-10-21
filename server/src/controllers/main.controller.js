import express from 'express';
import {
    getAllUndercategories,
    getUndercategoryById,
    getArticlesByUndercategoryId,
    getUndercategoryByName,
    getArticlesByUndercategoryName, // Assurez-vous d'importer la nouvelle fonction
} from '../controllers/undercategory.controller.js';

const router = express.Router();

// Route pour récupérer toutes les sous-catégories
router.get('/', getAllUndercategories);

// Route pour récupérer une sous-catégorie par ID
router.get('/:id', getUndercategoryById);

// Route pour récupérer les articles associés à une sous-catégorie par ID
router.get('/:id/articles', getArticlesByUndercategoryId);

// Route pour récupérer une sous-catégorie par nom
router.get('/name/:name', getUndercategoryByName);

// **Modification de cette route pour retirer 'name' dans l'URL**
router.get('/articles/:name', getArticlesByUndercategoryName); // Nouvelle route sans 'name'

export default router;
