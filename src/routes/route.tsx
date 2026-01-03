import MainLayout from "@/layouts/MainLayout";
import LoginPage from "@/pages/LoginPage";
import ErrorPage from "@/pages/ErrorPage";
import { createBrowserRouter } from "react-router";
import SignupPage from "@/pages/SignupPage";
import HomePage from "@/pages/HomePage";
import ProfilePage from "@/pages/ProfilePage";
import AboutPage from "@/pages/AboutPage";
import FriendsPage from "@/pages/FriendsPage";
import ParticipantsPage from "@/pages/ParticipantsPage";
import AuthLayout from "@/layouts/AuthLayout";
import PublicLayout from "@/layouts/PublicLayout";
import SettingsPage from "@/pages/SettingsPage";
import SupportPage from "@/pages/SupportPage";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: HomePage },
      {
        Component: PublicLayout,
        children: [
          {
            path: "/signin",
            Component: LoginPage,
          },
          { path: "/signup", Component: SignupPage },
        ],
      },

      { path: "/participants", Component: ParticipantsPage },
      { path: "/about", Component: AboutPage },
      { path: "/settings", Component: SettingsPage },
      { path: "/support", Component: SupportPage },
      {
        Component: AuthLayout,
        children: [
          { path: "/profile", Component: ProfilePage },
          { path: "/friends", Component: FriendsPage },
        ],
      },

      {
        path: "*",
        Component: ErrorPage,
      },
    ],
  },
]);

export default router;
