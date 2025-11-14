import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Homepage from "../pages/Homepage";
import ProfilePage from "../pages/ProfilePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import FindPartnerPage from "../pages/FindPartnerPage";
import PartnerDetailsPage from "../pages/PartnerDetailsPage";
import ProtectRoute from "./ProtectRoute";
import PublicRoute from "./PublicRoute";
import ForgetPassword from "../pages/ForgetPassword";
import { getAllUsers, getMe, getSingleUser } from "../utils/dataLoader";
import ErrorPage from "../pages/ErrorPage";
import ErrorElement from "../pages/ErrorElement";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    hydrateFallbackElement: <div className='skeleton h-screen w-dvw'></div>,
    errorElement: <ErrorElement />,
    children: [
      { index: true, Component: Homepage },
      {
        path: "login",
        element: (
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        ),
      },
      {
        path: "signup",
        element: (
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
        ),
      },
      { path: "forget-password", Component: ForgetPassword },
      {
        path: "find-partner",
        id: "mates",
        Component: FindPartnerPage,
        loader: getAllUsers,
      },
      {
        path: "partner/:id",
        loader: async ({ params }) => await getSingleUser(params.id),
        element: (
          <ProtectRoute>
            <PartnerDetailsPage />
          </ProtectRoute>
        ),
      },
      {
        path: "profile",
        loader: getMe,
        element: (
          <ProtectRoute>
            <ProfilePage />
          </ProtectRoute>
        ),
      },
      {
        path: "*",
        Component: ErrorPage,
      },
    ],
  },
]);

export default router;
