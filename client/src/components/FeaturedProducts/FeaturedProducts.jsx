import { FiShoppingCart, FiHeart } from "react-icons/fi";
import deskImg from "../../assets/images/products/product-executive-desk.jpg";
import safeImg from "../../assets/images/products/product-fire-safe.jpg";
import chairImg from "../../assets/images/products/product-office-chair.jpg";
import bedImg from "../../assets/images/products/product-bed.jpg";
import schoolImg from "../../assets/images/products/product-school-desk.jpg";
import "./FeaturedProducts.css";

const products = [
  {
    name: "Executive Office Desk",
    category: "Office Furniture",
    price: 3499,
    oldPrice: null,
    badge: "NEW",
    image: deskImg,
  },
  {
    name: "Fire-Resistant Safe",
    category: "Lockers",
    price: 1099,
    oldPrice: 1299,
    badge: "SALE",
    image: safeImg,
  },
  {
    name: "Ergonomic Mesh Chair",
    category: "Chairs",
    price: 899,
    oldPrice: null,
    badge: "NEW",
    image: chairImg,
  },
  {
    name: "Upholstered King Bed",
    category: "Home Furniture",
    price: 2799,
    oldPrice: null,
    badge: null,
    image: bedImg,
  },
  {
    name: "Student Desk & Chair Set",
    category: "School Furniture",
    price: 649,
    oldPrice: null,
    badge: "NEW",
    image: schoolImg,
  },
];

const formatPrice = (value) =>
  `SAR ${value.toLocaleString("en-US")}`;

const FeaturedProducts = () => {
  return (
    <section className="featured">
      <div className="container featured-container">
        <div className="section-header">
          <h2 className="section-title">Featured Products</h2>
          <span className="section-divider"></span>
        </div>

        <div className="featured-grid">
          {products.map((product, index) => (
            <div className="product-card" key={index}>
              <div className="product-image-wrap">
                {product.badge && (
                  <span
                    className={`product-badge ${
                      product.badge === "SALE"
                        ? "product-badge-sale"
                        : "product-badge-new"
                    }`}
                  >
                    {product.badge}
                  </span>
                )}

                <button className="product-wishlist" aria-label="Add to wishlist">
                  <FiHeart />
                </button>

                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                />
              </div>

              <div className="product-info">
                <span className="product-category">{product.category}</span>
                <h3 className="product-name">{product.name}</h3>

                <div className="product-price">
                  <span className="product-price-current">
                    {formatPrice(product.price)}
                  </span>
                  {product.oldPrice && (
                    <span className="product-price-old">
                      {formatPrice(product.oldPrice)}
                    </span>
                  )}
                </div>

                <button className="product-cart-btn">
                  <FiShoppingCart className="product-cart-icon" />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;