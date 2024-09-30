import { useEffect, useState } from "react";
import { MdDoNotDisturbAlt } from "react-icons/md";

export default function CartCard({ item, itemQuantity, product, updateCart }) {
  const [isSoldOut, setIsSoldOut] = useState(false);

  return (
    <div className="w-full bg-white rounded-lg overflow-hidden flex items-center p-4 gap-5 mb-5">
      <div className="flex justify-center items-center border rounded-lg">
        <img src={product.imageUrl} alt="food" className={`w-28 h-28 object-contain brightness-90 contrast-125 ${product.availableQuantity == 0 && "saturate-0"}`} />
      </div>

      <div className="w-full">
        <h1 className="mb:text-lg font-semibold text-gray-800">{product.name}</h1>
        <p className="text-sm mb:text-base mt-1 text-gray-600">{product.description}</p>
        <div className="flex justify-between items-center mt-1">
          <span className="text-lg font-bold text-orange">₹ {product.price}</span>
          <div className="flex  gap-3">
            <p className="hidden md:flex text-gray-700 justify-center items-center">In stock: {product.availableQuantity}</p>
            {product.availableQuantity === 0 ?
              <div className="flex">
                <p className="px-5 py-1.5 text-orange text-sm font-bold flex items-center gap-1"> <MdDoNotDisturbAlt className="text-lg" /> Sold out</p>
                <button className="px-5 py-1.5 bg-orange hover:bg-dark-orange text-white text-sm font-bold rounded" onClick={() => updateCart("delete", item, product.availableQuantity)}>Remove</button>
              </div>
              :
              <div className="flex rounded overflow-hidden">
                <button className="w-8 px-2 py-1 bg-orange text-white" onClick={() => updateCart("remove", item, product.availableQuantity)}>-</button>
                <span className="px-4 py-1 bg-gray-100">{itemQuantity}</span>
                <button className="w-8 px-2 py-1 bg-orange text-white" onClick={() => updateCart("add", item, product.availableQuantity)}>+</button>
              </div>
            }
          </div>
        </div>
        <p className="flex md:hidden text-gray-700 justify-end items-center mt-1">In stock: {product.availableQuantity}</p>
      </div>
    </div>
  )
}