import { Navigate, Outlet } from "react-router";

export default function PublicLayout() {
  const auth = true;

  if (auth) {
    return <Navigate to='/' replace />;
  }

  return <Outlet />;
}
