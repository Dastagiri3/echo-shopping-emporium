
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/context/AuthContext';
import { ShoppingBag, User, LogOut, Heart, Package } from 'lucide-react';

const Account = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated || !user) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Your Account</h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar for larger screens */}
        <div className="hidden md:block w-64 bg-white rounded-lg shadow-md p-4 h-fit">
          <div className="py-2">
            <span className="font-medium text-lg">Hello, {user.name}</span>
            <div className="text-sm text-gray-600">{user.email}</div>
          </div>
          <Separator className="my-2" />
          <nav className="space-y-1">
            <button 
              onClick={() => setActiveTab('profile')}
              className={`w-full text-left px-3 py-2 rounded-md flex items-center text-sm ${
                activeTab === 'profile' ? 'bg-amazon-blue text-white' : 'hover:bg-gray-100'
              }`}
            >
              <User size={18} className="mr-2" />
              Your Profile
            </button>
            <button 
              onClick={() => setActiveTab('orders')}
              className={`w-full text-left px-3 py-2 rounded-md flex items-center text-sm ${
                activeTab === 'orders' ? 'bg-amazon-blue text-white' : 'hover:bg-gray-100'
              }`}
            >
              <ShoppingBag size={18} className="mr-2" />
              Orders
            </button>
            <button 
              onClick={() => setActiveTab('wishlist')}
              className={`w-full text-left px-3 py-2 rounded-md flex items-center text-sm ${
                activeTab === 'wishlist' ? 'bg-amazon-blue text-white' : 'hover:bg-gray-100'
              }`}
            >
              <Heart size={18} className="mr-2" />
              Wishlist
            </button>
            <button 
              onClick={logout}
              className="w-full text-left px-3 py-2 rounded-md flex items-center text-sm hover:bg-gray-100 text-red-600"
            >
              <LogOut size={18} className="mr-2" />
              Sign Out
            </button>
          </nav>
        </div>

        {/* Tabs for mobile */}
        <div className="md:hidden w-full mb-4">
          <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Main content area */}
        <div className="flex-1">
          {activeTab === 'profile' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Your Profile</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm text-gray-500">Full Name</h3>
                  <p className="font-medium">{user.name}</p>
                </div>
                <div>
                  <h3 className="text-sm text-gray-500">Email</h3>
                  <p className="font-medium">{user.email}</p>
                </div>
                <Separator />
                <div className="pt-2">
                  <Button variant="outline" className="mr-2">
                    Edit Profile
                  </Button>
                  <Button 
                    variant="destructive" 
                    onClick={logout}
                    className="md:hidden" // Only show on mobile since sidebar has logout
                  >
                    <LogOut size={16} className="mr-2" /> Sign Out
                  </Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Your Orders</h2>
              <div className="text-center py-8">
                <Package size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium">No orders yet</h3>
                <p className="text-gray-600 mb-6">When you place an order, it will appear here.</p>
                <Button 
                  onClick={() => navigate('/')}
                  className="bg-amazon-blue hover:bg-blue-900"
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Your Wishlist</h2>
              <div className="text-center py-8">
                <Heart size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium">Your wishlist is empty</h3>
                <p className="text-gray-600 mb-6">Save items you want to buy later.</p>
                <Button 
                  onClick={() => navigate('/')}
                  className="bg-amazon-blue hover:bg-blue-900"
                >
                  Browse Products
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
