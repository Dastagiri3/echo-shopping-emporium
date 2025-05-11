
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartContextType, CartItem, Product } from '@/types';
import { useToast } from '@/components/ui/use-toast';

// Create context with default values
const CartContext = createContext<CartContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  totalItems: 0,
  totalPrice: 0,
});

// Provider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('amazonCloneCart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setItems(parsedCart);
      } catch (error) {
        console.error('Failed to parse cart from localStorage', error);
        localStorage.removeItem('amazonCloneCart');
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('amazonCloneCart', JSON.stringify(items));
  }, [items]);

  // Add item to cart or update quantity if it already exists
  const addItem = (product: Product, quantity = 1) => {
    setItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.id === product.id);
      
      if (existingItemIndex > -1) {
        // Item exists, update quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        
        toast({
          title: 'Cart updated',
          description: `${product.name} quantity updated in your cart`,
        });
        
        return updatedItems;
      } else {
        // Item doesn't exist, add new item
        toast({
          title: 'Added to cart',
          description: `${product.name} added to your cart`,
        });
        
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  // Remove item from cart
  const removeItem = (productId: string) => {
    setItems(prevItems => {
      const product = prevItems.find(item => item.id === productId);
      if (product) {
        toast({
          title: 'Removed from cart',
          description: `${product.name} removed from your cart`,
        });
      }
      return prevItems.filter(item => item.id !== productId);
    });
  };

  // Update item quantity
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Clear the entire cart
  const clearCart = () => {
    setItems([]);
    toast({
      title: 'Cart cleared',
      description: 'All items have been removed from your cart',
    });
  };

  // Calculate total items in cart
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  // Calculate total price of items in cart
  const totalPrice = items.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ 
      items, 
      addItem, 
      removeItem, 
      updateQuantity, 
      clearCart, 
      totalItems,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for using cart context
export const useCart = () => useContext(CartContext);
