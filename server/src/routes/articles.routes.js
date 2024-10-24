// import express from 'express';
// import { 
//     getAllArticles, 
//     getArticlesByName, 
//     createArticle, 
//     updateArticle, 
//     deleteArticle, 
//     getArticlesByUndercategoryName,
//     getArticlesByCategoryName,
// } from '../controllers/article.controller.js'; 
// import withAdminAuth from '../middlewares/withAdminAuth.js'; 

// const router = express.Router();

// // Routes publiques
// router.get('/article', getAllArticles);

// router.get('/:name', getArticlesByName);
// router.get('/:name', getArticlesByUndercategoryName);
// router.get('/category/:name', getArticlesByCategoryName);

// // Routes protégées
// router.post('/', withAdminAuth, createArticle);
// router.put('/:id', withAdminAuth, updateArticle);
// router.delete('/:id', withAdminAuth, deleteArticle);

// export default router;


// src/routes/article.routes.js

import express from 'express';
import { 
    getAllArticles,
    getArticlesByName,
    createArticle,
    updateArticle,
    deleteArticle,
    getArticlesByUndercategoryName,
    getArticlesByCategoryName
} from '../controllers/article.controller.js';

const router = express.Router();

// Routes pour les articles
router.get('/', getAllArticles); // Récupérer tous les articles
router.get('/name/:name', getArticlesByName); // Récupérer des articles par nom
router.get('/undercategory/:name', getArticlesByUndercategoryName); // Récupérer des articles par nom de sous-catégorie
router.get('/category/:categoryName', getArticlesByCategoryName); // Récupérer des articles par nom de catégorie
router.post('/', createArticle); // Créer un nouvel article
router.put('/:id', updateArticle); // Mettre à jour un article existant
router.delete('/:id', deleteArticle); // Supprimer un article

export default router;