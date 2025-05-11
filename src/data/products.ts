
import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    description: 'Experience crystal-clear audio with these comfortable wireless headphones. Features 20-hour battery life, touch controls, and noise cancellation.',
    price: 79.99,
    oldPrice: 99.99,
    rating: 4.5,
    reviewCount: 2547,
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    inStock: true
  },
  {
    id: '2',
    name: 'Smartphone - Latest Model',
    description: 'The latest smartphone featuring a 6.5" AMOLED display, 5G connectivity, 128GB storage, and an advanced camera system.',
    price: 899.99,
    rating: 4.8,
    reviewCount: 1243,
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02ff9?auto=format&fit=crop&w=600&q=80',
    inStock: true
  },
  {
    id: '3',
    name: 'Smart Fitness Watch',
    description: 'Track your fitness goals with this waterproof smart watch. Monitors heart rate, sleep, steps, and includes GPS tracking.',
    price: 149.99,
    oldPrice: 199.99,
    rating: 4.6,
    reviewCount: 958,
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=600&q=80',
    inStock: true
  },
  {
    id: '4',
    name: 'Ergonomic Office Chair',
    description: 'Comfortable ergonomic chair with adjustable height, lumbar support, and breathable mesh back for your home office.',
    price: 199.99,
    rating: 4.2,
    reviewCount: 647,
    category: 'home',
    image: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?auto=format&fit=crop&w=600&q=80',
    inStock: true
  },
  {
    id: '5',
    name: 'Stainless Steel Water Bottle',
    description: 'Keep your drinks hot or cold for up to 24 hours with this vacuum-insulated stainless steel water bottle.',
    price: 24.99,
    rating: 4.7,
    reviewCount: 2103,
    category: 'kitchen',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80',
    inStock: true
  },
  {
    id: '6',
    name: 'Smart Home Security Camera',
    description: 'HD security camera with motion detection, two-way audio, night vision, and cloud storage for your home security needs.',
    price: 89.99,
    oldPrice: 119.99,
    rating: 4.4,
    reviewCount: 872,
    category: 'electronics',
    image: 'https://images.unsplash.com/photo-1558000143-a78f8299c0b5?auto=format&fit=crop&w=600&q=80',
    inStock: true
  },
  {
    id: '7',
    name: 'Organic Cotton T-Shirt',
    description: 'Comfortable, eco-friendly t-shirt made from 100% organic cotton with a classic fit.',
    price: 19.99,
    rating: 4.3,
    reviewCount: 492,
    category: 'clothing',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80',
    inStock: true
  },
  {
    id: '8',
    name: 'Cast Iron Dutch Oven',
    description: 'Versatile enameled cast iron dutch oven perfect for slow cooking, baking, and more. Suitable for all cooking surfaces.',
    price: 89.99,
    rating: 4.9,
    reviewCount: 1078,
    category: 'kitchen',
    image: 'https://images.unsplash.com/photo-1585837575652-267c041d77d4?auto=format&fit=crop&w=600&q=80',
    inStock: false
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return products.slice(0, 4);
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(
    product => 
      product.name.toLowerCase().includes(lowercaseQuery) || 
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.category.toLowerCase().includes(lowercaseQuery)
  );
};
