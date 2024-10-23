// src/controllers/categoryController.js
import Category from "../models/Category.js";

// Récupérer toutes les catégories
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Récupérer une catégorie par son ID
const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: "Catégorie non trouvée" });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Récupérer des catégories par nom
const getCategoryByName = async (req, res) => {
    try {
        const categories = await Category.findByName(req.params.name);
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Créer une nouvelle catégorie
const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const newCategory = await Category.create({ name });
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mettre à jour une catégorie
const updateCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const updatedCategory = await Category.update({ name }, req.params.id);
        if (!updatedCategory) {
            return res.status(404).json({ message: "Catégorie non trouvée" });
        }
        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Supprimer une catégorie
const deleteCategory = async (req, res) => {
    try {
        const result = await Category.remove(req.params.id);
        if (!result) {
            return res.status(404).json({ message: "Catégorie non trouvée" });
        }
        res.status(200).json({ message: "Catégorie supprimée avec succès" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { 
    getAllCategories, 
    getCategoryById, 
    getCategoryByName, 
    createCategory, 
    updateCategory, 
    deleteCategory 
};