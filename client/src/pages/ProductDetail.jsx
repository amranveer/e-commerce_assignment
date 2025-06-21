import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`).then(res => setProduct(res.data));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
      <h2 className="text-2xl font-bold mt-4">{product.name}</h2>
      <p className="my-2">{product.description}</p>
      <p className="text-lg font-semibold">${product.price}</p>
      <button
        className="bg-green-600 text-white px-4 py-2 mt-4"
        onClick={() => dispatch(addToCart(product))}
      >
        Add to Cart
      </button>
    </div>
  );
}
