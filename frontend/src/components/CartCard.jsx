import { useState } from "react";
import { MdDoNotDisturbAlt } from "react-icons/md";

export default function CartCard() {
  const [quantity, setQuantity] = useState(1);
  const [isSoldOut, setIsSoldOut] = useState(true);

  return (
    <div className="bg-white rounded-lg overflow-hidden flex p-4 gap-5 mb-5">
      <div className="flex justify-center items-center border rounded-lg">
        <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YnVyZ2VyfGVufDB8fDB8fHww" alt="food" className={`h-28 object-contain ${isSoldOut && "saturate-0"}`} />
      </div>

      <div className="">
        <h1 className="text-lg font-semibold text-gray-800">Food Name</h1>
        <p className="mt-1 text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi quos quidem sequi illum facere recusandae voluptatibus</p>
        <div className="flex justify-between items-center mt-1">
          <span className="text-lg font-bold text-orange">₹200</span>
          {isSoldOut ?
            <div className="flex">
              <button className="px-5 py-1.5 bg-orange text-white text-sm font-bold rounded" onClick={() => setIsSoldOut(false)}>Remove</button>
              <p className="px-5 py-1.5 text-orange text-sm font-bold flex items-center gap-1"> <MdDoNotDisturbAlt className="text-lg" /> Sold out</p>
            </div>
            :
            <div className="flex rounded overflow-hidden">
              <button className="w-8 px-2 py-1 bg-orange text-white" onClick={() => setQuantity(quantity - 1)}>-</button>
              <span className="px-4 py-1 bg-gray-100">{quantity}</span>
              <button className="w-8 px-2 py-1 bg-orange text-white" onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
          }
        </div>
      </div>
    </div>
  )
}