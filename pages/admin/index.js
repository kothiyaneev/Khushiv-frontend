import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import AuthContext from '../../context/AuthContext';
import api from '../../utils/api';
import Head from 'next/head';

export default function AdminDashboard() {
    const { user } = useContext(AuthContext);
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('products');
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user || !user.isAdmin) {
            router.push('/');
        } else {
            fetchData();
        }
    }, [user, router]);

    const fetchData = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            const { data: productsData } = await api.get('/products'); // We need an admin endpoint ideally or just filter? 
            // Actually, our getProducts is public but returns all. Admin might need pagination but for now ok.
            // Wait, we need orders too.
            const { data: ordersData } = await api.get('/orders', config);

            setProducts(productsData);
            setOrders(ordersData);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const deleteProductHandler = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                const config = { headers: { Authorization: `Bearer ${user.token}` } };
                await api.delete(`/products/${id}`, config);
                fetchData(); // Refresh
            } catch (error) {
                alert('Failed to delete');
            }
        }
    };

    const createProductHandler = async () => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await api.post(`/products`, {}, config); // Creates sample
            fetchData(); // Refresh
        } catch (error) {
            alert('Failed to create');
        }
    };

    const deliverHandler = async (id) => {
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await api.put(`/orders/${id}/deliver`, {}, config);
            fetchData();
        } catch (error) {
            alert('Failed to update');
        }
    };

    if (loading) return <div className="text-center py-20">Loading Dashboard...</div>;

    return (
        <div className="max-w-7xl mx-auto py-10 px-4">
            <Head><title>Admin Dashboard | KHUSHIV</title></Head>
            <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

            <div className="flex space-x-4 mb-8">
                <button
                    className={`px-4 py-2 rounded ${activeTab === 'products' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
                    onClick={() => setActiveTab('products')}
                >Products</button>
                <button
                    className={`px-4 py-2 rounded ${activeTab === 'orders' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
                    onClick={() => setActiveTab('orders')}
                >Orders</button>
            </div>

            {activeTab === 'products' ? (
                <div>
                    <div className="flex justify-between mb-4">
                        <h2 className="text-xl font-bold">Product List</h2>
                        <button onClick={createProductHandler} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">+ Create Product</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="py-2 px-4 border text-left">ID</th>
                                    <th className="py-2 px-4 border text-left">NAME</th>
                                    <th className="py-2 px-4 border text-left">PRICE</th>
                                    <th className="py-2 px-4 border text-left">CATEGORY</th>
                                    <th className="py-2 px-4 border text-left">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(product => (
                                    <tr key={product._id} className="border-t">
                                        <td className="py-2 px-4">{product._id.substring(0, 10)}...</td>
                                        <td className="py-2 px-4">{product.name}</td>
                                        <td className="py-2 px-4">${product.price}</td>
                                        <td className="py-2 px-4">{product.category}</td>
                                        <td className="py-2 px-4 flex space-x-2">
                                            {/* Edit would go to a separate page, for now just placeholder */}
                                            <button className="text-blue-600 hover:text-blue-800" onClick={() => alert('Edit feature to be implemented completely in a real app')}>Edit</button>
                                            <button className="text-red-600 hover:text-red-800" onClick={() => deleteProductHandler(product._id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div>
                    <h2 className="text-xl font-bold mb-4">Order List</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="py-2 px-4 border text-left">ID</th>
                                    <th className="py-2 px-4 border text-left">USER</th>
                                    <th className="py-2 px-4 border text-left">DATE</th>
                                    <th className="py-2 px-4 border text-left">TOTAL</th>
                                    <th className="py-2 px-4 border text-left">PAID</th>
                                    <th className="py-2 px-4 border text-left">DELIVERED</th>
                                    <th className="py-2 px-4 border text-left">ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => (
                                    <tr key={order._id} className="border-t">
                                        <td className="py-2 px-4">{order._id.substring(0, 10)}...</td>
                                        <td className="py-2 px-4">{order.user && order.user.name}</td>
                                        <td className="py-2 px-4">{order.createdAt.substring(0, 10)}</td>
                                        <td className="py-2 px-4">${order.totalPrice}</td>
                                        <td className="py-2 px-4">
                                            {order.isPaid ? <span className="text-green-600">Yes</span> : <span className="text-red-600">No</span>}
                                        </td>
                                        <td className="py-2 px-4">
                                            {order.isDelivered ? <span className="text-green-600">Yes</span> : <span className="text-red-600">No</span>}
                                        </td>
                                        <td className="py-2 px-4">
                                            {!order.isDelivered && (
                                                <button onClick={() => deliverHandler(order._id)} className="text-indigo-600 hover:text-indigo-900 border border-indigo-600 px-2 rounded">Mark Delivered</button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
