import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

import "./index.css";
import "./pages/Dashboard";
import Expense from "./pages/Expense";
import Budget from "./pages/Budget";
import GetStartedPage from "./pages/GetStartedPage";
import OpeningPage from "./pages/OpeningPage";
import Dashboard from "./pages/Dashboard";
import PageNotFound from "./pages/PageNotFound";
import Income from "./pages/Income";
import AppLayout from "./pages/AppLayout";
import AccountSettings from "./pages/AccountSettings";
import ProtectedRoutes from "./ui/ProtectedRoutes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<OpeningPage />} />
            <Route path="GetStarted" element={<GetStartedPage />} />
            <Route
              element={
                <ProtectedRoutes>
                  <AppLayout />
                </ProtectedRoutes>
              }
            >
              <Route path="Dashboard" element={<Dashboard />} />
              <Route path="Income" element={<Income />} />
              <Route path="Budget" element={<Budget />} />
              <Route path="Expense" element={<Expense />} />
              <Route path="AccountSettings" element={<AccountSettings />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: { duration: 3000 },
          error: { duration: 5000 },
        }}
      />
    </>
  );
}

export default App;
