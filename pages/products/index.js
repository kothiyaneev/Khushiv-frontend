import { useState, useEffect } from 'react';
import Head from 'next/head';
import api from '../../utils/api';
import ProductCard from '../../components/ProductCard';

export default function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [keyword, setKeyword] = useState('');
    const [price, setPrice] = useState(1000); // Default max price

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const { data } = await api.get(`/products?keyword=${keyword}&maxPrice=${price}`);
                setProducts(data);
                setLoading(false);
            } catch (err) {
                setLoading(false);
            }
        };

        // Debounce search
        const timer = setTimeout(() => {
            fetchProducts();
        }, 500);

        return () => clearTimeout(timer);
    }, [keyword, price]);

    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <Head>
                <title>All Products | KHUSHIV</title>
            </Head>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Shop All Products</h1>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Filters Sidebar */}
                <div className="w-full md:w-1/4">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h3 className="font-semibold text-lg mb-4">Filters</h3>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Max Price: ${price}</label>
                            <input
                                type="range"
                                min="0"
                                max="2000"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="w-full md:w-3/4">
                    {loading ? (
                        <div className="flex justify-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                        </div>
                    ) : products.length === 0 ? (
                        <div className="text-center text-gray-500 py-12">No products found.</div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
