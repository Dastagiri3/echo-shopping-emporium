
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Index from "./pages/Index";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Account from "./pages/Account";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen flex flex-col bg-gray-50">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/account" element={<Account />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <footer className="bg-amazon-dark text-white py-8 mt-auto">
                <div className="container mx-auto px-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                      <h3 className="font-bold mb-4">Get to Know Us</h3>
                      <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-amazon-light">About Us</a></li>
                        <li><a href="#" className="hover:text-amazon-light">Careers</a></li>
                        <li><a href="#" className="hover:text-amazon-light">Press Releases</a></li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-bold mb-4">Make Money with Us</h3>
                      <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-amazon-light">Sell products</a></li>
                        <li><a href="#" className="hover:text-amazon-light">Become an Affiliate</a></li>
                        <li><a href="#" className="hover:text-amazon-light">Advertise Products</a></li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-bold mb-4">Payment Products</h3>
                      <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-amazon-light">Credit Cards</a></li>
                        <li><a href="#" className="hover:text-amazon-light">Shop with Points</a></li>
                        <li><a href="#" className="hover:text-amazon-light">Gift Cards</a></li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-bold mb-4">Let Us Help You</h3>
                      <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-amazon-light">Your Account</a></li>
                        <li><a href="#" className="hover:text-amazon-light">Your Orders</a></li>
                        <li><a href="#" className="hover:text-amazon-light">Help Center</a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="mt-8 text-center text-sm text-gray-400">
                    <p>© 2025 Amazon Clone, Inc. This is a demo app for educational purposes only.</p>
                  </div>
                </div>
              </footer>
            </div>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
