import express from 'express';
import { getAllArticles, getArticleById, getArticlesBySubcategory } from '../controllers/article.controller.js';




const router = express.Router();

router.get('/', getAllArticles); // Récupérer tous les articles
router.get('/:id', getArticleById); // Récupérer un article par ID
router.get('/undercategory/:id', getArticlesBySubcategory); // Récupérer les articles par sous-catégorie

export default router;
