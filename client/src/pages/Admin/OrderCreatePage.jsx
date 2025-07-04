import React, { useState } from "react";
import { FaPlus, FaTrash, FaCreditCard, FaTruck, FaUser, FaDollarSign } from "react-icons/fa";
import { SiVisa, SiMastercard, SiPaypal } from "react-icons/si";

const paymentOptions = [
  { label: "Visa", value: "VISA", icon: <SiVisa className="text-blue-700" /> },
  { label: "Mastercard", value: "MASTERCARD", icon: <SiMastercard className="text-red-600" /> },
  { label: "PayPal", value: "PAYPAL", icon: <SiPaypal className="text-blue-500" /> },
];

const initialProduct = { name: "", sku: "", price: "", qty: 1 };

export default function OrderCreatePage() {
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [shipping, setShipping] = useState({
    method: "",
    address: "",
    cost: "",
    tracking: "",
    estimated: "",
  });
  const [products, setProducts] = useState([{ ...initialProduct }]);
  const [payment, setPayment] = useState({
    type: "VISA",
    detail: "",
  });
  const [submitting, setSubmitting] = useState(false);

  // Calculate totals
  const subtotal = products.reduce((sum, p) => sum + (parseFloat(p.price || 0) * parseInt(p.qty || 1)), 0);
  const shippingCost = parseFloat(shipping.cost || 0);
  const total = subtotal + shippingCost;

  // Handlers
  const handleProductChange = (idx, field, value) => {
    setProducts((prev) =>
      prev.map((p, i) => (i === idx ? { ...p, [field]: value } : p))
    );
  };

  const addProduct = () => setProducts([...products, { ...initialProduct }]);
  const removeProduct = (idx) =>
    setProducts(products.length > 1 ? products.filter((_, i) => i !== idx) : products);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    // Compose order object
    const orderData = {
      customer,
      shipping,
      products,
      payment,
      subtotal,
      shippingCost,
      total,
    };

    // Simulate API call
    setTimeout(() => {
      alert("Order Created!\n\n" + JSON.stringify(orderData, null, 2));
      setSubmitting(false);
      // Optionally, redirect to order list or details page here
    }, 1000);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Create Order</h2>
      <form className="space-y-8" onSubmit={handleSubmit}>
        {/* Customer Info */}
        <section className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-2 mb-4">
            <FaUser className="text-purple-700" />
            <span className="font-semibold text-lg">Customer Information</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              className="border rounded px-3 py-2"
              placeholder="Full Name"
              value={customer.name}
              onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
              required
            />
            <input
              className="border rounded px-3 py-2"
              placeholder="Email"
              type="email"
              value={customer.email}
              onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
              required
            />
            <input
              className="border rounded px-3 py-2"
              placeholder="Phone"
              value={customer.phone}
              onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
              required
            />
            <input
              className="border rounded px-3 py-2"
              placeholder="Address"
              value={customer.address}
              onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
              required
            />
          </div>
        </section>

        {/* Shipping Info */}
        <section className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-2 mb-4">
            <FaTruck className="text-purple-700" />
            <span className="font-semibold text-lg">Shipping Information</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              className="border rounded px-3 py-2"
              placeholder="Shipping Method"
              value={shipping.method}
              onChange={(e) => setShipping({ ...shipping, method: e.target.value })}
              required
            />
            <input
              className="border rounded px-3 py-2"
              placeholder="Shipping Address"
              value={shipping.address}
              onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
              required
            />
            <input
              className="border rounded px-3 py-2"
              placeholder="Shipping Cost"
              type="number"
              min="0"
              value={shipping.cost}
              onChange={(e) => setShipping({ ...shipping, cost: e.target.value })}
              required
            />
            <input
              className="border rounded px-3 py-2"
              placeholder="Tracking Number"
              value={shipping.tracking}
              onChange={(e) => setShipping({ ...shipping, tracking: e.target.value })}
            />
            <input
              className="border rounded px-3 py-2"
              placeholder="Estimated Delivery"
              type="date"
              value={shipping.estimated}
              onChange={(e) => setShipping({ ...shipping, estimated: e.target.value })}
            />
          </div>
        </section>

        {/* Products */}
        <section className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-2 mb-4">
            <FaPlus className="text-purple-700" />
            <span className="font-semibold text-lg">Products</span>
          </div>
          <div className="space-y-4">
            {products.map((prod, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-5 gap-2 items-center">
                <input
                  className="border rounded px-3 py-2"
                  placeholder="Product Name"
                  value={prod.name}
                  onChange={(e) => handleProductChange(idx, "name", e.target.value)}
                  required
                />
                <input
                  className="border rounded px-3 py-2"
                  placeholder="SKU"
                  value={prod.sku}
                  onChange={(e) => handleProductChange(idx, "sku", e.target.value)}
                />
                <input
                  className="border rounded px-3 py-2"
                  placeholder="Price"
                  type="number"
                  min="0"
                  value={prod.price}
                  onChange={(e) => handleProductChange(idx, "price", e.target.value)}
                  required
                />
                <input
                  className="border rounded px-3 py-2"
                  placeholder="Quantity"
                  type="number"
                  min="1"
                  value={prod.qty}
                  onChange={(e) => handleProductChange(idx, "qty", e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="text-red-500 hover:text-red-700 flex items-center justify-center"
                  onClick={() => removeProduct(idx)}
                  title="Remove Product"
                  disabled={products.length === 1}
                >
                  <FaTrash />
                </button>
              </div>
            ))}
            <button
              type="button"
              className="mt-2 px-4 py-2 bg-purple-100 text-purple-700 rounded hover:bg-purple-200 flex items-center gap-2"
              onClick={addProduct}
            >
              <FaPlus /> Add Product
            </button>
          </div>
        </section>

        {/* Payment Info */}
        <section className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-2 mb-4">
            <FaCreditCard className="text-purple-700" />
            <span className="font-semibold text-lg">Payment</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div className="flex gap-4">
              {paymentOptions.map((opt) => (
                <label key={opt.value} className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    name="paymentType"
                    value={opt.value}
                    checked={payment.type === opt.value}
                    onChange={() => setPayment({ ...payment, type: opt.value })}
                  />
                  {opt.icon}
                  <span className="text-sm">{opt.label}</span>
                </label>
              ))}
            </div>
            <input
              className="border rounded px-3 py-2"
              placeholder={
                payment.type === "PAYPAL"
                  ? "PayPal Email"
                  : "Card Last 4 Digits"
              }
              value={payment.detail}
              onChange={(e) => setPayment({ ...payment, detail: e.target.value })}
              required
            />
          </div>
        </section>

        {/* Order Summary & Submit */}
        <section className="bg-white rounded-lg shadow p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex gap-2 items-center text-lg font-semibold mb-2">
              <FaDollarSign className="text-green-600" />
              Order Summary
            </div>
            <div className="text-sm text-gray-500">Subtotal: <span className="font-bold text-gray-700">${subtotal.toFixed(2)}</span></div>
            <div className="text-sm text-gray-500">Shipping: <span className="font-bold text-gray-700">${shippingCost.toFixed(2)}</span></div>
            <div className="text-lg font-bold text-purple-700 mt-2">Total: ${total.toFixed(2)}</div>
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-purple-700 text-white rounded-lg font-bold text-lg hover:bg-purple-800 transition disabled:opacity-50"
            disabled={submitting}
          >
            {submitting ? "Creating..." : "Create Order"}
          </button>
        </section>
      </form>
    </div>
  );
}
