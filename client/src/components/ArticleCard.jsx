import React from "react";
import { Calendar, User, Bookmark, ChevronRight } from "lucide-react";

const ArticleCard = ({ article }) => {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getExcerpt = (content, maxLength = 150) => {
    if (!content) return "";
    if (content.length <= maxLength) return content;
    return content.substr(0, content.lastIndexOf(" ", maxLength)) + "...";
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:translate-y-[-4px] hover:shadow-lg">
      <div className="p-6">
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <Calendar className="h-4 w-4 mr-1" />
          <span>{formatDate(article.published_date)}</span>
          <span className="mx-2">•</span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {article.category}
          </span>
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
          {article.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3">
          {getExcerpt(article.content)}
        </p>
        <div className="flex justify-between items-center">
          <div className="flex items-center text-sm">
            <User className="h-4 w-4 mr-1 text-gray-500" />
            <span className="text-gray-600">{article.author}</span>
          </div>
          <div className="flex space-x-2">
            <button className="p-1 rounded-full hover:bg-gray-100">
              <Bookmark className="h-5 w-5 text-gray-400 hover:text-blue-500" />
            </button>
            <a
              href={`/article/${article._id}`}
              className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Read
              <ChevronRight className="ml-1 h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
