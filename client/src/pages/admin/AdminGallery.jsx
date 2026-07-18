import { useState, useEffect } from "react";

function AdminGallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const fetchImages = () => {
    fetch("http://localhost:5000/api/gallery")
      .then((res) => res.json())
      .then((data) => {
        setImages(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const token = localStorage.getItem("adminToken");

    try {
      // 1. Upload the file to Cloudinary
      const formData = new FormData();
      formData.append("image", file);
      const upRes = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const upData = await upRes.json();
      if (!upRes.ok) {
        alert(upData.message || "Upload failed");
        setUploading(false);
        return;
      }

      // 2. Save it in the gallery
      const saveRes = await fetch("http://localhost:5000/api/gallery", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ image: upData.url }),
      });

      if (saveRes.ok) fetchImages();
    } catch {
      alert("Could not upload image");
    }
    setUploading(false);
    e.target.value = "";
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this image from the gallery?");
    if (!confirmed) return;

    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch(`http://localhost:5000/api/gallery/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) fetchImages();
    } catch {
      alert("Could not delete");
    }
  };

  if (loading) return <p>Loading gallery...</p>;

  return (
    <div className="admin-products">
      <div className="admin-products-header">
        <h2>Gallery ({images.length})</h2>
        <label className="admin-add-btn admin-upload-label">
          {uploading ? "Uploading..." : "+ Upload Photo"}
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            disabled={uploading}
            hidden
          />
        </label>
      </div>

      {images.length === 0 ? (
        <p>No photos yet. Upload your first one!</p>
      ) : (
        <div className="admin-gallery-grid">
          {images.map((img) => (
            <div className="admin-gallery-item" key={img._id}>
              <img src={img.image} alt={img.title || "Gallery"} />
              <button onClick={() => handleDelete(img._id)}>✕</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminGallery;
