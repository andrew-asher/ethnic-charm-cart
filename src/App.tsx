import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/context/CartContext";
import { AdminProvider, useAdmin } from "@/context/AdminContext";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import AdminLogin from "./components/admin/AdminLogin";
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/Products";
import Categories from "./pages/admin/Categories";
import Collections from "./pages/admin/Collections";
import Homepage from "./pages/admin/Homepage";
import Testimonials from "./pages/admin/Testimonials";
import WhatsAppSettingsPage from "./pages/admin/WhatsAppSettingsPage";
import SiteContent from "./pages/admin/SiteContent";

const queryClient = new QueryClient();

const AdminGate = () => {
  const { isAuthenticated } = useAdmin();
  if (!isAuthenticated) return <AdminLogin />;
  return <AdminLayout />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AdminProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/admin" element={<AdminGate />}>
                <Route index element={<Dashboard />} />
                <Route path="products" element={<Products />} />
                <Route path="categories" element={<Categories />} />
                <Route path="collections" element={<Collections />} />
                <Route path="homepage" element={<Homepage />} />
                <Route path="testimonials" element={<Testimonials />} />
                <Route path="whatsapp" element={<WhatsAppSettingsPage />} />
                <Route path="content" element={<SiteContent />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </AdminProvider>
  </QueryClientProvider>
);

export default App;
