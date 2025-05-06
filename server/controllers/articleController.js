const fs = require("fs");
const path = require("path");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const articlesFilePath = path.join(__dirname, "../data/articles.json");

const getArticlesData = () => {
  try {
    const data = fs.readFileSync(articlesFilePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading articles data:", error);
    return [];
  }
};
const writeArticlesData = (data) => {
  try {
    fs.writeFileSync(articlesFilePath, JSON.stringify(data, null, 2), "utf8");
    return true;
  } catch (error) {
    console.error("Error writing articles data:", error);
    return false;
  }
};

exports.getArticles = (req, res) => {
  try {
    const articles = getArticlesData();
    const articlesList = articles.map(
      ({ id, title, author, published_date, category }) => ({
        id,
        title,
        author,
        published_date,
        category,
      })
    );
    res.json(articlesList);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
exports.getArticleById = (req, res) => {
  try {
    const articles = getArticlesData();
    const article = articles.find((a) => a.id === parseInt(req.params.id));

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
    const articles = getArticlesData();
    const article = articles.find((a) => a.id === parseInt(req.params.id));

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    // console.log(result.response.text());

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
        id: article.id,
        title: article.title,
        summary: summary.trim(),
      });
    } catch (apiError) {
      console.error("Gemini API error:", apiError);

      res.json({
        id: article.id,
        title: article.title,
        summary:
          "This is a simulated AI summary as the Gemini API request failed. The summary would normally contain key points from the article.",
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
