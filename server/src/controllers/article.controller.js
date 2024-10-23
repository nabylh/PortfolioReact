// src/controllers/articleController.js
import Article from "../models/Article.js";

// Récupérer tous les articles
const getAllArticles = async (req, res) => {
    try {
        const articles = await Article.findAll();
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Récupérer un article par son ID
const getArticleById = async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) {
            return res.status(404).json({ message: "Article non trouvé" });
        }
        res.status(200).json(article);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Récupérer des articles par nom (titre)
const getArticlesByName = async (req, res) => {
    try {
        const articles = await Article.findByName(req.params.name);
        if (articles.length === 0) {
            return res.status(404).json({ message: "Aucun article trouvé avec ce nom" });
        }
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Récupérer des articles par sous-catégorie
const getArticlesBySubcategory = async (req, res) => {
    try {
        const articles = await Article.findBySubcategory(req.params.undercategory_id);
        if (articles.length === 0) {
            return res.status(404).json({ message: "Aucun article trouvé dans cette sous-catégorie" });
        }
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Récupérer des articles par nom de sous-catégorie
const getArticlesByUndercategory = async (req, res) => {
    try {
        const { undercategoryName } = req.params;
        const articles = await Article.findByUndercategoryName(undercategoryName);
        if (articles.length === 0) {
            return res.status(404).json({ message: "Aucun article trouvé dans cette sous-catégorie" });
        }
        res.status(200).json(articles);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Créer un nouvel article
const createArticle = async (req, res) => {
    try {
        const { title, content, source, undercategory_id } = req.body;
        const newArticle = await Article.create({ title, content, source, undercategory_id });
        res.status(201).json(newArticle);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Mettre à jour un article
const updateArticle = async (req, res) => {
    try {
        const { title, content, source, undercategory_id } = req.body;
        const updatedArticle = await Article.update({ title, content, source, undercategory_id }, req.params.id);
        if (!updatedArticle) {
            return res.status(404).json({ message: "Article non trouvé" });
        }
        res.status(200).json(updatedArticle);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Supprimer un article
const deleteArticle = async (req, res) => {
    try {
        const result = await Article.remove(req.params.id);
        if (!result) {
            return res.status(404).json({ message: "Article non trouvé" });
        }
        res.status(200).json({ message: "Article supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



export { 
    getAllArticles, 
    getArticleById, 
    getArticlesByName, 
    getArticlesBySubcategory, 
    createArticle, 
    updateArticle, 
    deleteArticle,
    getArticlesByUndercategory
};