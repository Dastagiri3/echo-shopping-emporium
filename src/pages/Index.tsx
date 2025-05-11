
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import FeaturedProducts from '@/components/FeaturedProducts';
import CategoryList from '@/components/CategoryList';

const Index = () => {
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-amazon-blue to-blue-900 text-white">
        <div className="container mx-auto px-4 py-12 md:py-24">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Welcome to Amazon Clone
            </h1>
            <p className="text-lg md:text-xl mb-6 text-gray-100">
              Shop our amazing products with great deals every day
            </p>
            <div className="space-x-3">
              <Button 
                asChild
                className="bg-amazon-yellow hover:bg-yellow-500 text-black font-bold py-2 px-8"
              >
                <a href="#featured-products">
                  Shop Now
                </a>
              </Button>
              {!isAuthenticated && (
                <Button 
                  asChild
                  variant="outline"
                  className="bg-transparent hover:bg-white/20 text-white border-white"
                >
                  <a href="/signup">
                    Sign Up
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Welcome Message for Logged in Users */}
      {isAuthenticated && (
        <div className="container mx-auto px-4 py-6">
          <div className="bg-white rounded-md shadow p-4">
            <h2 className="text-xl font-medium">Hello, {user?.name}!</h2>
            <p className="text-gray-600">Welcome back to your Amazon shopping experience.</p>
          </div>
        </div>
      )}

      {/* Category Navigation */}
      <CategoryList />

      {/* Featured Products Section */}
      <div id="featured-products">
        <FeaturedProducts />
      </div>

      {/* Deals Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-orange-50 to-yellow-50">
            <h2 className="text-2xl font-bold mb-4">Today's Deals</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white border border-gray-200 rounded-md p-4 flex items-center">
                <img 
                  src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=300&h=200&q=80" 
                  alt="Smart Watch" 
                  className="w-24 h-24 object-cover rounded mr-4" 
                />
                <div>
                  <h3 className="font-medium">Smart Watch Sale</h3>
                  <p className="text-green-600 font-bold">Up to 30% off</p>
                  <p className="text-sm text-gray-600">Limited time offer</p>
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-md p-4 flex items-center">
                <img 
                  src="https://images.unsplash.com/photo-1585155770447-2f66e2a397b5?auto=format&fit=crop&w=300&h=200&q=80" 
                  alt="Headphones" 
                  className="w-24 h-24 object-cover rounded mr-4" 
                />
                <div>
                  <h3 className="font-medium">Premium Headphones</h3>
                  <p className="text-green-600 font-bold">Starting at $49.99</p>
                  <p className="text-sm text-gray-600">Best sellers of the month</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
