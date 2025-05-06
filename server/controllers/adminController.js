const fs = require('fs');
const path = require('path');
const { constrainedMemory } = require('process');

const articlesFilePath = path.join(__dirname, '../data/articles.json');

const getArticlesData = () => {
  try {
    const data = fs.readFileSync(articlesFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading articles data:', error);
    return [];
  }
};

const writeArticlesData = (data) => {
  try {
    fs.writeFileSync(articlesFilePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing articles data:', error);
    return false;
  }
};

exports.getAdminArticles = (req, res) => {
  console.log('Fetching all articles for admin...');
  try {
    const articles = getArticlesData();
    const articlesList = articles.map(({ id, title, author, published_date, category, content }) => ({
      id,
      title,
      author,
      content,
      published_date,
      category
    }));
    res.json(articlesList);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
exports.createArticle = (req, res) => {
  try {
    const articles = getArticlesData();
    const newArticle = req.body;
    
    if (!newArticle.title || !newArticle.content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }
    
    const newId = articles.length > 0 ? Math.max(...articles.map(a => a.id)) + 1 : 1;
    
    const articleToAdd = {
      id: newId,
      title: newArticle.title,
      content: newArticle.content,
      author: newArticle.author || 'Unknown',
      published_date: newArticle.published_date || new Date().toISOString().split('T')[0],
      category: newArticle.category || 'Uncategorized',
      source_url: newArticle.source_url || `https://example.com/news/article-${newId}`
    };
    
    articles.push(articleToAdd);
    
    if (writeArticlesData(articles)) {
      res.status(201).json(articleToAdd);
    } else {
      res.status(500).json({ message: 'Error saving article' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


exports.updateArticle = (req, res) => {
  console.log("Hey");
  try {
    const articles = getArticlesData();
    const id = parseInt(req.params.id);
    const updates = req.body;
    
    const articleIndex = articles.findIndex(a => a.id === id);
    
    if (articleIndex === -1) {
      return res.status(404).json({ message: 'Article not found' });
    }
    
    const updatedArticle = {
      ...articles[articleIndex],
      ...updates,
      id  
    };
    
    articles[articleIndex] = updatedArticle;
    
    if (writeArticlesData(articles)) {
      res.json(updatedArticle);
    } else {
      res.status(500).json({ message: 'Error updating article' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deleteArticle = (req, res) => {
  try {
    const articles = getArticlesData();
    const id = parseInt(req.params.id);
    
    const articleIndex = articles.findIndex(a => a.id === id);
    
    if (articleIndex === -1) {
      return res.status(404).json({ message: 'Article not found' });
    }
    
    const deletedArticle = articles[articleIndex];
    articles.splice(articleIndex, 1);
    
    if (writeArticlesData(articles)) {
      res.json({ message: 'Article deleted successfully', article: deletedArticle });
    } else {
      res.status(500).json({ message: 'Error deleting article' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};