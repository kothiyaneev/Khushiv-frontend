import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white mt-auto">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center">

                    {/* Brand / Copy */}
                    <div className="mb-4 md:mb-0">
                        <h3 className="text-xl font-bold text-indigo-400">KHUSHIV</h3>
                        <p className="text-gray-400 text-sm mt-1">
                            &copy; {new Date().getFullYear()} KHUSHIV. All rights reserved.
                        </p>
                    </div>

                    {/* Links */}
                    <div className="flex space-x-6">
                        <Link href="/about" className="text-gray-300 hover:text-white transition">
                            About Us
                        </Link>
                        <Link href="/contact" className="text-gray-300 hover:text-white transition">
                            Contact
                        </Link>
                        <Link href="/privacy" className="text-gray-300 hover:text-white transition">
                            Privacy Policy
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
