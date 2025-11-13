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
import { getMe, getSingleUser } from "../utils/dataLoader";
import ErrorPage from "../pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    hydrateFallbackElement: <div className='skeleton h-screen w-dvw'></div>,
    errorElement: <ErrorPage />,
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
      { path: "signup", Component: RegisterPage },
      { path: "forget-password", Component: ForgetPassword },
      { path: "find-partner", Component: FindPartnerPage },
      {
        path: "partner/:id",
        loader: async ({ params }) => await getSingleUser(params),
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
