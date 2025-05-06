const Article = require("../models/article");

exports.getAdminArticles = async (req, res) => {
  console.log("Fetching all articles for admin...");
  try {
    const articles = await Article.find({});
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.createArticle = async (req, res) => {
  console.log("Creating a new article...");
  try {
    const newArticle = req.body;

    if (!newArticle.title || !newArticle.content) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }

    const article = new Article({
      title: newArticle.title,
      content: newArticle.content,
      author: newArticle.author || "Unknown",
      published_date: newArticle.published_date || new Date(),
      category: newArticle.category || "Uncategorized",
      source_url: newArticle.source_url,
    });

    const savedArticle = await article.save();
    res.status(201).json(savedArticle);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.updateArticle = async (req, res) => {
  console.log("Updating article with ID:", req.params.id);
  try {
    const formData = req.body;
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    Object.keys(formData).forEach((key) => {
      article[key] = formData[key];
    });

    const updatedArticle = await article.save();
    console.log("Updated article:", updatedArticle);
    res.json(updatedArticle);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.deleteArticle = async (req, res) => {
  console.log("Deleting article with ID:", req.params.id);
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    await article.deleteOne();
    res.json({ message: "Article deleted successfully", article });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
