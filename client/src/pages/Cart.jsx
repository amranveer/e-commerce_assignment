import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../redux/cartSlice";

export default function Cart() {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.map(item => (
        <div key={item._id} className="flex justify-between items-center border-b pb-2">
          <div>
            <h2>{item.name}</h2>
            <p>${item.price}</p>
          </div>
          <button
            className="text-red-500"
            onClick={() => dispatch(removeFromCart(item._id))}
          >
            Remove
          </button>
        </div>
      ))}
      {cart.length === 0 && <p>No items in cart.</p>}
    </div>
  );
}
