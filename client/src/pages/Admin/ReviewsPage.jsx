import { useState, useEffect } from "react";

// Star rating component (unchanged)
function StarRating({ count }) {
  return (
    <span className="text-yellow-400 flex">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-5 h-5 inline" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z" />
        </svg>
      ))}
    </span>
  );
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    setLoading(true);
    // Replace '/api/reviews' with your actual backend endpoint
    fetch('/api/reviews')
      .then(res => res.json())
      .then(data => {
        setReviews(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-1">Reviews ({reviews.length})</h1>
          <p className="text-gray-500">View your store’s reviews and send follow-ups.</p>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-500 text-sm">28 jan, 2021 - 28 Dec, 2021</span>
        </div>
      </div>

      {/* Table Controls */}
      <div className="flex flex-wrap items-center justify-between mb-2 gap-4">
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <span>0 of {rowsPerPage} row(s) selected.</span>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-gray-500 text-sm">Rows per page</label>
          <select
            value={rowsPerPage}
            onChange={e => setRowsPerPage(Number(e.target.value))}
            className="border rounded px-2 py-1 text-sm"
          >
            {[10, 25, 50].map(num => (
              <option key={num} value={num}>{num}</option>
            ))}
          </select>
          <span className="text-gray-500 text-sm">Page 1 of 32</span>
          <button className="px-2 text-gray-400" disabled>&laquo;</button>
          <button className="px-2 text-gray-400" disabled>&lsaquo;</button>
          <button className="px-2 text-gray-700">&rsaquo;</button>
          <button className="px-2 text-gray-700">&raquo;</button>
        </div>
      </div>

      {/* Table Filters */}
      <div className="flex flex-wrap items-center justify-between mb-4 gap-4">
        <input
          type="text"
          placeholder="Search by name..."
          className="border rounded px-4 py-2 text-sm w-60"
        />
        <select className="border rounded px-4 py-2 text-sm w-32">
          <option>Rating</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow p-2 overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-500 border-b">
              <th className="py-3 px-2">
                <input type="checkbox" />
              </th>
              <th className="py-3 px-2 font-medium">Name</th>
              <th className="py-3 px-2 font-medium">Rating</th>
              <th className="py-3 px-2 font-medium">Order ID</th>
              <th className="py-3 px-2 font-medium">Date Received</th>
              <th className="py-3 px-2 font-medium">Store Response</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center py-8 text-gray-400">
                  Loading...
                </td>
              </tr>
            ) : (
              reviews.map((review, idx) => (
                <tr
                  key={review.id}
                  className="border-b last:border-none hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-2">
                    <input type="checkbox" />
                  </td>
                  <td className="py-3 px-2">{review.name}</td>
                  <td className="py-3 px-2">
                    <StarRating count={review.rating} />
                  </td>
                  <td className="py-3 px-2">{review.orderId}</td>
                  <td className="py-3 px-2">{review.date}</td>
                  <td className="py-3 px-2">
                    {review.responseSent && (
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded font-medium text-xs">
                        Response Sent
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
