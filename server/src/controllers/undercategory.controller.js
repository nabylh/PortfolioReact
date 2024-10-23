// src/controllers/undercategoryController.js
import Undercategory from "../models/Undercategory.js";
import Article from "../models/Article.js";

// Récupérer toutes les sous-catégories
const getAllUndercategories = async (req, res) => {
    try {
        const undercategories = await Undercategory.findAll();
        res.status(200).json(undercategories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Récupérer une sous-catégorie par ID
const getUndercategoryById = async (req, res) => {
    try {
        const undercategory = await Undercategory.findById(req.params.id);
        if (!undercategory) {
            return res.status(404).json({ message: "Sous-catégorie non trouvée" });
        }
        res.status(200).json(undercategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Récupérer les articles associés à une sous-catégorie par ID
const getArticlesByUndercategoryId = async (req, res) => {
    try {
        const articles = await Article.findByUndercategoryId(req.params.id);
        if (articles.length === 0) {
            return res.status(404).json({ message: "Aucun article trouvé pour cette sous-catégorie" });
        }
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Récupérer une sous-catégorie par nom
const getUndercategoryByName = async (req, res) => {
    try {
        const undercategory = await Undercategory.findByName(req.params.name);
        if (!undercategory) {
            return res.status(404).json({ message: "Sous-catégorie non trouvée" });
        }
        res.status(200).json(undercategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Récupérer les articles par nom de sous-catégorie
const getArticlesByUndercategoryName = async (req, res) => {
    try {
        const undercategory = await Undercategory.findByName(req.params.name);
        if (!undercategory) {
            return res.status(404).json({ message: "Sous-catégorie non trouvée" });
        }
        const articles = await Article.findByUndercategoryId(undercategory.id);
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { 
    getAllUndercategories, 
    getUndercategoryById, 
    getArticlesByUndercategoryId, 
    getUndercategoryByName, 
    getArticlesByUndercategoryName 
};