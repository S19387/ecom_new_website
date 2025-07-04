
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddCategoryPage() {
  const navigate = useNavigate();

  const [categoryName, setCategoryName] = useState("");
  const [image, setImage] = useState(null);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement upload logic (e.g., send to backend)
    alert("Category added!");
    navigate("/dashboard/category");
  };

  return (
    <div className="p-6 mt-6 mx-auto max-w-4xl">
      <h2 className="text-2xl font-bold mb-2">Add Category</h2>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        {/* Category Name Input */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Category Name</label>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        {/* Category Image Upload */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold">Category Image</label>
          <div className="border border-dashed border-gray-400 p-6 text-center rounded-lg">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="fileInput"
            />
            <label htmlFor="fileInput" className="cursor-pointer text-gray-600">
              <div className="text-xl mb-2">📷</div>
              <div>Click to upload image or <span className="underline text-blue-600">browse</span></div>
              <small className="text-sm text-gray-500">JPEG, PNG formats supported</small>
            </label>
          </div>

          {image && (
            <div className="mt-4 flex items-center gap-4">
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                className="w-20 h-20 object-cover rounded border"
              />
              <span className="text-sm text-gray-700">{image.name}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-end">
          <button
            type="submit"
            className="bg-pink-500 text-white px-6 py-2 rounded hover:bg-pink-600"
          >
            Add Category
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
