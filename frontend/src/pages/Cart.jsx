import { useEffect, useState } from "react";
import CartCard from "../components/CartCard";
import Header from "../components/Header";
import { MdArrowForwardIos } from "react-icons/md";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";
import { MdProductionQuantityLimits } from "react-icons/md";
import { useNavigate } from "react-router";
import { debounce } from "../services/debounce";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from "../components/Loading";
const API_URL = import.meta.env.VITE_API_URL;

export default function Cart() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState(null);
  const [total, setTotal] = useState(0);

  const getCart = async () => {
    setLoading(true);
    const response = await axios.post(`${API_URL}/cart`, {
    }, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
    // console.log(response.data);
    setCart(response.data);
    calulateTotal(response.data);
    setLoading(false);
  }

  const calulateTotal = (cart) => {
    let total = 0;
    cart.items.forEach(item => {
      total += item.product.price * item.quantity;
    })
    // console.log(total);
    setTotal(total);
  }

  const updateCartAPI = async (item) => {
    const email = localStorage.getItem("email");
    try {
      const response = await axios.post(`${API_URL}/cart/update`, {
        email: email,
        productId: item.product.id,
        quantity: item.quantity,
        action: item.quantity > 0 ? "add" : "remove",
      }, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // console.log(response.data.quantity); 

      setCart(prevCart => {
        const updatedCart = { ...prevCart };
        updatedCart.items = updatedCart.items.map(cartItem =>
          cartItem.id === item.id ? { ...cartItem, quantity: response.data.quantity } : cartItem
        );

        calulateTotal(updatedCart);
        return updatedCart;
      });

    } catch (error) {
      console.error(`Error updating product in cart:`, error);
      alert(`Failed to update product in cart. Please try again.`);
    }
  };


  const debouncedUpdateCartAPI = debounce(updateCartAPI, 500);

  const updateCart = (action, item, availableQuantity) => {
    let newQuantity = action === "add" ? item.quantity + 1 : item.quantity - 1;

    if (action === "delete") newQuantity = 0;

    if (newQuantity > availableQuantity) {
      toast.error("Cannot add more than available quantity");
      return;
    }

    if (newQuantity >= 0) {
      const updatedCart = { ...cart };
      updatedCart.items = updatedCart.items.map(cartItem =>
        cartItem.id === item.id ? { ...cartItem, quantity: newQuantity } : cartItem
      ).filter(cartItem => cartItem.quantity > 0);

      setCart(updatedCart);
      calulateTotal(updatedCart);
      debouncedUpdateCartAPI({ product: item.product, quantity: newQuantity });
    }
  };

  useEffect(() => {
    getCart();
  }, [])

  return (
    <div className="min-h-screen bg-slate-100">
      {loading && <Loading />}
      <Header />
      <ToastContainer position="bottom-right" />

      <div className="md:grid grid-cols-3 gap-5 py-10 px-3 xl:px-28">
        <div className="col-span-2 bg-white rounded-lg md:p-5 mb-5">
          {cart != null && cart.items.length > 0 ?
            cart.items.map(item => item.quantity > 0 && <CartCard key={item.id} item={item} itemQuantity={item.quantity} product={item.product} updateCart={updateCart} />)
            : <p className="h-96 flex flex-col gap-3 text-gray-700 font-semibold justify-center items-center"><MdProductionQuantityLimits className="text-5xl" /> Cart Is Empty
              <button onClick={() => navigate("/home")} className="bg-orange p-2 text-white rounded text-sm">Browse Food Items</button>
            </p>
          }
        </div>

        <div className="h-min col-span-1">
          <div className=" bg-white rounded-lg overflow-hidden pt-5">
            <p className="font-semibold px-5">Bill details</p>
            {cart != null && cart.items.length > 0 &&
              cart.items.map(item => (item.quantity > 0 && <div key={item.id} className="flex justify-between mt-3 px-5">
                <p>{item.product.name}</p>
                <p className="flex items-center gap-2">{item.quantity} <RxCross2 className="text-sm" />  ₹{item.product.price}</p>
              </div>))
            }
            <div className="flex justify-between mt-3 px-5 py-3 bg-orange text-white font-bold">
              <p>To Pay</p>
              <p>₹ {total}</p>
            </div>
          </div>

          <button onClick={() => navigate("/payment")} disabled={cart == null || cart.items.length <= 0 ? true : false} className={`w-full bg-orange hover:bg-dark-orange text-white text-lg font-bold py-3 mt-5 rounded-lg flex justify-between items-center px-5 ${cart == null || cart.items.length <= 0 && "cursor-not-allowed"}`}>
            <span>Proceed To Pay</span>
            <MdArrowForwardIos />
          </button>
        </div>
      </div>
    </div>
  )
}