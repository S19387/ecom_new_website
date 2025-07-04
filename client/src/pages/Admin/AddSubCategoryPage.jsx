import { useState } from "react";

export default function AddSubCategoryPage() {
  const [subCategoryName, setSubCategoryName] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Example categories; replace with dynamic data as needed
  const categories = [
    { value: "", label: "Select Category" },
    { value: "flour", label: "Flour" },
    { value: "snacks", label: "Snacks" },
    // Add more categories as needed
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement submission logic (e.g., API call)
    console.log("Subcategory Name:", subCategoryName);
    console.log("Selected Image:", selectedImage);
    console.log("Selected Category:", selectedCategory);
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow mt-10">
      <h2 className="text-xl font-bold mb-4">Add Sub Category</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Name</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={subCategoryName}
            onChange={(e) => setSubCategoryName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Image</label>
          <div className="flex items-center space-x-4">
            <div className="w-28 h-28 bg-gray-100 flex items-center justify-center border rounded">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded" />
              ) : (
                <span className="text-gray-400">No Image</span>
              )}
            </div>
            <label>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              <span className="bg-yellow-400 text-black px-4 py-2 rounded cursor-pointer font-semibold">
                Upload Image
              </span>
            </label>
          </div>
        </div>
        <div>
          <label className="block font-semibold mb-1">Select Category</label>
          <select
            className="w-full border px-3 py-2 rounded"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            required
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-gray-400 text-black px-6 py-2 rounded font-semibold"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
