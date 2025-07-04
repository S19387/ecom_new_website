import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function EditCategoryPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { categoryName, categoryImage } = location.state || {};

  const [name, setName] = useState(categoryName || "");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(categoryImage || "");

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(image);
    }
  }, [image]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call backend to update category
    alert("Category updated!");
    navigate("/dashboard/category");
  };

  return (
    <div className="p-6 mt-6 mx-auto max-w-3xl bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Edit Category</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Category Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-semibold">Category Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-3 w-32 h-32 object-cover rounded"
            />
          )}
        </div>

        <div className="flex gap-4 justify-end mt-6">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => navigate("/dashboard/category")}
            className="border border-gray-400 text-gray-700 px-6 py-2 rounded hover:bg-gray-100"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
