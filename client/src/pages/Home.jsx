import React, { useState, useEffect, useRef } from "react";
import {
  Loader,
  Bookmark,
  Calendar,
  User,
  ChevronRight,
  ArrowUpRight,
  ChevronLeft,
} from "lucide-react";
import Footer from "../components/Footer";
import { axiosInstance } from "../configs/axios";

const HomePage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [featuredArticles, setFeaturedArticles] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axiosInstance.get("/articles");
        const data  = response.data;
        console.log(data);
        const fetched = Array.isArray(data) ? data : data.articles;
        const articleData = fetched ?? [];

        if (articleData.length > 0) {
          const sorted = [...articleData].sort(
            (a, b) => new Date(b.published_date) - new Date(a.published_date)
          );
          setFeaturedArticles(sorted.slice(0, 3));
          setArticles(articleData);
        }

        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch articles. Please try again later.");
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      if (featuredArticles.length > 0) {
        setCurrentSlide((prev) => (prev + 1) % featuredArticles.length);
      }
    }, 4000); 

    return () => clearInterval(interval);
  }, [featuredArticles.length]);

  useEffect(() => {
    if (carouselRef.current && featuredArticles.length > 0) {
      const isLastSlide = currentSlide === featuredArticles.length - 1;

      carouselRef.current.scrollTo({
        left: carouselRef.current.offsetWidth * currentSlide,
        behavior: "smooth",
      });

      if (isLastSlide) {
        const timer = setTimeout(() => {
          setCurrentSlide(0);
        }, 500);

        return () => clearTimeout(timer);
      }
    }
  }, [currentSlide, featuredArticles.length]);

  const categories = [
    "All",
    ...new Set(articles.map((article) => article.category)),
  ];

  const filteredArticles = articles.filter((article) => {
    return activeCategory === "All" || article.category === activeCategory;
  });

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getExcerpt = (content, maxLength = 150) => {
    if (!content) return "";
    if (content.length <= maxLength) return content;
    return content.substr(0, content.lastIndexOf(" ", maxLength)) + "...";
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredArticles.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? featuredArticles.length - 1 : prev - 1
    );
  };

  const handleArticleClick = (id) => {
    console.log(`Navigating to article/${id}`);
    window.location.href = `/article/${id}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-200">
        <div className="text-center">
          <Loader className="size-12 animate-spin text-primary mx-auto" />
          <p className="mt-4 text-base-content/60">
            Loading the latest news...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="bg-error/10 border-l-4 border-error p-4 rounded shadow-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-error"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-error">Error</h3>
              <div className="mt-2 text-sm text-error/80">
                <p>{error}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-base-200 mt-16 min-h-screen">
      {featuredArticles.length > 0 && (
        <div className="relative w-full bg-gradient-to-r from-primary/10 to-secondary/10 mb-6">
          <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10">
            <button
              onClick={prevSlide}
              className="btn btn-circle btn-sm btn-primary shadow-md"
              aria-label="Previous slide"
            >
              <ChevronLeft className="size-5" />
            </button>
          </div>

          <div
            ref={carouselRef}
            className="flex overflow-hidden snap-x snap-mandatory scroll-smooth"
          >
            {featuredArticles.map((article, index) => (
              <div key={article.id} className="min-w-full snap-center">
                <div className="container mx-auto px-4 py-8 md:py-12">
                  <div className="flex flex-col md:flex-row items-center bg-base-100 rounded-xl shadow-lg overflow-hidden">
                    <div className="w-full md:w-1/2 h-48 md:h-72 bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                      <ArrowUpRight className="h-16 w-16 text-base-100" />
                    </div>
                    <div className="w-full md:w-1/2 p-5 md:p-8">
                      <div className="flex flex-wrap items-center text-sm text-base-content/60 mb-2">
                        <Calendar className="size-4 mr-1" />
                        <span>{formatDate(article.published_date)}</span>
                        <span className="mx-2">•</span>
                        <User className="size-4 mr-1" />
                        <span>{article.author}</span>
                        <span className="mx-2">•</span>
                        <span className="badge badge-primary mt-1">
                          {article.category}
                        </span>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-base-content mb-3">
                        {article.title}
                      </h2>
                      <p className="text-base-content/80 text-base mb-5">
                        {getExcerpt(article.content, 150)}
                      </p>
                      <button
                        onClick={() => handleArticleClick(article._id)}
                        className="btn btn-primary"
                      >
                        Read Full Article
                        <ChevronRight className="ml-1 size-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10">
            <button
              onClick={nextSlide}
              className="btn btn-circle btn-sm btn-primary shadow-md"
              aria-label="Next slide"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>

          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {featuredArticles.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 w-2 rounded-full ${
                  currentSlide === index ? "bg-primary" : "bg-base-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}

      <main className="container mx-auto px-4 sm:px-6 py-6">
      
        <div className="mb-8 z-10 bg-base-100 rounded-lg shadow-sm p-4">
          <h3 className="text-base font-medium mb-3 text-base-content/80">
            Filter by Category
          </h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`btn text-[1rem] btn-sm ${
                  activeCategory === category
                    ? "btn-primary"
                    : "btn-ghost border border-base-300"
                } transition-all`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              className="card bg-base-100 shadow-md hover:shadow-lg transition-all"
            >
              <div className="card-body">
                <div className="flex items-center text-sm text-base-content/60 mb-3">
                  <Calendar className="size-4 mr-1" />
                  <span>{formatDate(article.published_date)}</span>
                  <span className="mx-2">•</span>
                  <span className="badge badge-primary">
                    {article.category}
                  </span>
                </div>
                <h3 className="card-title text-lg text-base-content line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-base-content/70 mb-4 line-clamp-3">
                  {getExcerpt(article.content)}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-sm">
                    <User className="size-4 mr-1 text-base-content/60" />
                    <span className="text-base-content/60">
                      {article.author}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button className="btn btn-ghost btn-sm btn-circle">
                      <Bookmark className="size-5 text-base-content/40 hover:text-primary" />
                    </button>
                    <button
                      onClick={() => handleArticleClick(article._id)}
                      className="btn btn-primary btn-sm"
                    >
                      Read
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {filteredArticles.length === 0 && (
          <div className="text-center py-12 bg-base-100 rounded-lg shadow-sm">
            <div className="avatar placeholder">
              <div className="bg-base-200 text-base-content/40 rounded-full w-16">
                <span className="text-2xl">?</span>
              </div>
            </div>
            <h3 className="mt-2 text-lg font-medium text-base-content">
              No articles found
            </h3>
            <p className="mt-1 text-sm text-base-content/60">
              Try selecting a different category to find what you're looking
              for.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
