import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import api from '../utils/api';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get('/products');
        setProducts(data.slice(0, 6)); // Show only first 6 products as "Featured"
        setLoading(false);
      } catch (err) {
        // If backend is down or returns error
        setError(err.response && err.response.data.message ? err.response.data.message : err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <Head>
        <title>KHUSHIV | Best E-Commerce Store</title>
        <meta name="description" content="Shop the best products at the best prices." />
      </Head>

      {/* Hero Section */}
      <div className="bg-indigo-600 text-white py-20 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to KHUSHIV</h1>
        <p className="text-lg md:text-xl mb-8">Discover amazing products at unbeatable prices.</p>
        <Link
          href="/products"
          className="bg-white text-indigo-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition shadow-lg"
        >
          Shop Now
        </Link>
      </div>

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Featured Products</h2>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
