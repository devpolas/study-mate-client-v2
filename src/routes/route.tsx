import MainLayout from "@/layouts/MainLayout";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
  },
]);

export default router;
