import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const MyOrders = () => {

  const { cart, removeFromCart, totalAmount } =
    useContext(CartContext);

  return (
    <div className="p-6">

      <h2 className="text-2xl font-bold mb-4">Add to Cart</h2>

      {cart.map(item => (
        <div key={`cart-${item.productId}`}
             className="flex justify-between border p-3 mb-2">

          <div>
            <h3>{item.title}</h3>
            <p>${item.price} × {item.quantity}</p>
          </div>

          <button
            onClick={() => removeFromCart(item.productId)}
            className="bg-red-500 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      ))}

      <h3 className="text-lg font-bold mt-4">
        Total Amount: ${totalAmount}
      </h3>
      <button className="bg-green-500 text-white px-4 py-2 rounded mt-4">
        Submit Order
      </button>
    </div>
  );
};

export default MyOrders;
