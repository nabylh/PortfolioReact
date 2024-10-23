// src/routes/category.routes.js

import express from 'express';
import { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory,getCategoryByName } from '../controllers/category.controller.js';
import withAdminAuth from '../middlewares/withAdminAuth.js';

const router = express.Router();

// Routes publiques (PAS de middleware)
router.get('/', getAllCategories); // Récupérer toutes les catégories
router.get('/:id', getCategoryById); // Récupérer une catégorie par ID
router.get('/name/:name', getCategoryByName); // Récupérer une catégorie par le nom

// Routes protégées (avec withAdminAuth) pour la création, la modification et la suppression des catégories
router.post('/', withAdminAuth, createCategory); // Créer une nouvelle catégorie
router.put('/:id', withAdminAuth, updateCategory); // Mettre à jour une catégorie existante
router.delete('/:id', withAdminAuth, deleteCategory); // Supprimer une catégorie

export default router;
