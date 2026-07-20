import { useState, useEffect } from "react";

function AdminProductForm({ product, onClose, onSaved }) {
  const isEdit = Boolean(product);
  const [categories, setCategories] = useState([]);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [images, setImages] = useState(product ? product.images : []);

  const [form, setForm] = useState({
    nameEn: product ? product.nameEn : "",
    nameAr: product ? product.nameAr : "",
    descriptionEn: product ? product.descriptionEn : "",
    descriptionAr: product ? product.descriptionAr : "",
    price: product && product.price !== null && product.price !== undefined ? product.price : "",
    oldPrice: product && product.oldPrice ? product.oldPrice : "",
    category: product && product.category ? product.category._id : "",
    colors: product ? product.colors.join(", ") : "",
    sizes: product ? product.sizes.join(", ") : "",
    badge: product ? product.badge : "",
    inStock: product ? product.inStock : true,
    featured: product ? Boolean(product.featured) : false,
  });

  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch(() => {});
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const token = localStorage.getItem("adminToken");
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setImages((prev) => [...prev, data.url]);
      } else {
        alert(data.message || "Upload failed");
      }
    } catch {
      alert("Could not upload image");
    }
    setUploading(false);
    e.target.value = "";
  };

  const removeImage = (url) => {
    setImages((prev) => prev.filter((img) => img !== url));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.nameEn || !form.nameAr || !form.category) {
      setError("Please fill name (EN + AR) and category.");
      return;
    }

    setSaving(true);
    const token = localStorage.getItem("adminToken");

    const productData = {
      nameEn: form.nameEn,
      nameAr: form.nameAr,
      descriptionEn: form.descriptionEn,
      descriptionAr: form.descriptionAr,
      price: form.price === "" ? null : Number(form.price),
      oldPrice: form.oldPrice ? Number(form.oldPrice) : null,
      category: form.category,
      images: images,
      colors: form.colors
        ? form.colors.split(",").map((c) => c.trim()).filter(Boolean)
        : [],
      sizes: form.sizes
        ? form.sizes.split(",").map((s) => s.trim()).filter(Boolean)
        : [],
      inStock: form.inStock,
      featured: form.featured,
      badge: form.badge,
    };

    const url = isEdit
      ? `/api/products/${product._id}`
      : "/api/products";

    try {
      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(productData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to save product");
        setSaving(false);
        return;
      }

      onSaved();
    } catch {
      setError("Could not connect to the server");
      setSaving(false);
    }
  };

  return (
    <div className="admin-modal-overlay">
      <div className="admin-modal">
        <div className="admin-modal-header">
          <h3>{isEdit ? "Edit Product" : "Add Product"}</h3>
          <button className="admin-modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        {error && <div className="admin-form-error">{error}</div>}

        <form onSubmit={handleSubmit} className="admin-form">
          <div className="admin-form-row">
            <div className="admin-form-field">
              <label>Name (English) *</label>
              <input type="text" name="nameEn" value={form.nameEn} onChange={handleChange} placeholder="e.g. Executive Office Desk" />
            </div>
            <div className="admin-form-field">
              <label>Name (Arabic) *</label>
              <input type="text" name="nameAr" value={form.nameAr} onChange={handleChange} placeholder="الاسم بالعربية" dir="rtl" />
            </div>
          </div>

          <div className="admin-form-row">
            <div className="admin-form-field">
              <label>Description (English)</label>
              <textarea name="descriptionEn" value={form.descriptionEn} onChange={handleChange} rows="3"></textarea>
            </div>
            <div className="admin-form-field">
              <label>Description (Arabic)</label>
              <textarea name="descriptionAr" value={form.descriptionAr} onChange={handleChange} rows="3" dir="rtl"></textarea>
            </div>
          </div>

          <div className="admin-form-field">
            <label>Product Images</label>
            <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
            {uploading && <span className="admin-uploading">Uploading...</span>}

            {images.length > 0 && (
              <div className="admin-image-previews">
                {images.map((url) => (
                  <div className="admin-image-preview" key={url}>
                    <img src={url} alt="Product" />
                    <button type="button" onClick={() => removeImage(url)}>✕</button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="admin-form-row">
            <div className="admin-form-field">
              <label>Price (SAR, optional)</label>
              <input type="number" name="price" value={form.price} onChange={handleChange} min="0" placeholder="Leave empty to hide the price" />
            </div>
            <div className="admin-form-field">
              <label>Old Price (SAR, for SALE items)</label>
              <input type="number" name="oldPrice" value={form.oldPrice} onChange={handleChange} placeholder="Leave empty if not on sale" />
            </div>
          </div>

          <div className="admin-form-row">
            <div className="admin-form-field">
              <label>Category *</label>
              <select name="category" value={form.category} onChange={handleChange}>
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>{cat.nameEn}</option>
                ))}
              </select>
            </div>
            <div className="admin-form-field">
              <label>Badge</label>
              <select name="badge" value={form.badge} onChange={handleChange}>
                <option value="">None</option>
                <option value="NEW">NEW</option>
                <option value="SALE">SALE</option>
              </select>
            </div>
          </div>

          <div className="admin-form-row">
            <div className="admin-form-field">
              <label>Colors (comma separated)</label>
              <input type="text" name="colors" value={form.colors} onChange={handleChange} placeholder="e.g. Black, Brown" />
            </div>
            <div className="admin-form-field">
              <label>Sizes (comma separated)</label>
              <input type="text" name="sizes" value={form.sizes} onChange={handleChange} placeholder="e.g. 120x60 cm" />
            </div>
          </div>

         <div className="admin-form-check">
            <label>
              <input type="checkbox" name="inStock" checked={form.inStock} onChange={handleChange} />
              In Stock
            </label>
            <label>
              <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} />
              Featured on Homepage
            </label>
          </div>

          <div className="admin-form-actions">
            <button type="button" className="admin-cancel-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="admin-save-btn" disabled={saving || uploading}>
              {saving ? "Saving..." : isEdit ? "Update Product" : "Save Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminProductForm;
