import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Loader } from 'lucide-react';
import { axiosInstance } from '../configs/axios';

const ArticlePage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(true);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axiosInstance.get(`/articles/${id}`);
        setArticle(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch article. Please try again later.');
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  const handleGetSummary = async () => {
    setSummaryLoading(true);
    try {
      const response = await axiosInstance.get(`/articles/${id}/summary`);
      setSummary(response.data.summary);
    } catch (err) {
      console.error('Error fetching summary:', err);
    } finally {
      setSummaryLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center min-h-screen items-center h-64">
        <div className="text-center">
          <Loader className="size-12 animate-spin text-primary mx-auto" />
          <p className="mt-4 text-base-content/60">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="bg-error/10 border min-h-screen border-error text-error px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error || 'Article not found'}</span>
        <div className="mt-4">
          <Link to="/" className="text-primary hover:underline">Return to Home</Link>
        </div>
      </div>
    );
  }

  // Format date to be more readable
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="max-w-3xl mx-auto min-h-screen mt-16 px-4">
      <Link to="/" className="text-primary hover:underline mb-6 mt-3 inline-block">
        &larr; Back to all articles
      </Link>
      
      <article className="bg-base-100 rounded-lg shadow-md overflow-hidden p-6">
        <header className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <span className="badge badge-primary">
              {article.category}
            </span>
            <span className="text-sm text-base-content/60">{formatDate(article.published_date)}</span>
          </div>
          <h1 className="text-3xl font-bold text-base-content">{article.title}</h1>
          <p className="text-base-content/60 mt-2">By {article.author}</p>
        </header>
        
        <div className="prose max-w-none">
          {article.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="mb-4 text-base-content/90">{paragraph}</p>
          ))}
        </div>
        
        <div className="mt-8 pt-6 border-t border-base-300">
          <h2 className="text-xl font-bold text-base-content mb-4">AI-Generated Summary</h2>
          {summary ? (
            <div className="bg-base-200 p-4 rounded-lg border border-base-300">
              <p className="text-base-content/80">{summary}</p>
            </div>
          ) : (
            <button
              onClick={handleGetSummary}
              className="btn btn-primary"
              disabled={summaryLoading}
            >
              {summaryLoading ? (
                <>
                  <Loader className="size-4 animate-spin mr-2" />
                  Generating Summary...
                </>
              ) : 'Generate AI Summary'}
            </button>
          )}
        </div>
      </article>
    </div>
  );
};

export default ArticlePage;