import { useState } from "react";
import { Link } from "react-router-dom";
import "./AdminLogin.css";

function AdminForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong");
      } else {
        setMessage(data.message);
        setEmail("");
      }
    } catch {
      setError("Could not connect to the server");
    }
    setLoading(false);
  };

  return (
    <div className="admin-login">
      <div className="admin-login-card">
        <h1 className="admin-login-title">Forgot Password</h1>
        <p className="admin-login-subtitle">
          Enter your admin email and we'll send a reset link
        </p>

        {error && <div className="admin-login-error">{error}</div>}
        {message && <div className="admin-login-success">{message}</div>}

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="admin-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter admin email"
              required
            />
          </div>

          <button type="submit" className="admin-login-btn" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <div className="admin-login-links">
          <Link to="/admin/login">← Back to login</Link>
        </div>
      </div>
    </div>
  );
}

export default AdminForgotPassword;