import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productSlice";
import Carousel from "../components/Carousel";
import ProductCard from "../components/ProductCard";
import { Listbox } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export default function ShopPage() {
  const dispatch = useDispatch();
const { items: products, loading, error } = useSelector((state) => state.products);
  const images = [
    "/Paste.png",
    "/Paste.png",
    "/public/Paste.png",
  ];

  const categories = ["All", "Living Room", "Bedroom", "Kitchen"];
  const prices = ["All Price", "Under $100", "$100 - $300"];
  const sortOptions = ["Featured", "Price: Low to High", "Price: High to Low"];

  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [selectedPrice, setSelectedPrice] = useState(prices[0]);
  const [selectedSort, setSelectedSort] = useState(sortOptions[0]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Filter and sort logic
  let filtered = Array.isArray(products) ? [...products] : [];

console.log(filtered)
  if (selectedCategory !== "All") {
    filtered = filtered.filter((p) => p.category === selectedCategory);
  }

  if (selectedPrice === "Under $100") {
    filtered = filtered.filter((p) => p.price < 100);
  } else if (selectedPrice === "$100 - $300") {
    filtered = filtered.filter((p) => p.price >= 100 && p.price <= 300);
  }

  if (selectedSort === "Price: Low to High") {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else if (selectedSort === "Price: High to Low") {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  }

  return (
    <div className="bg-white text-gray-800">
      {/* Carousel */}
      <div className="lg:px-10">
        <Carousel images={images} />
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 mt-10 flex flex-wrap gap-6 items-end">
        {/* Category Filter */}
        <FilterDropdown
          label="Categories"
          options={categories}
          selected={selectedCategory}
          onChange={setSelectedCategory}
        />

        {/* Price Filter */}
        <FilterDropdown
          label="Price"
          options={prices}
          selected={selectedPrice}
          onChange={setSelectedPrice}
        />

        {/* Sort Filter */}
        <FilterDropdown
          label="Sort by"
          options={sortOptions}
          selected={selectedSort}
          onChange={setSelectedSort}
          className="ml-auto hidden lg:block"
        />
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {loading && <p className="text-gray-600 col-span-full text-center">Loading...</p>}
        {error && <p className="text-red-500 col-span-full text-center">Error: {error}</p>}
        {!loading && !error && filtered.length === 0 && (
          <p className="text-gray-500 col-span-full text-center">No products found</p>
        )}
        {!loading &&
          !error &&
          filtered.map((product) => (
            <ProductCard
              key={product._id}
              title={product.name}
              price={product.price}
              originalPrice={product.originalPrice}
              image={product.image[0]}
              isNew={product.isNew}
            />
          ))}
      </div>

      {/* Show More Button */}
      <div className="flex justify-center mt-4 mb-12">
        <button className="px-6 py-2 border border-gray-700 text-sm font-medium rounded-full hover:bg-black hover:text-white transition">
          Show more
        </button>
      </div>
    </div>
  );
}

// Reusable Filter Dropdown component
function FilterDropdown({ label, options, selected, onChange, className = "" }) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <Listbox value={selected} onChange={onChange}>
        <div className="relative w-48">
          <Listbox.Button className="border border-gray-300 rounded-md px-4 py-2 w-full text-left text-sm flex justify-between items-center">
            {selected}
            <ChevronDownIcon className="w-4 h-4 ml-2 text-gray-500" />
          </Listbox.Button>
          <Listbox.Options className="absolute z-10 mt-1 w-full border bg-white shadow-md rounded-md text-sm">
            {options.map((option, i) => (
              <Listbox.Option
                key={i}
                value={option}
                className={({ active }) =>
                  `cursor-pointer px-4 py-2 ${active ? "bg-black text-white" : "text-gray-800"}`
                }
              >
                {option}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
}
