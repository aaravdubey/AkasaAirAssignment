import axios from "axios";
import { useEffect, useState } from "react";
import { BiFoodTag } from "react-icons/bi";
import { debounce } from "../services/debounce";
import { toast } from "react-toastify";
const API_URL = import.meta.env.VITE_API_URL;

export default function FoodCard({ product }) {
  const [quantity, setQuantity] = useState(product.cartQuantity);

  const debouncedUpdateCart = debounce(async (action, updatedQuantity) => {
    const email = localStorage.getItem("email");
    try {
      const response = await axios.post(`${API_URL}/cart/update`, {
        email: email,
        productId: product.id,
        quantity: updatedQuantity,
        action: action,
      }, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });

      // console.log(`Product ${action}ed in cart:`, response.data);
      // Optionally, you could also set the quantity based on the API response if necessary
      setQuantity(response.data.quantity);

    } catch (error) {
      console.error(`Error ${action}ing product to cart:`, error);
      toast.error(`Failed to ${action} product to cart. Please try again.`);
    }
  }, 500);

  const updateCart = (action) => {
    const newQuantity = action === "add" ? quantity + 1 : quantity - 1;

    if (newQuantity > product.availableQuantity) {
      toast.error("Cannot add more than available quantity");
      return;
    }

    if (newQuantity >= 0) {
      setQuantity(newQuantity);

      debouncedUpdateCart(action, newQuantity);
    }
  };



  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <img src={product.imageUrl} alt="food" className={`w-full h-56 object-cover brightness-75 contrast-125 ${product.availableQuantity == 0 && "saturate-0"}`} />
      <div className="p-4">
        <h1 className="text-xl font-bold text-gray-800">{product.name} {""}
          <span className={`inline-block ${product.foodType == "Veg" ? "text-green-800" : product.foodType == "Non-Veg" && "text-red-800"}`}>
            <BiFoodTag />
          </span>
        </h1>
        <p className="mt-2 text-gray-600">{product.description}</p>
        <div className="flex justify-between items-center mt-3">
          <span className="text-lg font-bold text-orange">₹{product.price}</span>
          {product.availableQuantity === 0 ? <p className="text-orange">not available</p> : quantity === 0 ?
            <button className="px-5 py-1.5 bg-orange text-white text-sm font-bold rounded" onClick={() => updateCart("add")}>ADD</button>
            :
            <div className="flex rounded overflow-hidden">
              <button className="w-8 px-2 py-1 bg-orange text-white" onClick={() => updateCart("remove")}>-</button>
              <span className="px-4 py-1 bg-gray-100">{quantity}</span>
              <button className="w-8 px-2 py-1 bg-orange text-white" onClick={() => updateCart("add")}>+</button>
            </div>
          }
        </div>
      </div>
    </div>
  )
}