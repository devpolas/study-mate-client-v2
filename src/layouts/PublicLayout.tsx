import { Navigate, Outlet } from "react-router";

export default function PublicLayout() {
  const auth = false;

  if (auth) {
    return <Navigate to='/' replace />;
  }

  return <Outlet />;
}
