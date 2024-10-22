const express = require("express");
const router = express.Router();
const db = require("../config/db"); 

// Route pour récupérer les commentaires d'un article spécifique
router.get("/:articleId", async (req, res) => {
  const { articleId } = req.params;
  try {
    const [comments] = await db.query(
      "SELECT * FROM comments WHERE article_id = ?",
      [articleId]
    );
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des commentaires" });
  }
});

module.exports = router;

