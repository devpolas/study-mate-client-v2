import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Homepage from "../pages/Homepage";
import ProfilePage from "../pages/ProfilePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import FindPartnerPage from "../pages/FindPartnerPage";
import PartnerDetailsPage from "../pages/PartnerDetailsPage";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Homepage },
      { path: "login", Component: LoginPage },
      { path: "signup", Component: RegisterPage },
      { path: "profile", Component: ProfilePage },
      { path: "find-partner", Component: FindPartnerPage },
      { path: "partner/:id", Component: PartnerDetailsPage },
      { path: "profile", Component: ProfilePage },
    ],
  },
]);

export default router;
