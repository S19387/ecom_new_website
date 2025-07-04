import { FaCheckCircle, FaTimesCircle, FaCreditCard, FaTruck, FaCalendarAlt, FaEdit, FaPrint } from "react-icons/fa";
import { SiVisa } from "react-icons/si";
import { useParams, useNavigate } from "react-router-dom";
import { useRef } from "react";

// Mock data for ORD12345
const mockOrder = {
  orderId: "ORD12345",
  status: "Paid",
  date: "2025-06-01",
  total: "$199.99",
  payment: {
    type: "VISA",
    detail: "1234",
    method: "Credit Card",
  },
  customer: {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 555 123 4567",
    address: "123 Main St, Springfield, USA",
    avatar: "",
  },
  shipping: {
    name: "John Doe",
    address: "123 Main St, Springfield, USA",
    phone: "+1 555 123 4567",
    method: "FedEx Express",
    tracking: "FX123456789",
    cost: "$15.00",
    estimated: "2025-06-05",
  },
  products: [
    {
      id: "P001",
      name: "Spare Tire",
      sku: "ST-001",
      price: "$120.00",
      qty: 1,
      total: "$120.00",
      image: "https://via.placeholder.com/40x40?text=Tire",
    },
    {
      id: "P002",
      name: "Engine Oil",
      sku: "EO-002",
      price: "$39.99",
      qty: 2,
      total: "$79.98",
      image: "https://via.placeholder.com/40x40?text=Oil",
    },
  ],
};

const statusBadge = (status) => {
  if (status === "Paid")
    return (
      <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
        <FaCheckCircle /> Paid
      </span>
    );
  if (status === "Pending")
    return (
      <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold">
        <FaTimesCircle /> Pending
      </span>
    );
  return (
    <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold">
      {status}
    </span>
  );
};

export default function OrderDetailsPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const printRef = useRef();

  // In real app, fetch by orderId. Here, use mock if matches.
  const order = orderId === "ORD12345" ? mockOrder : null;

  // Print handler: prints only the order details section
  const handlePrint = () => {
    if (printRef.current) {
      const printContents = printRef.current.innerHTML;
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload(); // reload to restore app state
    }
  };

  if (!order) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Order Details</h2>
        <div className="text-gray-500">Order not found.</div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-2">
            Order <span className="text-purple-700">{order.orderId}</span>
          </h2>
          <div className="flex items-center gap-3">
            {statusBadge(order.status)}
            <span className="text-gray-400 text-sm">|</span>
            <span className="text-gray-500 text-sm flex items-center gap-1">
              <FaCalendarAlt className="inline" /> {order.date}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            className="px-4 py-2 border rounded-lg bg-white text-gray-700 hover:bg-gray-50 shadow-sm flex items-center gap-2"
            onClick={() => navigate(`/dashboard/orders/edit/${order.orderId}`)}
          >
            <FaEdit /> Edit
          </button>
          <button
            className="px-4 py-2 border rounded-lg bg-white text-gray-700 hover:bg-gray-50 shadow-sm flex items-center gap-2"
            onClick={handlePrint}
          >
            <FaPrint /> Print
          </button>
        </div>
      </div>

      {/* Print Section */}
      <div ref={printRef}>
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4 flex items-center gap-4">
            <div className="bg-purple-100 text-purple-700 p-3 rounded-full">
              <FaCreditCard size={24} />
            </div>
            <div>
              <div className="text-xs text-gray-500">Payment</div>
              <div className="font-bold">
                <span className="inline-flex items-center gap-1">
                  <SiVisa className="text-blue-700" /> {order.payment.type} ****{order.payment.detail}
                </span>
              </div>
              <div className="text-xs text-gray-400">{order.payment.method}</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 flex items-center gap-4">
            <div className="bg-green-100 text-green-700 p-3 rounded-full">
              <FaCheckCircle size={24} />
            </div>
            <div>
              <div className="text-xs text-gray-500">Total</div>
              <div className="font-bold">{order.total}</div>
              <div className="text-xs text-gray-400">{order.status}</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 flex items-center gap-4">
            <div className="bg-blue-100 text-blue-700 p-3 rounded-full">
              <FaTruck size={24} />
            </div>
            <div>
              <div className="text-xs text-gray-500">Shipping</div>
              <div className="font-bold">{order.shipping.method}</div>
              <div className="text-xs text-gray-400">Est. {order.shipping.estimated}</div>
            </div>
          </div>
        </div>

        {/* Two columns: Customer/Shipping & Products */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Customer & Shipping */}
          <div className="col-span-1 flex flex-col gap-4">
            {/* Customer Info */}
            <div className="bg-white rounded-lg shadow p-4">
              <div className="font-semibold mb-2">Customer</div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 text-lg">
                  {order.customer.avatar || order.customer.name[0]}
                </div>
                <div>
                  <div className="font-bold">{order.customer.name}</div>
                  <div className="text-xs text-gray-500">{order.customer.email}</div>
                </div>
              </div>
              <div className="text-xs text-gray-400">{order.customer.phone}</div>
              <div className="text-xs text-gray-400">{order.customer.address}</div>
            </div>
            {/* Shipping Info */}
            <div className="bg-white rounded-lg shadow p-4">
              <div className="font-semibold mb-2">Shipping</div>
              <div className="text-sm font-bold">{order.shipping.name}</div>
              <div className="text-xs text-gray-400 mb-1">{order.shipping.address}</div>
              <div className="text-xs text-gray-400 mb-1">{order.shipping.phone}</div>
              <div className="text-xs text-gray-400 mb-1">Method: {order.shipping.method}</div>
              <div className="text-xs text-gray-400 mb-1">Tracking: {order.shipping.tracking}</div>
              <div className="text-xs text-gray-400">Cost: {order.shipping.cost}</div>
            </div>
          </div>
          {/* Products Table */}
          <div className="col-span-1 md:col-span-2">
            <div className="bg-white rounded-lg shadow p-4">
              <div className="font-semibold mb-2">Products</div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-gray-500 border-b">
                    <th className="py-2 text-left">Product</th>
                    <th className="py-2 text-left">SKU</th>
                    <th className="py-2 text-right">Price</th>
                    <th className="py-2 text-right">Qty</th>
                    <th className="py-2 text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.products.map((prod) => (
                    <tr key={prod.id} className="border-b last:border-none">
                      <td className="py-2 flex items-center gap-2">
                        <img src={prod.image} alt={prod.name} className="w-10 h-10 rounded object-cover" />
                        <span>{prod.name}</span>
                      </td>
                      <td className="py-2">{prod.sku}</td>
                      <td className="py-2 text-right">{prod.price}</td>
                      <td className="py-2 text-right">{prod.qty}</td>
                      <td className="py-2 text-right">{prod.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Order summary */}
              <div className="flex justify-end mt-4">
                <div className="w-full md:w-1/2">
                  <div className="flex justify-between py-1">
                    <span className="text-gray-500">Subtotal</span>
                    <span>$199.98</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-gray-500">Shipping</span>
                    <span>{order.shipping.cost}</span>
                  </div>
                  <div className="flex justify-between py-1 font-bold border-t mt-2 pt-2">
                    <span>Total</span>
                    <span>{order.total}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> {/* End printRef */}
    </div>
  );
}
