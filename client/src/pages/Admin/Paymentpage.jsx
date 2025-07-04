import React, { useEffect, useState } from "react";

export default function Paymentpage() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate fetching from backend
  useEffect(() => {
    setLoading(true);
    // Simulate API call with setTimeout
    setTimeout(() => {
      setPayments([
        {
          description: "1 blue shirt",
          paymentBy: "Paypal",
          amount: "9,387",
          orderDate: "16/1/25",
          orderId: 4,
          status: "Confirm",
        },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Payments</h1>
        <input
          type="text"
          value="28 Jan, 2021 - 28 Dec, 2021"
          readOnly
          className="border rounded px-3 py-1 text-sm bg-white"
        />
      </div>
      <div className="bg-white rounded-2xl shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-purple-700">All Payments</h2>
          <div className="flex gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="border rounded px-4 py-1 text-sm pl-10"
              />
              <span className="absolute left-3 top-2 text-gray-400">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </span>
            </div>
            <select className="border rounded px-3 py-1 text-sm">
              <option>Newest</option>
              <option>Oldest</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-purple-700">
                <th className="py-2 font-medium">Description</th>
                <th className="font-medium">Payment By</th>
                <th className="font-medium">Amount($)</th>
                <th className="font-medium">Order Date</th>
                <th className="font-medium">Order Id</th>
                <th className="font-medium">Status</th>
                <th className="font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-gray-400">
                    Loading...
                  </td>
                </tr>
              ) : (
                payments.map((p, idx) => (
                  <tr className="border-b last:border-none" key={idx}>
                    <td className="py-2">{p.description}</td>
                    <td>{p.paymentBy}</td>
                    <td>{p.amount}</td>
                    <td>{p.orderDate}</td>
                    <td>{p.orderId}</td>
                    <td>
                      <button className="bg-gradient-to-r from-purple-400 to-pink-400 text-white px-4 py-1 rounded-full font-medium shadow hover:opacity-90">
                        {p.status}
                      </button>
                    </td>
                    <td>
                      <button className="bg-gradient-to-r from-pink-400 to-purple-400 text-white px-4 py-1 rounded-full font-medium shadow hover:opacity-90">
                        Refund
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
          <span>Showing data 1 to {payments.length} of {payments.length} entries</span>
          <div className="flex gap-1">
            <button className="px-2 py-1 rounded bg-gray-100 text-gray-400" disabled>&lt;</button>
            <button className="px-2 py-1 rounded bg-purple-700 text-white">1</button>
            <button className="px-2 py-1 rounded hover:bg-purple-100">2</button>
            <button className="px-2 py-1 rounded hover:bg-purple-100">3</button>
            <button className="px-2 py-1 rounded hover:bg-purple-100">4</button>
            <span>...</span>
            <button className="px-2 py-1 rounded hover:bg-purple-100">40</button>
            <button className="px-2 py-1 rounded bg-gray-100 text-gray-400" disabled>&gt;</button>
          </div>
        </div>
      </div>
    </div>
  );
}
