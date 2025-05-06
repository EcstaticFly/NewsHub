const { GoogleGenerativeAI } = require("@google/generative-ai");
const Article = require("../models/article");

exports.getArticles = async (req, res) => {
  try {
    const articles = await Article.find({}, 'title author published_date category');
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.json(article);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getArticleSummary = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
      Please provide a concise summary of the following article. 
      Focus on the key points and main ideas. Keep it under 100 words.
      
      Article Title: ${article.title}
      
      Article Content: ${article.content}
    `;

    try {
      const result = await model.generateContent(prompt);
      const summary = result.response.text();

      res.json({
        id: article._id,
        title: article.title,
        summary: summary.trim(),
      });
    } catch (apiError) {
      console.error("Gemini API error:", apiError);

      res.json({
        id: article._id,
        title: article.title,
        summary:
          "This is a simulated AI summary as the Gemini API request failed. The summary would normally contain key points from the article.",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
