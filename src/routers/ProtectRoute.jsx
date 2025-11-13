import { Navigate, useLocation } from "react-router";
import { useState, useEffect } from "react";

export default function ProtectRoute({ children }) {
  const location = useLocation();
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    setLoading(false);
  }, []);

  if (loading) {
    return null;
  }

  if (token) {
    return children;
  }

  return <Navigate to='/login' state={{ from: location }} replace />;
}
