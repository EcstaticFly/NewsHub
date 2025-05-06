import React, { useState, useEffect } from "react";
import axios from "axios";
import { PenLine, Trash2, Plus, X, Loader, FileText } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { axiosInstance } from "../configs/axios";

const AdminPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    category: "",
    source_url: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await axiosInstance.get("/admin/articles/all");
      setArticles(response.data);
      setLoading(false);
    } catch (err) {
      // setError("Failed to fetch articles. Please try again later.");
      toast.error("Failed to fetch articles. Please try again later.");
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await axiosInstance.put(`/admin/articles/${editingId}`, formData);
        toast.success("Article updated successfully!");
      } else {
        await axiosInstance.post("/admin/articles", formData);
        toast.success("Article created successfully!");
      }

      setFormData({
        title: "",
        content: "",
        author: "",
        category: "",
        source_url: "",
      });
      setEditingId(null);
      fetchArticles();
    } catch (err) {
      toast.error("Failed to save article. Please try again.");
      // setError("Failed to save article. Please try again.");
      console.error(err);
    }
  };

  const handleEdit = (article) => {
    setFormData({
      title: article.title,
      content: article.content,
      author: article.author,
      category: article.category,
      source_url: article.source_url,
    });
    setEditingId(article._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      try {
        await axiosInstance.delete(`/admin/articles/${id}`);
        fetchArticles();
        toast.success("Article deleted successfully!");
      } catch (err) {
        toast.error("Failed to delete article. Please try again.");
        // setError("Failed to delete article. Please try again.");
        console.error(err);
      }
    }
  };

  const handleCancel = () => {
    setFormData({ title: "", content: "", author: "", category: "", url: "" });
    setEditingId(null);
    // setError(null);
  };

  return (
    <div className="min-h-screen mt-16 bg-base-100 p-6">
      <div className="container mx-auto max-w-4xl">
        <div className="flex flex-col items-center gap-2 group mb-8">
          <div className="size-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20">
            <FileText className="size-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold mt-2">Article Management</h1>
          <p className="text-base-content/60">
            Create and manage your articles
          </p>
        </div>

        {/* {error && (
          <div className="alert alert-error mb-6 shadow-lg">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{error}</span>
            </div>
          </div>
        )} */}

        <div className="card bg-base-200 shadow-xl mb-8">
          <div className="card-body">
            <h2 className="card-title text-lg font-semibold flex items-center gap-2">
              {editingId ? (
                <>
                  <PenLine className="size-5" />
                  Edit Article
                </>
              ) : (
                <>
                  <Plus className="size-5" />
                  Create New Article
                </>
              )}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  className="textarea textarea-bordered w-full"
                  rows="6"
                  required
                ></textarea>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Source Url</span>
                </label>
                <input
                  type="text"
                  name="source_url"
                  value={formData.source_url}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Author</span>
                  </label>
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    className="input input-bordered w-full"
                    required
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Category</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="select select-bordered w-full"
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="Governance">Governance</option>
                    <option value="Regulation">Regulation</option>
                    <option value="Legal Reform">Legal Reform</option>
                    <option value="Tech Law">Tech Law</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                    <option value="AI Policy">AI Policy</option>
                    <option value="Data Privacy">Data Privacy</option>
                  </select>
                </div>
              </div>

              <div className="card-actions justify-end mt-6">
                {editingId && (
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="btn btn-ghost gap-2"
                  >
                    <X className="size-4" />
                    Cancel
                  </button>
                )}
                <button type="submit" className="btn btn-primary gap-2">
                  {editingId ? (
                    <>
                      <PenLine className="size-4" />
                      Update Article
                    </>
                  ) : (
                    <>
                      <Plus className="size-4" />
                      Create Article
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="divider"></div>

        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <FileText className="size-5 text-primary" />
          Article List
        </h2>

        {loading ? (
          <div className="flex justify-center items-center p-12">
            <Loader className="size-8 text-primary animate-spin" />
            <span className="ml-3 text-base-content/60">
              Loading articles...
            </span>
          </div>
        ) : articles.length === 0 ? (
          <div className="alert alert-info shadow-lg">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-current flex-shrink-0 w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>No articles found. Create your first article above.</span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {articles.map((article) => (
              <div
                key={article.id}
                className="card bg-base-200 shadow-xl hover:shadow-2xl transition-shadow"
              >
                <div className="card-body">
                  <h3 className="card-title text-lg">{article.title}</h3>
                  <div className="flex items-center gap-2 text-base-content/60 text-sm">
                    <span className="badge badge-primary">
                      {article.category}
                    </span>
                    <span>By {article.author}</span>
                  </div>
                  <p className="mt-2 text-base-content/80">
                    {article.content && article.content.length > 0
                      ? `${article.content.substring(0, 150)}${
                          article.content.length > 150 ? "..." : ""
                        }`
                      : "No content available."}
                  </p>

                  <div className="card-actions justify-end mt-4">
                    <button
                      onClick={() => handleEdit(article)}
                      className="btn btn-secondary btn-sm gap-2"
                    >
                      <PenLine className="size-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(article._id)}
                      className="btn btn-error btn-sm gap-2"
                    >
                      <Trash2 className="size-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
