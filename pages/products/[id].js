import { useState, useEffect, useContext } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import api from '../../utils/api';
import CartContext from '../../context/CartContext';

export default function ProductDetail() {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [qty, setQty] = useState(1);
    const router = useRouter();
    const { id } = router.query;
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        if (id) {
            const fetchProduct = async () => {
                try {
                    const { data } = await api.get(`/products/${id}`);
                    setProduct(data);
                    setLoading(false);
                } catch (err) {
                    setLoading(false);
                }
            };
            fetchProduct();
        }
    }, [id]);

    const addToCartHandler = () => {
        addToCart(product, Number(qty));
        router.push('/cart');
    };

    if (loading) return <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;
    if (!product) return <div className="text-center py-20">Product not found</div>;

    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <Head>
                <title>{product.name} | KHUSHIV</title>
            </Head>

            <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
                {/* Image */}
                <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden sm:aspect-w-2 sm:aspect-h-3">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-center object-cover"
                    />
                </div>

                {/* Product Info */}
                <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
                    <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{product.name}</h1>

                    <div className="mt-3">
                        <h2 className="sr-only">Product information</h2>
                        <p className="text-3xl text-gray-900">${product.price}</p>
                    </div>

                    <div className="mt-3">
                        <h3 className="sr-only">Description</h3>
                        <p className="text-base text-gray-700">{product.description}</p>
                    </div>

                    <div className="mt-6 flex items-center">
                        <span className="text-yellow-400 text-xl">★</span>
                        <span className="ml-2 text-gray-600 font-medium">{product.rating} ({product.numReviews} reviews)</span>
                    </div>

                    <div className="mt-6">
                        <p className={`text-sm font-medium ${product.countInStock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                        </p>
                    </div>

                    {/* Add to Cart Section */}
                    {product.countInStock > 0 && (
                        <div className="mt-8 flex items-center space-x-4">
                            <div className="flex items-center border border-gray-300 rounded-md">
                                <button
                                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                                    onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
                                >-</button>
                                <span className="px-4 py-1">{qty}</span>
                                <button
                                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200"
                                    onClick={() => setQty(qty < product.countInStock ? qty + 1 : product.countInStock)}
                                >+</button>
                            </div>

                            <button
                                onClick={addToCartHandler}
                                className="flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Add to Cart
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
