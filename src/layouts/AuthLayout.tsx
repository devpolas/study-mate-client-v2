import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet, useLocation } from "react-router";

export default function AuthLayout() {
  const {
    auth: { isAuthenticated },
  } = useAuth();

  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate
        to='/signin'
        state={{ from: location?.pathname || "/" }}
        replace
      />
    );
  }

  return <Outlet />;
}
