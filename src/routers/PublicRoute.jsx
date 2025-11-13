import { Navigate, useLocation } from "react-router";

export default function PublicRoute({ children }) {
  const location = useLocation();
  const token = localStorage.getItem("token");

  if (!token) {
    return children;
  }

  const from = location.state?.from?.pathname || "/";
  return <Navigate to={from} replace />;
}
