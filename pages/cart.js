import { useContext } from 'react';
import Link from 'next/link';
import CartContext from '../context/CartContext';
import { useRouter } from 'next/router';
import { FaTrash } from 'react-icons/fa';

export default function Cart() {
    const { cartItems, removeFromCart, addToCart, cartTotal } = useContext(CartContext);
    const router = useRouter();

    const checkoutHandler = () => {
        router.push('/checkout');
    };

    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

            {cartItems.length === 0 ? (
                <div className="text-center py-20">
                    <h2 className="text-xl mb-4 text-gray-600">Your cart is empty</h2>
                    <Link href="/products" className="text-indigo-600 hover:text-indigo-800 font-medium text-lg">
                        Go Shopping
                    </Link>
                </div>
            ) : (
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Cart Items List */}
                    <div className="md:w-3/4 space-y-4">
                        {cartItems.map((item) => (
                            <div key={item._id} className="flex items-center justify-between border bg-white p-4 rounded-lg shadow-sm">
                                <div className="flex items-center">
                                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md mr-4" />
                                    <div>
                                        <Link href={`/products/${item._id}`} className="text-lg font-medium text-gray-900 hover:text-indigo-600">
                                            {item.name}
                                        </Link>
                                        <p className="text-gray-500">${item.price}</p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <select
                                        value={item.qty}
                                        onChange={(e) => addToCart(item, Number(e.target.value))}
                                        className="border border-gray-300 rounded-md px-2 py-1 focus:ring-indigo-500 focus:border-indigo-500"
                                    >
                                        {[...Array(item.countInStock > 0 ? item.countInStock : 5).keys()].map((x) => (
                                            <option key={x + 1} value={x + 1}>
                                                {x + 1}
                                            </option>
                                        ))}
                                    </select>

                                    <button
                                        onClick={() => removeFromCart(item._id)}
                                        className="text-red-500 hover:text-red-700 p-2"
                                    >
                                        <FaTrash size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Checkout Summary */}
                    <div className="md:w-1/4">
                        <div className="bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>

                            <div className="flex justify-between py-2 border-b border-gray-200">
                                <span className="text-gray-600">Items</span>
                                <span className="font-medium">{cartItems.reduce((acc, item) => acc + item.qty, 0)}</span>
                            </div>

                            <div className="flex justify-between py-4 font-bold text-lg text-gray-900">
                                <span>Total</span>
                                <span>${cartTotal}</span>
                            </div>

                            <button
                                onClick={checkoutHandler}
                                disabled={cartItems.length === 0}
                                className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed mt-4 font-medium"
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
