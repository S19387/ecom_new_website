import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function EditUserPage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching user data by ID (replace with real API call)
    setTimeout(() => {
      // Mock data for demonstration
      setUser({
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "071-123-4567",
        address: "123 Main St, City, Country",
      });
      setLoading(false);
    }, 500);
  }, [userId]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace with your update logic (e.g., API call)
    alert("User updated!");
    navigate("/dashboard/users");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="text-lg text-gray-500">Loading user data...</span>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white rounded shadow p-6">
      <h2 className="text-2xl font-bold mb-6 text-purple-700">Edit User</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Phone Number</label>
          <input
            type="text"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block font-semibold mb-1">Address</label>
          <input
            type="text"
            name="address"
            value={user.address}
            onChange={handleChange}
            className="border rounded px-3 py-2 w-full"
            required
          />
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-purple-700 text-white px-6 py-2 rounded hover:bg-purple-800 transition"
          >
            Save Changes
          </button>
          <button
            type="button"
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded hover:bg-gray-300 transition"
            onClick={() => navigate("/dashboard/users")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
