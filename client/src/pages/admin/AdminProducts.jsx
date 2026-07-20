import { useState, useEffect } from "react";
import AdminProductForm from "./AdminProductForm";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = () => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id, name) => {
    const confirmed = window.confirm(`Delete "${name}"? This cannot be undone.`);
    if (!confirmed) return;

    const token = localStorage.getItem("adminToken");

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        fetchProducts();
      } else {
        const data = await res.json();
        alert(data.message || "Failed to delete");
      }
    } catch {
      alert("Could not connect to the server");
    }
  };

  const handleToggleFeatured = async (product) => {
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch(
        `/api/products/${product._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ featured: !product.featured }),
        }
      );
      if (res.ok) fetchProducts();
    } catch {
      alert("Could not update");
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleSaved = () => {
    setShowForm(false);
    setEditingProduct(null);
    fetchProducts();
  };

  const handleClose = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="admin-products">
      <div className="admin-products-header">
        <h2>Products ({products.length})</h2>
        <button className="admin-add-btn" onClick={handleAdd}>
          + Add Product
        </button>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name (EN)</th>
            <th>Category</th>
            <th>Price</th>
            <th>Badge</th>
            <th>Featured</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>
                {product.images && product.images.length > 0 ? (
                  <img
                    src={product.images[0]}
                    alt={product.nameEn}
                    className="admin-table-thumb"
                  />
                ) : (
                  "—"
                )}
              </td>
              <td>{product.nameEn}</td>
              <td>{product.category ? product.category.nameEn : "—"}</td>
              <td>{typeof product.price === "number" ? `SAR ${product.price}` : "â€”"}</td>
              <td>{product.badge || "—"}</td>
              <td>
                <button
                  className={`admin-featured-btn ${product.featured ? "on" : ""}`}
                  onClick={() => handleToggleFeatured(product)}
                >
                  {product.featured ? "★ Yes" : "☆ No"}
                </button>
              </td>
              <td>
                <div className="admin-actions">
                  <button className="admin-edit-btn" onClick={() => handleEdit(product)}>
                    Edit
                  </button>
                  <button
                    className="admin-delete-btn"
                    onClick={() => handleDelete(product._id, product.nameEn)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <AdminProductForm
          product={editingProduct}
          onClose={handleClose}
          onSaved={handleSaved}
        />
      )}
    </div>
  );
}

export default AdminProducts;
