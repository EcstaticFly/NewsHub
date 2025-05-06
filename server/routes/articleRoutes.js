const express = require('express');
const router = express.Router();
const { 
  getArticles, 
  getArticleById, 
  getArticleSummary 
} = require('../controllers/articleController');

// Get all articles
router.get('/', getArticles);

// Get article by ID
router.get('/:id', getArticleById);

// Get article summary
router.get('/:id/summary', getArticleSummary);

module.exports = router;