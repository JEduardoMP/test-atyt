import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import ProductList from './components/ProductList';
import ProductDetails from './components/ProductDetails';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { Product } from './types/Product';

interface Props {
  setChangeToProductSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductSearch: React.FC<Props> = ({ setChangeToProductSearch }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch {
        setError('An error occurred while fetching products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter(product =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [searchQuery, products]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleProductSelect = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch product details');
      }
      const data = await response.json();
      setSelectedProduct(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(`An error occurred while fetching product details: ${err.message}. Please try again later.`);
      } else {
        setError('An unknown error occurred while fetching product details. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading && products.length === 0) return <LoadingSpinner />;
  if (error && products.length === 0) return <ErrorMessage message={error} />;

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => setChangeToProductSearch(false)}
        className='mb-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        Change to User Dashboard
      </button>
      <h1 className="text-3xl font-bold mb-6">Product Search and Details</h1>
      <SearchBar onSearch={handleSearch} />
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2">
          <ProductList
            products={currentProducts}
            onProductSelect={handleProductSelect}
          />
          <div className="mt-4 flex justify-center">
            {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }, (_, i) => (
              <button
                key={i}
                onClick={() => paginate(i + 1)}
                className={`mx-1 px-3 py-1 border rounded ${
                  currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
        <div className="w-full md:w-1/2">
          {selectedProduct && <ProductDetails product={selectedProduct} />}
        </div>
      </div>
    </div>
  );
};

export default ProductSearch;
