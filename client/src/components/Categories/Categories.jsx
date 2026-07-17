import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FiArrowRight } from "react-icons/fi";
import "./Categories.css";

const Categories = () => {
  const { i18n } = useTranslation();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((error) => console.log("Error fetching categories:", error));
  }, []);

  return (
    <section className="categories">
      <div className="container categories-container">
        <div className="section-header">
          <h2 className="section-title">Shop by Category</h2>
          <span className="section-divider"></span>
        </div>

        <div className="categories-grid">
          {categories.map((category) => (
            <Link
              key={category._id}
              to={`/category/${category.slug}`}
              className="category-card"
            >
              <div className="category-image-wrap">
                <img
                  src={
                    category.image ||
                    "https://via.placeholder.com/400x300?text=Category"
                  }
                  alt={i18n.language === "ar" ? category.nameAr : category.nameEn}
                  className="category-image"
                />
              </div>
              <div className="category-info">
                <h3 className="category-name">
                  {i18n.language === "ar" ? category.nameAr : category.nameEn}
                </h3>
                <span className="category-link">
                  View Collection
                  <FiArrowRight className="category-link-icon" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;