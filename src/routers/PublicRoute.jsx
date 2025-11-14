import { Navigate, useLocation } from "react-router";
import useAuthContext from "../context/useAuthContext";

export default function PublicRoute({ children }) {
  const location = useLocation();
  const { token } = useAuthContext();

  if (!token) {
    return children;
  }

  const from = location.state?.from?.pathname || "/";
  return <Navigate to={from} replace />;
}
