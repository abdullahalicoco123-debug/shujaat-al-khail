import { useState, useEffect } from "react";
import "./GalleryPage.css";

function GalleryPage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data) => {
        setImages(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section className="gallery-page">
      <div className="gallery-banner">
        <h1 className="gallery-title">Our Gallery</h1>
        <span className="section-divider"></span>
      </div>

      <div className="container gallery-container">
        {loading ? (
          <p className="gallery-empty">Loading gallery...</p>
        ) : images.length === 0 ? (
          <p className="gallery-empty">No photos yet. Check back soon!</p>
        ) : (
          <div className="gallery-grid">
            {images.map((img) => (
              <button
                className="gallery-item"
                key={img._id}
                onClick={() => setLightbox(img.image)}
              >
                <img src={img.image} alt={img.title || "Gallery"} loading="lazy" />
              </button>
            ))}
          </div>
        )}
      </div>

      {lightbox && (
        <div className="gallery-lightbox" onClick={() => setLightbox(null)}>
          <button className="gallery-lightbox-close">✕</button>
          <img src={lightbox} alt="Enlarged" />
        </div>
      )}
    </section>
  );
}

export default GalleryPage;
