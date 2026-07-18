import { Navigate } from "react-router-dom";

const hasValidToken = (token) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return !payload.exp || payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

function AdminRoute({ children }) {
  const token = localStorage.getItem("adminToken");

  if (!token || !hasValidToken(token)) {
    localStorage.removeItem("adminToken");
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

export default AdminRoute;
