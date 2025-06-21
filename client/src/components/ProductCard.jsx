import { FiStar } from "react-icons/fi";

export default function ProductCard({
  title = "Product Title",
  image = "",
  price = 49.99,
  originalPrice,
  isNew = false,
}) {
  return (
    <div className="group relative overflow-hidden bg-[#F3F5F7] rounded-md shadow-sm">
      
      {/* Badge */}
      {isNew && (
        <span className="absolute top-3 left-3 bg-black text-white text-xs font-medium px-2 py-1 rounded">
          NEW
        </span>
      )}

      {/* Product Image */}
      <div className="overflow-hidden">
        <img
          src={image || "/fallback.jpg"}
          onError={(e) => (e.target.src = "/fallback.jpg")}
          alt={title}
          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Add to Cart */}
      <div className="px-6 mt-4">
        <button className="w-full py-2 px-4 bg-black text-white text-sm rounded-md hover:bg-gray-800 transition-colors">
          Add to Cart
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Rating */}
        <div className="flex items-center gap-1 mb-2 text-black text-sm">
          {[...Array(5)].map((_, i) => (
            <FiStar key={i} className="fill-black" />
          ))}
          <span className="text-xs text-gray-500 ml-2">(5)</span>
        </div>

        {/* Title */}
        <h3 className="text-base font-medium text-gray-900 mb-2">{title}</h3>

        {/* Pricing */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-lg font-semibold text-gray-900">
            ${price.toFixed(2)}
          </span>
          {originalPrice && originalPrice > price && (
            <span className="text-sm line-through text-gray-400">
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
