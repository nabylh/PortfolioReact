import express from 'express';
import { getAllCategoriesWithArticles, getCategoryByIdWithArticles,getCategoryByName} 
from '../controllers/category.controller.js';

const router = express.Router();

//  catégories avec leurs articles associés
router.get('/', getAllCategoriesWithArticles); 
// Récupérer catégorie par ID avec ses articles 
router.get('/:id', getCategoryByIdWithArticles); 
// Récupérer une catégorie par nom avec les articles associés
router.get('/name/:name', getCategoryByName); 

export default router;

