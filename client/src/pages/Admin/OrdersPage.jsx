import React, { useEffect, useState } from 'react';
import { FaEye, FaTrash, FaPlus, FaDownload, FaFilter } from 'react-icons/fa';
import { SiVisa, SiMastercard, SiPaypal } from 'react-icons/si';
import { useNavigate } from 'react-router-dom';

const paymentIcons = {
  VISA: <SiVisa className="text-blue-700 text-xl" />,
  MASTERCARD: <SiMastercard className="text-red-600 text-xl" />,
  PAYPAL: <SiPaypal className="text-blue-500 text-xl" />,
};

const statusBadge = (status) => {
  if (status === "Paid")
    return <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">Paid</span>;
  if (status === "Pending")
    return <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold">Pending</span>;
  return <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold">{status}</span>;
};

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Mock data for testing
    const mockOrders = [
      {
        order: "ORD12345",
        date: "2025-06-01",
        customer: "John Doe",
        status: "Paid",
        payment: {
          type: "VISA",
          detail: "1234"
        },
        total: "$199.99"
      },
      {
        order: "ORD12346",
        date: "2025-06-02",
        customer: "Jane Smith",
        status: "Pending",
        payment: {
          type: "PAYPAL",
          detail: "abcd"
        },
        total: "$99.50"
      }
    ];
    setOrders(mockOrders);
    setLoading(false);
  }, []);

  const filteredOrders = orders.filter(
    (order) =>
      order.order?.toLowerCase().includes(search.toLowerCase()) ||
      order.customer?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Orders</h2>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg bg-white text-gray-700 hover:bg-gray-50 shadow-sm">
            <FaDownload /> Download
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow-sm">
            <FaPlus /> Add new
          </button>
        </div>
      </div>
      <div className="flex items-center gap-2 mb-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-4 pr-10 py-2 border rounded-lg bg-gray-50 focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <span className="absolute right-3 top-2.5 text-gray-400">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="8" cy="8" r="7" />
              <line x1="12" y1="12" x2="17" y2="17" />
            </svg>
          </span>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border rounded-lg bg-white text-gray-700 hover:bg-gray-50 shadow-sm">
          <FaFilter /> Filter
        </button>
      </div>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="text-gray-500 text-sm border-b">
              <th className="px-6 py-3 text-left font-semibold">ORDER</th>
              <th className="px-6 py-3 text-left font-semibold">DATE</th>
              <th className="px-6 py-3 text-left font-semibold">CUSTOMER</th>
              <th className="px-6 py-3 text-left font-semibold">STATUS</th>
              <th className="px-6 py-3 text-left font-semibold">PAYMENT METHOD</th>
              <th className="px-6 py-3 text-left font-semibold">TOTAL</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-gray-400">
                  Loading orders...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-red-400">
                  {error}
                </td>
              </tr>
            ) : filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-gray-400">
                  No orders found.
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr key={order.order} className="hover:bg-gray-50 border-b">
                  <td className="px-6 py-4 font-bold text-gray-800">{order.order}</td>
                  <td className="px-6 py-4">{order.date}</td>
                  <td className="px-6 py-4">{order.customer}</td>
                  <td className="px-6 py-4">{statusBadge(order.status)}</td>
                  <td className="px-6 py-4 flex items-center gap-2">
                    {paymentIcons[order.payment?.type]}
                    <span className="text-gray-700 text-sm">
                      {order.payment?.type === "PAYPAL"
                        ? `****${order.payment?.detail}`
                        : `•••• ${order.payment?.detail}`}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold">{order.total}</td>
                  <td className="px-6 py-4 flex gap-3">
                    <button
                      className="text-gray-500 hover:text-blue-600"
                      title="View"
                      onClick={() => navigate(`/dashboard/orders/${order.order}`)}
                    >
                      <FaEye />
                    </button>
                    <button className="text-gray-400 hover:text-red-500" title="Delete">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersPage;
