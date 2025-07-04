import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

const initialCategories = [
  {
    name: "Fashion",
    image: "https://via.placeholder.com/40?text=Fashion",
    subCategories: ["T-shirts", "Trousers", "Blouse / Tops", "Skirts"],
  },
  {
    name: "Sport Items",
    image: "https://via.placeholder.com/40?text=Sport",
    subCategories: [],
  },
  {
    name: "Medicines",
    image: "https://via.placeholder.com/40?text=Med",
    subCategories: [],
  },
  {
    name: "Gaming Items",
    image: "https://via.placeholder.com/40?text=Game",
    subCategories: [],
  },
  {
    name: "Kitchenware",
    image: "https://via.placeholder.com/40?text=Kitchen",
    subCategories: [],
  },
  {
    name: "Fitness Items",
    image: "https://via.placeholder.com/40?text=Fitness",
    subCategories: [],
  },
  {
    name: "Furnitures",
    image: "https://via.placeholder.com/40?text=Furniture",
    subCategories: [],
  },
  {
    name: "Chevy",
    image: "https://via.placeholder.com/40?text=Chevy",
    subCategories: [],
  },
  {
    name: "Stationery",
    image: "https://via.placeholder.com/40?text=Stationery",
    subCategories: [],
  },
];

export default function CategoryPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [categories, setCategories] = useState(initialCategories);
  const [selectedCategory, setSelectedCategory] = useState("Fashion");

  useEffect(() => {
    const addedSubCategory = location.state?.newSubCategory;
    const categoryToUpdate = location.state?.categoryName;

    if (addedSubCategory && categoryToUpdate) {
      const updatedCategories = categories.map((cat) =>
        cat.name === categoryToUpdate
          ? {
              ...cat,
              subCategories: [...cat.subCategories, addedSubCategory],
            }
          : cat
      );
      setCategories(updatedCategories);

      // Clear the state so it doesn't keep triggering
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, categories, navigate, location.pathname]);

  const selected = categories.find((cat) => cat.name === selectedCategory);

  return (
    <div className="flex gap-6">
      {/* Left: Category List */}
      <div className="flex-1 bg-white rounded-2xl p-6 shadow">
        <div className="flex justify-between items-center mb-4">
          <div className="relative w-1/2">
            <input
              type="text"
              placeholder="Search"
              className="w-full border rounded px-3 py-2 text-sm pl-8"
            />
            <span className="absolute left-2 top-2 text-gray-400">
              <svg
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
          </div>
          <button
            onClick={() => navigate("/dashboard/category/add")}
            className="bg-pink-500 text-white px-6 py-2 rounded font-semibold"
          >
            ADD
          </button>
        </div>
        <ul className="space-y-3">
          {categories.map((cat) => (
            <li
              key={cat.name}
              className={`flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition cursor-pointer ${
                selectedCategory === cat.name ? "bg-gray-100" : ""
              }`}
              onClick={() => setSelectedCategory(cat.name)}
            >
              <div className="flex items-center gap-3">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-10 h-10 rounded-md object-cover"
                />
                <div className="font-semibold">{cat.name}</div>
              </div>
              <div className="flex gap-3 text-gray-500 z-10">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate("/dashboard/category/edit", {
                      state: { categoryName: cat.name, categoryImage: cat.image },
                    });
                  }}
                >
                  <FaEdit />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("Delete", cat.name);
                  }}
                >
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Right: Sub Category Section */}
      <div className="flex-1 bg-white rounded-2xl p-6 shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Sub Category</h2>
          <button
            onClick={() =>
              navigate("/dashboard/category/addsub", {
                state: { categoryName: selectedCategory },
              })
            }
            className="bg-pink-500 text-white px-6 py-2 rounded font-semibold"
          >
            ADD
          </button>
        </div>

        {/* Top: Main Category Selection */}
        <select
          className="w-full border rounded px-3 py-2 mb-4"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat.name} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* Subcategory List */}
        {selected?.subCategories?.length > 0 ? (
          selected.subCategories.map((item, index) => (
            <div
              key={`${item}-${index}`}
              className="flex items-center gap-4 mb-3 border rounded px-3 py-2"
            >
              <img
                src={`https://via.placeholder.com/40?text=${encodeURIComponent(item)}`}
                alt={item}
                className="w-10 h-10 rounded object-cover"
              />
              <span className="font-medium flex-1">{item}</span>

              <button
                className="text-gray-500 hover:text-black"
                onClick={() =>
                  navigate("/dashboard/category/editsub", {
                    state: {
                      categoryName: selectedCategory,
                      subCategoryName: item,
                      subCategoryImage: `https://via.placeholder.com/40?text=${encodeURIComponent(item)}`,
                    },
                  })
                }
              >
                EDIT
              </button>
              <button
                className="text-gray-500 hover:text-red-600"
                onClick={() => {
                  const updatedCategories = categories.map((cat) => {
                    if (cat.name === selectedCategory) {
                      return {
                        ...cat,
                        subCategories: cat.subCategories.filter((sub) => sub !== item),
                      };
                    }
                    return cat;
                  });
                  setCategories(updatedCategories);
                }}
              >
                DELETE
              </button>
            </div>
          ))
        ) : (
          <div className="text-sm text-gray-500 italic">No subcategories.</div>
        )}
      </div>
    </div>
  );
}
