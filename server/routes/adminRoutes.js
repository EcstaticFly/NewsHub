const express = require('express');
const router = express.Router();
const { 
  createArticle, 
  updateArticle, 
  deleteArticle,
  getAdminArticles,
} = require('../controllers/adminController');

router.get('/articles/all', getAdminArticles);

router.post('/articles', createArticle);

router.put('/articles/:id', updateArticle);

router.delete('/articles/:id', deleteArticle);

module.exports = router;