import { useLocation, useNavigate } from "react-router-dom";
import { MdCheckCircle } from "react-icons/md";
import { useEffect } from "react";
import { isTokenExpired } from "../services/tokenService";

export default function Success() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id, amount } = location.state || {};
  console.log(id + " " + amount);
  if (!id || !amount) navigate('/cart');

  const goToHome = () => {
    navigate('/');
  };

  const viewOrders = () => {
    navigate('/orders');
  };

  useEffect(() => {
    if (!id || !amount) navigate('/cart');
    if (isTokenExpired(localStorage.getItem("token"))) {
      localStorage.removeItem("token");
      navigate("/");
    }
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md text-center">
        <div className="flex justify-center mb-6">
          <MdCheckCircle className="text-green-500 text-6xl" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Payment Successful!</h2>
        <p className="text-gray-600 font-semibold mb-10">Thank you for your purchase. Your food is on the way.</p>

        <div className="mb-6">
          <p className="text-lg font-semibold text-gray-500">Order ID:</p>
          <p className="text-xl font-bold text-gray-700">#{id}</p>
        </div>

        <div className="mb-6">
          <p className="text-lg font-semibold text-gray-500">Amount Paid:</p>
          <p className="text-xl font-bold text-gray-700">₹{amount}</p>
        </div>

        <div className="flex gap-4 mt-10">
          <button
            onClick={viewOrders}
            className="w-full border border-gray-700 text-gray-700 font-bold py-2 rounded-lg hover:bg-slate-100 transition"
          >
            View Orders
          </button>

          <button
            onClick={goToHome}
            className="w-full border border-gray-700 text-gray-700 font-bold py-2 rounded-lg hover:bg-slate-100 transition"
          >
            Browse Items
          </button>
        </div>
      </div>
    </div>
  );
}
