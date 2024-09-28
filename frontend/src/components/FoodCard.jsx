import { useState } from "react";

export default function FoodCard() {
  const [quantity, setQuantity] = useState(0);

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YnVyZ2VyfGVufDB8fDB8fHww" alt="food" className="w-full h-56 object-cover" />
      <div className="p-4">
        <h1 className="text-xl font-bold text-gray-800">Food Name</h1>
        <p className="mt-2 text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi quos quidem sequi illum facere recusandae voluptatibus</p>
        <div className="flex justify-between items-center mt-3">
          <span className="text-lg font-bold text-orange">₹200</span>
          {quantity === 0 ?
            <button className="px-5 py-1.5 bg-orange text-white text-sm font-bold rounded" onClick={() => setQuantity(quantity + 1)}>ADD</button>
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