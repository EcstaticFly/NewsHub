import { themeStore } from "./store/themeStore";
import HomePage from "./pages/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ArticlePage from "./pages/ArticlePage"
import AdminPage from "./pages/AdminPage"
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const { theme } = themeStore();

  return (
    <div data-theme={theme} className="w-full font-serif bg-base-200">
      <Navbar />
      <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/article/:id" element={< ArticlePage/>} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
    </div>
  );
}

export default App;
