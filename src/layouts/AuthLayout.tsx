import { Navigate, Outlet, useLocation } from "react-router";

export default function AuthLayout() {
  const auth = false;
  const location = useLocation();

  if (!auth) {
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
