
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  // Close mobile menu when window is resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-amazon-dark text-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="font-bold text-2xl text-amazon-light">
            Amazon
          </Link>

          {/* Search Bar - Hidden on mobile, visible on md+ */}
          <form 
            onSubmit={handleSearch} 
            className="hidden md:flex flex-1 mx-4"
          >
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-3 pr-10 text-black"
              />
              <button 
                type="submit" 
                className="absolute right-0 top-0 h-full px-3 bg-amazon-light hover:bg-amazon-orange text-black rounded-r-md"
              >
                <Search size={18} />
              </button>
            </div>
          </form>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-white hover:bg-amazon-blue">
                  <User size={20} className="mr-2" />
                  <div className="text-sm text-left">
                    <div>{isAuthenticated ? `Hello, ${user?.name.split(' ')[0]}` : 'Hello, sign in'}</div>
                    <div className="font-bold">Account & Lists</div>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {!isAuthenticated ? (
                  <>
                    <DropdownMenuItem asChild>
                      <Link to="/login" className="w-full">Sign In</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/signup" className="w-full">Create Account</Link>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <Link to="/account" className="w-full">Your Account</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/orders" className="w-full">Your Orders</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={logout}>
                      Sign Out
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Cart Link */}
            <Link 
              to="/cart" 
              className="flex items-center hover:text-amazon-light transition-colors"
            >
              <div className="relative">
                <ShoppingCart size={24} />
                <span className="absolute -top-2 -right-2 bg-amazon-orange text-black rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {totalItems}
                </span>
              </div>
              <span className="ml-1 font-bold">Cart</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden space-x-3">
            <Link 
              to="/cart" 
              className="relative mr-2"
            >
              <ShoppingCart size={24} />
              <span className="absolute -top-2 -right-2 bg-amazon-orange text-black rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                {totalItems}
              </span>
            </Link>
            <button 
              onClick={handleMobileMenuToggle}
              className="text-white p-1"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Search - Visible only on mobile */}
        <div className="md:hidden py-2 pb-3">
          <form onSubmit={handleSearch} className="flex">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-10 pl-3 pr-10 text-black"
              />
              <button 
                type="submit" 
                className="absolute right-0 top-0 h-full px-3 bg-amazon-light hover:bg-amazon-orange text-black rounded-r-md"
              >
                <Search size={18} />
              </button>
            </div>
          </form>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden bg-amazon-dark border-t border-gray-700 py-2 animate-fade-in">
            <ul className="space-y-2">
              {!isAuthenticated ? (
                <>
                  <li>
                    <Link 
                      to="/login" 
                      className="block px-4 py-2 hover:bg-amazon-blue"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/signup" 
                      className="block px-4 py-2 hover:bg-amazon-blue"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Create Account
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="px-4 py-1">
                    <div className="text-amazon-light">Hello, {user?.name.split(' ')[0]}</div>
                  </li>
                  <li>
                    <Link 
                      to="/account" 
                      className="block px-4 py-2 hover:bg-amazon-blue"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Your Account
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/orders" 
                      className="block px-4 py-2 hover:bg-amazon-blue"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Your Orders
                    </Link>
                  </li>
                  <li>
                    <button 
                      onClick={() => {
                        logout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-amazon-blue"
                    >
                      Sign Out
                    </button>
                  </li>
                </>
              )}
              <li>
                <Link 
                  to="/" 
                  className="block px-4 py-2 hover:bg-amazon-blue"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/categories/electronics" 
                  className="block px-4 py-2 hover:bg-amazon-blue"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Electronics
                </Link>
              </li>
              <li>
                <Link 
                  to="/categories/clothing" 
                  className="block px-4 py-2 hover:bg-amazon-blue"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Clothing
                </Link>
              </li>
              <li>
                <Link 
                  to="/categories/home" 
                  className="block px-4 py-2 hover:bg-amazon-blue"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home & Kitchen
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
