import CartCard from "../components/CartCard";
import Header from "../components/Header";
import { MdArrowForwardIos } from "react-icons/md";

export default function Cart() {
  return (
    <div className="min-h-screen bg-slate-100">
      <Header />

      <div className="grid grid-cols-3 gap-5 py-10 px-28">
        <div className="col-span-2 bg-white rounded-lg p-5">
          <CartCard />
          <CartCard />
        </div>

        <div className="h-min col-span-1">
          <div className=" bg-white rounded-lg overflow-hidden pt-5">
            <p className="font-semibold px-5">Bill details</p>
            <div className="flex justify-between mt-3 px-5">
              <p>Item1 total</p>
              <p>₹200</p>
            </div>
            <div className="flex justify-between mt-3 px-5">
              <p>Item2 total</p>
              <p>₹200</p>
            </div>
            <div className="flex justify-between mt-3 px-5 py-3 bg-orange text-white font-bold">
              <p>To Pay</p>
              <p>₹400</p>
            </div>
          </div>

          <button className="w-full bg-orange hover:bg-dark-orange text-white text-lg font-bold py-3 mt-5 rounded-lg flex justify-between items-center px-5">
            <span>Proceed To Pay</span>
            <MdArrowForwardIos />
          </button>
        </div>
      </div>
    </div>
  )
}