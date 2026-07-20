import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./AdminLogin.css";

function AdminResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/admin/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Could not reset password");
        setLoading(false);
        return;
      }

      setDone(true);
      setTimeout(() => navigate("/admin/login"), 2500);
    } catch {
      setError("Could not connect to the server");
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="admin-login">
        <div className="admin-login-card">
          <h1 className="admin-login-title">Password Updated</h1>
          <div className="admin-login-success">
            Your password has been changed. Redirecting to login...
          </div>
          <div className="admin-login-links">
            <Link to="/admin/login">Go to login</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-login">
      <div className="admin-login-card">
        <h1 className="admin-login-title">Set New Password</h1>
        <p className="admin-login-subtitle">Choose a strong password</p>

        {error && <div className="admin-login-error">{error}</div>}

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="admin-field">
            <label htmlFor="password">New Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
              required
            />
          </div>

          <div className="admin-field">
            <label htmlFor="confirm">Confirm Password</label>
            <input
              type="password"
              id="confirm"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Repeat the new password"
              required
            />
          </div>

          <button type="submit" className="admin-login-btn" disabled={loading}>
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>

        <div className="admin-login-links">
          <Link to="/admin/login">← Back to login</Link>
        </div>
      </div>
    </div>
  );
}

export default AdminResetPassword;