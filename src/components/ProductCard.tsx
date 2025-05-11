
import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();
  
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={`full-${i}`} className="fill-amazon-orange text-amazon-orange" size={16} />
      );
    }
    
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="text-gray-300" size={16} />
          <Star 
            className="absolute top-0 left-0 fill-amazon-orange text-amazon-orange overflow-hidden" 
            size={16} 
            style={{ clipPath: 'inset(0 50% 0 0)' }}
          />
        </div>
      );
    }
    
    const remainingStars = 5 - stars.length;
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="text-gray-300" size={16} />);
    }
    
    return stars;
  };

  return (
    <div className="bg-white rounded-md shadow hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col h-full">
      <Link to={`/product/${product.id}`} className="block overflow-hidden">
        <div className="h-48 overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="font-medium text-lg line-clamp-2 mb-1 hover:text-amazon-blue transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center mt-1 mb-2">
          <div className="flex mr-2">
            {renderStars(product.rating)}
          </div>
          <span className="text-sm text-gray-600">
            ({product.reviewCount.toLocaleString()})
          </span>
        </div>
        
        <div className="mt-auto">
          <div className="flex items-baseline mb-2">
            <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
            {product.oldPrice && (
              <span className="ml-2 text-sm text-gray-500 line-through">
                ${product.oldPrice.toFixed(2)}
              </span>
            )}
          </div>
          
          {product.inStock ? (
            <Button 
              onClick={() => addItem(product)}
              className="w-full bg-amazon-yellow hover:bg-yellow-500 text-black font-medium"
            >
              <ShoppingCart size={18} className="mr-2" />
              Add to Cart
            </Button>
          ) : (
            <Button 
              disabled 
              className="w-full bg-gray-200 text-gray-500 cursor-not-allowed"
            >
              Out of Stock
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
