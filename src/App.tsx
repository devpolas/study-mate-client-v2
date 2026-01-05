import { RouterProvider } from "react-router";
import router from "./routes/route";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuth } from "./hooks/useAuth";
import { useEffect } from "react";

export default function App() {
  const {
    fetchMe,
    auth: { token },
  } = useAuth();

  useEffect(() => {
    if (token) {
      fetchMe();
    }
  }, [token]);

  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />;
    </QueryClientProvider>
  );
}
