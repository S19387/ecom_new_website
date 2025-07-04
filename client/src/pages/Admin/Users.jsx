import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Newest");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, [sort]);

  const fetchUsers = () => {
    setLoading(true);
    // Mock user data
    let data = [
      {
        id: 1,
        name: "John Doe",
        role: "Admin",
        phone: "071-123-4567",
        email: "john.doe@example.com",
      },
    ];

    if (sort === "Oldest") {
      data = data.slice().reverse();
    }

    setUsers(data);
    setLoading(false);
  };

  const handleDelete = (id) => {
    alert(`Delete user with ID ${id}`);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Header with Add User Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Users</h1>
        <div className="flex gap-2">
          <input
            type="text"
            value="28 Jan, 2021 - 28 Dec, 2021"
            readOnly
            className="border rounded px-3 py-1 text-sm bg-white"
          />
          <button
            className="bg-purple-700 text-white px-4 py-1 rounded hover:bg-purple-800 transition"
            onClick={() => navigate("/concepts/customers/customer-add")}
          >
            Add User
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl font-bold text-purple-700">All Users</h2>
            <p className="text-sm text-gray-400">Active Members</p>
          </div>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Search"
              className="border rounded px-3 py-1 text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              className="border rounded px-3 py-1 text-sm"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option>Newest</option>
              <option>Oldest</option>
            </select>
          </div>
        </div>

        {loading ? (
          <p className="text-center py-10">Loading users...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-purple-700">
                  <th className="py-2 font-medium">User Name</th>
                  <th className="font-medium">Role</th>
                  <th className="font-medium">Phone Number</th>
                  <th className="font-medium">Email</th>
                  <th className="font-medium">Edit</th>
                  <th className="font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, idx) => (
                  <tr className="border-b last:border-none" key={idx}>
                    <td className="py-2">{user.name}</td>
                    <td>{user.role}</td>
                    <td>{user.phone}</td>
                    <td>{user.email}</td>
                    <td>
                      <button
                        className="text-blue-500 hover:underline"
                        onClick={() =>
                          navigate(`/dashboard/users/edit/`+user.id)
                        }
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        className="bg-blue-100 text-blue-700 px-3 py-1 rounded"
                        onClick={() => handleDelete(user.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
          <span>
            Showing data {filteredUsers.length > 0 ? "1" : "0"} to {filteredUsers.length} of{" "}
            {users.length} entries
          </span>
          <div className="flex gap-1">
            <button className="px-2 py-1 rounded bg-gray-100 text-gray-400" disabled>
              &lt;
            </button>
            <button className="px-2 py-1 rounded bg-purple-700 text-white">1</button>
            <button className="px-2 py-1 rounded hover:bg-purple-100">2</button>
            <button className="px-2 py-1 rounded hover:bg-purple-100">3</button>
            <span>...</span>
            <button className="px-2 py-1 rounded hover:bg-purple-100">40</button>
            <button className="px-2 py-1 rounded bg-gray-100 text-gray-400" disabled>
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
