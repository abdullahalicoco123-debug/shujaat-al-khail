import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminProducts from "./AdminProducts";
import AdminCategories from "./AdminCategories";
import "./AdminDashboard.css";
import AdminOrders from "./AdminOrders";
import AdminGallery from "./AdminGallery";

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("products");

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <h2>Shuja'at Al-Khail</h2>
          <span>Admin Panel</span>
        </div>

        <nav className="admin-nav">
          <button
            className={`admin-nav-item ${activeTab === "products" ? "active" : ""}`}
            onClick={() => setActiveTab("products")}
          >
            Products
          </button>
          <button
            className={`admin-nav-item ${activeTab === "categories" ? "active" : ""}`}
            onClick={() => setActiveTab("categories")}
          >
            Categories
          </button>
          <button
            className={`admin-nav-item ${activeTab === "orders" ? "active" : ""}`}
            onClick={() => setActiveTab("orders")}
          >
            Orders
          </button>
         <button
            className={`admin-nav-item ${activeTab === "gallery" ? "active" : ""}`}
            onClick={() => setActiveTab("gallery")}
          >
            Gallery
          </button>
        </nav>

        <button className="admin-logout" onClick={handleLogout}>
          Logout
        </button>
      </aside>

      <main className="admin-content">
        {activeTab === "products" && <AdminProducts />}
        {activeTab === "categories" && <AdminCategories />}
        {activeTab === "orders" && <AdminOrders />}
        {activeTab === "gallery" && <AdminGallery />}
      </main>
    </div>
  );
}

export default AdminDashboard;