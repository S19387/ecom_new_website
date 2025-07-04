import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

// Simulated categories list (should match your main categories)
const initialCategories = [
  { name: "Fashion", image: "https://via.placeholder.com/40?text=Fashion" },
  { name: "Sport Items", image: "https://via.placeholder.com/40?text=Sport" },
  { name: "Medicines", image: "https://via.placeholder.com/40?text=Med" },
  { name: "Gaming Items", image: "https://via.placeholder.com/40?text=Game" },
  { name: "Kitchenware", image: "https://via.placeholder.com/40?text=Kitchen" },
  { name: "Fitness Items", image: "https://via.placeholder.com/40?text=Fitness" },
  { name: "Furnitures", image: "https://via.placeholder.com/40?text=Furniture" },
  { name: "Chevy", image: "https://via.placeholder.com/40?text=Chevy" },
  { name: "Stationery", image: "https://via.placeholder.com/40?text=Stationery" },
];

export default function EditSubCategoryPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Get passed state or use defaults
  const { categoryName, subCategoryName, subCategoryImage } = location.state || {};

  // State for all three fields
  const [mainCategory, setMainCategory] = useState(categoryName || "");
  const [subCategory, setSubCategory] = useState(subCategoryName || "");
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(subCategoryImage || "");

  // For dropdown options
  const [categoryOptions, setCategoryOptions] = useState([]);

  useEffect(() => {
    setCategoryOptions(initialCategories);
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the update logic here (API call, etc.)
    // You have: mainCategory, subCategory, imageFile (or previewImage)
    navigate("/dashboard/category");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Edit Sub Category</h2>
      <form onSubmit={handleSubmit} className="space-y-5">

        {/* 1. Main Category Dropdown */}
        <div>
          <label className="block font-medium mb-1">Main Category</label>
          <select
            value={mainCategory}
            onChange={(e) => setMainCategory(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="">Select Main Category</option>
            {categoryOptions.map((cat) => (
              <option key={cat.name} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* 2. Sub Category Name */}
        <div>
          <label className="block font-medium mb-1">Sub Category Name</label>
          <input
            type="text"
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        {/* 3. Image Upload/Edit */}
        <div>
          <label className="block font-medium mb-1">Image</label>
          <div className="flex items-center space-x-4">
            <div className="w-24 h-24 flex items-center justify-center border rounded bg-gray-100 text-gray-500">
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="object-cover w-full h-full rounded"
                />
              ) : (
                <span>No Image</span>
              )}
            </div>
            <label className="bg-yellow-400 text-white px-4 py-2 rounded cursor-pointer hover:bg-yellow-500">
              Upload Image
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
