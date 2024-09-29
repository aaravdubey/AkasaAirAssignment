import { useEffect, useState } from "react";
import CartCard from "../components/CartCard";
import Header from "../components/Header";
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";
import { MdProductionQuantityLimits } from "react-icons/md";
import { CgPaypal } from "react-icons/cg";
import { SiPaytm } from "react-icons/si";
import { FaGooglePay } from "react-icons/fa6";
import { FaStripeS } from "react-icons/fa";
import { useNavigate } from "react-router";

const API_URL = import.meta.env.VITE_API_URL;

export default function Payment() {
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const handleSelect = (id) => {
    setSelectedPayment(id);
  };

  const getCart = async () => {
    const response = await axios.post(`${API_URL}/cart`, {
    }, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
    console.log(response.data);
    setCart(response.data);
  }

  const placeOrder = async () => {
    try {
      const response = await axios.post(`${API_URL}/order`, {
        method: selectedPayment
      }, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
      console.log(response.data);
      navigate("/order/success", { state: { id: response.data, amount: cart.total } });
    } catch (error) {
      navigate("/order/failure", { state: { error: true } });
      console.error(error);
    }
  }


  useEffect(() => {
    getCart();
  }, [])

  return (
    <div className="min-h-screen bg-slate-100">
      <Header />

      <div className="grid grid-cols-3 gap-5 py-10 px-3 xl:px-28">
        <div className="col-span-2 bg-white rounded-lg p-5">
          {/* {cart != null && cart.items.length > 0 ?
            cart.items.map(item => item.quantity > 0 && <CartCard key={item.id} item={item} itemQuantity={item.quantity} product={item.product} updateCart={updateCart} />)
            : <p className="h-full flex flex-col gap-3 font-semibold justify-center items-center"><MdProductionQuantityLimits className="text-5xl" /> Cart Is Empty</p>
          } */}

          <div className="flex flex-col space-y-4 p-4">
            <h2 className="text-xl font-semibold">Choose a Payment Option</h2>
            <div className="flex flex-col gap-4">
              {paymentOptions.map((option) => (
                <div
                  key={option.id}
                  onClick={() => handleSelect(option.id)}
                  className={`flex items-center p-4 border rounded-lg cursor-pointer transition duration-200 
              ${selectedPayment === option.id ? 'bg-orange text-white border-orange' : 'bg-white text-gray-800 border-gray-300 hover:bg-slate-100'}`}
                >
                  <span className="w-10 h-10 flex justify-center items-center text-2xl mr-3 border p-2">{option.icon}</span>
                  <span className="font-medium">{option.name}</span>
                </div>
              ))}
            </div>
          </div>
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
              <p>₹ {cart && cart.total}</p>
            </div>
          </div>

          <button onClick={placeOrder} disabled={selectedPayment == null ? true : false} className={`w-full bg-orange hover:bg-dark-orange text-white text-lg font-bold py-3 mt-5 rounded-lg flex justify-between items-center px-5 ${selectedPayment == null && "cursor-not-allowed"}`}>
            <span>Pay & Place Order</span>
            <MdArrowForwardIos />
          </button>

          <button onClick={() => navigate("/cart")} className={`w-full bg-transparent border border-orange hover:bg-gray-200 text-orange text-lg font-bold py-3 mt-5 rounded-lg flex justify-between items-center px-5`}>
            <MdArrowBackIos />
            <span>Go back to cart</span>
          </button>
        </div>
      </div>
    </div>
  )
}

const paymentOptions = [
  { id: 'gpay', name: 'Google Pay', icon: <FaGooglePay /> },
  { id: 'paytm', name: 'Paytm', icon: <SiPaytm /> },
  { id: 'paypal', name: 'PayPal', icon: <CgPaypal /> },
  { id: 'stripe', name: 'Stripe', icon: <FaStripeS className="text-sm" /> }
];