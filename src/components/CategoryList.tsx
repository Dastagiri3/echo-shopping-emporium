
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { categories } from '@/data/categories';
import { Category } from '@/types';

const CategoryList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [categoryList, setCategoryList] = useState<Category[]>([]);

  useEffect(() => {
    // Simulate loading data from an API
    const loadCategories = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 300));
      setCategoryList(categories);
      setIsLoading(false);
    };

    loadCategories();
  }, []);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="bg-gray-100 rounded-md h-40 animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50">
      <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {categoryList.map(category => (
          <Link 
            key={category.id} 
            to={`/categories/${category.id}`}
            className="bg-white rounded-md shadow overflow-hidden transform transition-transform hover:-translate-y-1 hover:shadow-md"
          >
            <div className="h-32 overflow-hidden">
              <img 
                src={category.image} 
                alt={category.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-3 text-center font-medium">
              {category.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
