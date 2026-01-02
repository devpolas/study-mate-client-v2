import { RouterProvider } from "react-router";
import router from "./routes/route";

export default function App() {
  return <RouterProvider router={router} />;
}
