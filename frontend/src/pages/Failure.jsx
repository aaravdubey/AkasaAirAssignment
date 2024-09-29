import { useLocation, useNavigate } from "react-router-dom";
import { MdError } from "react-icons/md";
import { useEffect } from "react";
import { isTokenExpired } from "../services/tokenService";

export default function Failure() {
  const navigate = useNavigate();
  const location = useLocation();
  const { error } = location.state || {};
  console.log(error);
  if (!error) navigate('/cart');

  const goToHome = () => {
    navigate('/');
  };

  const viewOrders = () => {
    navigate('/cart');
  };

  useEffect(() => {
    if (!error) navigate('/cart');
    if (isTokenExpired(localStorage.getItem("token"))) {
      localStorage.removeItem("token");
      navigate("/");
    }
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md text-center">
        <div className="flex justify-center mb-6">
          <MdError className="text-red-500 text-6xl" />
        </div>
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Payment Failed</h2>
        <p className="text-gray-600 font-semibold mb-10">Unfortunately, we couldn't process your payment. Please try again.</p>

        <div className="mb-6">
          <p className="text-lg font-semibold text-gray-500">Error:</p>
          <p className="text-xl font-semibold text-gray-700">Food Item Not Available</p>
        </div>

        <div className="flex gap-4 mt-10">
          <button
            onClick={viewOrders}
            className="w-full border border-gray-700 text-gray-700 font-bold py-2 rounded-lg hover:bg-slate-100 transition"
          >
            Go To Cart
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
