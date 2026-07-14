import { FiArrowRight } from "react-icons/fi";
import catOffice from "../../assets/images/categories/cat-office-furniture.jpg";
import catDining from "../../assets/images/categories/cat-dining-table.jpg";
import catChairs from "../../assets/images/categories/cat-chairs.jpg";
import catHome from "../../assets/images/categories/cat-home-furniture.jpg";
import catSchool from "../../assets/images/categories/cat-school-furniture.jpg";
import catLockers from "../../assets/images/categories/cat-lockers.jpg";
import "./Categories.css";

const categories = [
  { name: "Office Furniture", image: catOffice, link: "#" },
  { name: "Dining Table", image: catDining, link: "#" },
  { name: "Chairs", image: catChairs, link: "#" },
  { name: "Home Furniture", image: catHome, link: "#" },
  { name: "School Furniture", image: catSchool, link: "#" },
  { name: "Lockers", image: catLockers, link: "#" },
];

const Categories = () => {
  return (
    <section className="categories">
      <div className="container categories-container">
        <div className="section-header">
          <h2 className="section-title">Shop by Category</h2>
          <span className="section-divider"></span>
        </div>

        <div className="categories-grid">
          {categories.map((category, index) => (
            <a key={index} href={category.link} className="category-card">
              <div className="category-image-wrap">
                <img
                  src={category.image}
                  alt={category.name}
                  className="category-image"
                />
              </div>
              <div className="category-info">
                <h3 className="category-name">{category.name}</h3>
                <span className="category-link">
                  View Collection
                  <FiArrowRight className="category-link-icon" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;