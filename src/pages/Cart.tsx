
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';

const Cart = () => {
  const { items, removeItem, updateQuantity, totalItems, totalPrice } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast({
        title: 'Login required',
        description: 'Please login to continue with checkout',
        variant: 'destructive',
      });
      navigate('/login?redirect=checkout');
      return;
    }

    // In a real app, you'd navigate to a checkout page
    toast({
      title: 'Checkout initiated',
      description: 'This is a demo. No actual purchase will be made.',
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Your Shopping Cart</h1>

      {items.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Looks like you haven't added any items to your cart yet.</p>
          <Button 
            onClick={() => navigate('/')}
            className="bg-amazon-blue hover:bg-blue-900"
          >
            Continue Shopping
          </Button>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Cart Items */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {items.map((item) => (
                <div key={item.id} className="p-4 border-b border-gray-200 last:border-b-0">
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Product Image */}
                    <Link to={`/product/${item.id}`} className="w-full sm:w-24 h-24">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover rounded" 
                      />
                    </Link>
                    
                    {/* Product Details */}
                    <div className="flex-grow">
                      <Link to={`/product/${item.id}`}>
                        <h3 className="font-medium hover:text-amazon-blue transition-colors">
                          {item.name}
                        </h3>
                      </Link>
                      <p className="text-green-600 text-sm mb-2">
                        {item.inStock ? 'In Stock' : 'Out of Stock'}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-gray-300 rounded">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="px-2 py-1 border-r border-gray-300 text-gray-500 hover:bg-gray-100 disabled:opacity-50"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="px-3">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-1 border-l border-gray-300 text-gray-500 hover:bg-gray-100"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        
                        {/* Delete Button */}
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-gray-500 hover:text-red-600 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                    
                    {/* Price */}
                    <div className="text-right">
                      <p className="font-medium">${item.price.toFixed(2)}</p>
                      {item.quantity > 1 && (
                        <p className="text-sm text-gray-600">
                          ${item.price.toFixed(2)} each
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-lg font-bold mb-4">Order Summary</h2>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({totalItems} items)</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated tax</span>
                  <span>${(totalPrice * 0.1).toFixed(2)}</span>
                </div>
              </div>

              <Separator className="my-4" />
              
              <div className="flex justify-between font-bold text-lg mb-6">
                <span>Total</span>
                <span>${(totalPrice + totalPrice * 0.1).toFixed(2)}</span>
              </div>

              <Button 
                onClick={handleCheckout}
                className="w-full bg-amazon-yellow hover:bg-yellow-500 text-black font-bold"
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
