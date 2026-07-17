import { useState, useEffect } from "react";

function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({ nameEn: "", nameAr: "", slug: "", image: "" });

  const fetchCategories = () => {
    fetch("http://localhost:5000/api/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const openAdd = () => {
    setEditing(null);
    setForm({ nameEn: "", nameAr: "", slug: "", image: "" });
    setError("");
    setShowForm(true);
  };

  const openEdit = (cat) => {
    setEditing(cat);
    setForm({ nameEn: cat.nameEn, nameAr: cat.nameAr, slug: cat.slug, image: cat.image || "" });
    setError("");
    setShowForm(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const token = localStorage.getItem("adminToken");
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setForm((prev) => ({ ...prev, image: data.url }));
      } else {
        alert(data.message || "Upload failed");
      }
    } catch {
      alert("Could not upload image");
    }
    setUploading(false);
    e.target.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.nameEn || !form.nameAr || !form.slug) {
      setError("Please fill all name and slug fields.");
      return;
    }

    setSaving(true);
    const token = localStorage.getItem("adminToken");
    const url = editing
      ? `http://localhost:5000/api/categories/${editing._id}`
      : "http://localhost:5000/api/categories";

    try {
      const res = await fetch(url, {
        method: editing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to save");
        setSaving(false);
        return;
      }

      setShowForm(false);
      setSaving(false);
      fetchCategories();
    } catch {
      setError("Could not connect to the server");
      setSaving(false);
    }
  };

  const handleDelete = async (cat) => {
    const confirmed = window.confirm(
      `Delete "${cat.nameEn}"? Products in this category may become uncategorized.`
    );
    if (!confirmed) return;

    const token = localStorage.getItem("adminToken");

    try {
      const res = await fetch(`http://localhost:5000/api/categories/${cat._id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        fetchCategories();
      } else {
        const data = await res.json();
        alert(data.message || "Failed to delete");
      }
    } catch {
      alert("Could not connect to the server");
    }
  };

  if (loading) return <p>Loading categories...</p>;

  return (
    <div className="admin-products">
      <div className="admin-products-header">
        <h2>Categories ({categories.length})</h2>
        <button className="admin-add-btn" onClick={openAdd}>
          + Add Category
        </button>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name (EN)</th>
            <th>Name (AR)</th>
            <th>Slug</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat._id}>
              <td>
                {cat.image ? (
                  <img src={cat.image} alt={cat.nameEn} className="admin-table-thumb" />
                ) : (
                  "—"
                )}
              </td>
              <td>{cat.nameEn}</td>
              <td>{cat.nameAr}</td>
              <td>{cat.slug}</td>
              <td>
                <div className="admin-actions">
                  <button className="admin-edit-btn" onClick={() => openEdit(cat)}>
                    Edit
                  </button>
                  <button className="admin-delete-btn" onClick={() => handleDelete(cat)}>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showForm && (
        <div className="admin-modal-overlay">
          <div className="admin-modal" style={{ maxWidth: "520px" }}>
            <div className="admin-modal-header">
              <h3>{editing ? "Edit Category" : "Add Category"}</h3>
              <button className="admin-modal-close" onClick={() => setShowForm(false)}>
                ✕
              </button>
            </div>

            {error && <div className="admin-form-error">{error}</div>}

            <form onSubmit={handleSubmit} className="admin-form">
              <div className="admin-form-field">
                <label>Name (English) *</label>
                <input type="text" name="nameEn" value={form.nameEn} onChange={handleChange} placeholder="e.g. Office Furniture" />
              </div>

              <div className="admin-form-field">
                <label>Name (Arabic) *</label>
                <input type="text" name="nameAr" value={form.nameAr} onChange={handleChange} placeholder="الاسم بالعربية" dir="rtl" />
              </div>

              <div className="admin-form-field">
                <label>Slug (URL name, lowercase with dashes) *</label>
                <input type="text" name="slug" value={form.slug} onChange={handleChange} placeholder="e.g. office-furniture" />
              </div>

              <div className="admin-form-field">
                <label>Category Image</label>
                <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
                {uploading && <span className="admin-uploading">Uploading...</span>}
                {form.image && (
                  <div className="admin-image-previews">
                    <div className="admin-image-preview">
                      <img src={form.image} alt="Category" />
                      <button type="button" onClick={() => setForm((p) => ({ ...p, image: "" }))}>
                        ✕
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="admin-form-actions">
                <button type="button" className="admin-cancel-btn" onClick={() => setShowForm(false)}>
                  Cancel
                </button>
                <button type="submit" className="admin-save-btn" disabled={saving || uploading}>
                  {saving ? "Saving..." : editing ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminCategories;