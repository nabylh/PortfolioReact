import express from 'express';
import { getAllArticles, getArticleById, getArticlesByName, getArticlesBySubcategory, createArticle, updateArticle, deleteArticle, getArticlesByUndercategory } from '../controllers/article.controller.js'; 
import withAdminAuth from '../middlewares/withAdminAuth.js'; 

const router = express.Router();

// Routes publiques (PAS de middleware)
router.get('/', getAllArticles); 
router.get('/:id', getArticleById); 
router.get('/name/:name', getArticlesByName);
router.get('/undercategory/:id', getArticlesBySubcategory); 
router.get('/undercategory/:undercategoryName/articles', getArticlesByUndercategory);
router.get('/category/:id', (req, res) => {
  
res.status(200).json({ message: 'Récupération des articles par catégorie ' });
});


// Routes protégées (withAdminAuth) ajout suppression et modification d'articles
router.post('/', withAdminAuth, createArticle); 
router.put('/:id', withAdminAuth, updateArticle); 
router.delete('/:id', withAdminAuth, deleteArticle); 
export default router;
