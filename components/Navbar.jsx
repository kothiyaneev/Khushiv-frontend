import Link from 'next/link';
import { useContext, useState } from 'react';
import { FaShoppingCart, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import AuthContext from '../context/AuthContext';
import CartContext from '../context/CartContext';
import { useRouter } from 'next/router';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const { cartItems } = useContext(CartContext);
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    // Calculate total items in cart
    const cartCount = cartItems ? cartItems.reduce((acc, item) => acc + item.qty, 0) : 0;

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        logout();
        setIsOpen(false);
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="text-2xl font-bold text-indigo-600">
                            KHUSHIV
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md font-medium">
                            Home
                        </Link>
                        <Link href="/products" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md font-medium">
                            Products
                        </Link>

                        {/* Cart Icon */}
                        <Link href="/cart" className="relative text-gray-700 hover:text-indigo-600">
                            <FaShoppingCart size={24} />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {/* Auth Links */}
                        {user ? (
                            <div className="flex items-center space-x-4">
                                <span className="text-gray-700">Hi, {user.name}</span>
                                {user.isAdmin && (
                                    <Link href="/admin" className="text-gray-700 hover:text-indigo-600 font-medium">
                                        Admin
                                    </Link>
                                )}
                                <button
                                    onClick={handleLogout}
                                    className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                className="flex items-center text-gray-700 hover:text-indigo-600 font-medium"
                            >
                                <FaUser className="mr-2" /> Login
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMenu}
                            className="text-gray-700 hover:text-indigo-600 focus:outline-none"
                        >
                            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-100">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link
                            href="/"
                            className="block text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md font-medium"
                            onClick={() => setIsOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            href="/products"
                            className="block text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md font-medium"
                            onClick={() => setIsOpen(false)}
                        >
                            Products
                        </Link>
                        <Link
                            href="/cart"
                            className="block text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md font-medium"
                            onClick={() => setIsOpen(false)}
                        >
                            Cart ({cartCount})
                        </Link>

                        {user ? (
                            <>
                                {user.isAdmin && (
                                    <Link
                                        href="/admin"
                                        className="block text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md font-medium"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Admin Dashboard
                                    </Link>
                                )}
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left text-red-600 hover:bg-red-50 px-3 py-2 rounded-md font-medium"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link
                                href="/login"
                                className="block text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md font-medium"
                                onClick={() => setIsOpen(false)}
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
