const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    default: 'Unknown'
  },
  published_date: {
    type: Date || String,
    default: Date.now
  },
  category: {
    type: String,
    default: 'Uncategorized'
  },
  source_url: {
    type: String,
    default: function() {
      return `https://example.com/news/article-${this._id}`;
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Article', articleSchema);
