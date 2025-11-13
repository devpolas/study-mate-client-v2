import { Navigate, useLocation } from "react-router";
import useAuthContext from "./../context/useAuthContext.jsx";

export default function PublicRoute({ children }) {
  const location = useLocation();
  const { token } = useAuthContext();

  if (!token || token === null) {
    return children;
  }

  return <Navigate to={location?.state || "/"} />;
}
