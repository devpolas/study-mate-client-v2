import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router";

export default function PublicLayout() {
  const { auth } = useAuth();
  const { isAuthenticated } = auth;

  if (isAuthenticated) {
    return <Navigate to='/' replace />;
  }

  return <Outlet />;
}
