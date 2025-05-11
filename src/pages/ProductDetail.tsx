
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, ShoppingCart, Check, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { getProductById } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { Product } from '@/types';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addItem } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      window.scrollTo(0, 0);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      if (!id) {
        navigate('/');
        return;
      }

      const foundProduct = getProductById(id);
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        toast({
          title: 'Error',
          description: 'Product not found',
          variant: 'destructive',
        });
        navigate('/');
      }

      setLoading(false);
    };

    fetchProduct();
  }, [id, navigate, toast]);

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  // Product loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-2/5">
              <div className="bg-gray-100 h-96 rounded animate-pulse"></div>
            </div>
            <div className="w-full md:w-3/5">
              <div className="h-8 bg-gray-100 rounded w-3/4 mb-4 animate-pulse"></div>
              <div className="h-6 bg-gray-100 rounded w-1/4 mb-6 animate-pulse"></div>
              <div className="h-20 bg-gray-100 rounded mb-6 animate-pulse"></div>
              <div className="h-10 bg-gray-100 rounded w-1/3 mb-4 animate-pulse"></div>
              <div className="h-12 bg-gray-100 rounded w-1/2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If product not found
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <p className="mb-4">Sorry, we couldn't find the product you're looking for.</p>
        <Button onClick={() => navigate('/')}>Return to Home</Button>
      </div>
    );
  }

  // Render stars for the rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={`full-${i}`} className="fill-amazon-orange text-amazon-orange" size={18} />
      );
    }
    
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="text-gray-300" size={18} />
          <Star 
            className="absolute top-0 left-0 fill-amazon-orange text-amazon-orange overflow-hidden" 
            size={18} 
            style={{ clipPath: 'inset(0 50% 0 0)' }}
          />
        </div>
      );
    }
    
    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="text-gray-300" size={18} />);
    }
    
    return stars;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Product Image */}
          <div className="w-full md:w-2/5">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-auto object-cover" 
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="w-full md:w-3/5">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex mr-2">
                {renderStars(product.rating)}
              </div>
              <span className="text-sm text-gray-600">
                ({product.reviewCount.toLocaleString()} reviews)
              </span>
            </div>

            <div className="mb-6 pb-6 border-b border-gray-200">
              <div className="flex items-baseline mb-2">
                <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
                {product.oldPrice && (
                  <span className="ml-3 text-lg text-gray-500 line-through">
                    ${product.oldPrice.toFixed(2)}
                  </span>
                )}
                {product.oldPrice && (
                  <span className="ml-3 bg-green-100 text-green-800 px-2 py-0.5 rounded text-sm">
                    Save ${(product.oldPrice - product.price).toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            <div className="mb-6">
              <h2 className="font-bold text-lg mb-2">Description</h2>
              <p className="text-gray-700">{product.description}</p>
            </div>

            <div className="mb-6">
              <div className="flex items-center text-sm mb-2">
                <span className={product.inStock ? 'text-green-600' : 'text-red-600'}>
                  {product.inStock ? (
                    <>
                      <Check size={18} className="inline mr-1" />
                      In Stock
                    </>
                  ) : 'Out of Stock'}
                </span>
              </div>
            </div>

            {product.inStock && (
              <div className="flex flex-col sm:flex-row gap-4 items-center mb-6">
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button 
                    onClick={decreaseQuantity} 
                    disabled={quantity <= 1}
                    className="px-3 py-1 border-r border-gray-300 text-gray-500 hover:bg-gray-100 disabled:opacity-50"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-4">{quantity}</span>
                  <button 
                    onClick={increaseQuantity}
                    className="px-3 py-1 border-l border-gray-300 text-gray-500 hover:bg-gray-100"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <Button 
                  onClick={handleAddToCart}
                  className="bg-amazon-yellow hover:bg-yellow-500 text-black font-medium py-2 px-8 w-full sm:w-auto"
                >
                  <ShoppingCart size={18} className="mr-2" />
                  Add to Cart
                </Button>
              </div>
            )}

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">About this item:</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700 text-sm">
                <li>Category: {product.category}</li>
                <li>Free returns within 30 days</li>
                <li>Available for fast shipping</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
