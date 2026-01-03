import MainLayout from "@/layouts/MainLayout";
import LoginPage from "@/pages/LoginPage";
import ErrorPage from "@/pages/ErrorPage";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        path: "/signin",
        Component: LoginPage,
      },
      {
        path: "*",
        Component: ErrorPage,
      },
    ],
  },
]);

export default router;
