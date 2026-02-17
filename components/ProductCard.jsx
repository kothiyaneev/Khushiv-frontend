import Link from 'next/link';

const ProductCard = ({ product }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <Link href={`/products/${product._id}`}>
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                />
            </Link>
            <div className="p-4">
                <Link href={`/products/${product._id}`}>
                    <h2 className="text-lg font-semibold text-gray-800 hover:text-indigo-600 mb-2 truncate">
                        {product.name}
                    </h2>
                </Link>

                {/* Rating Star Placeholder */}
                <div className="flex items-center mb-2">
                    <span className="text-yellow-400">★</span>
                    <span className="ml-1 text-sm text-gray-600">{product.rating} ({product.numReviews} reviews)</span>
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-900">${product.price}</span>
                    <Link
                        href={`/products/${product._id}`}
                        className="bg-indigo-600 text-white px-3 py-1 rounded-md text-sm hover:bg-indigo-700 transition"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
