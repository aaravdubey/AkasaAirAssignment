import { useState } from "react";
import { MdDoNotDisturbAlt } from "react-icons/md";

export default function OrderCard({ order }) {
  const [quantity, setQuantity] = useState(1);
  const [date, time] = order.createdAt.split('T');
  const [year, month, day] = date.split('-');
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const monthName = monthNames[parseInt(month) - 1];
  const [hour, minute] = time.split(':');
  let formattedHour = hour % 12 || 12;
  const ampm = hour >= 12 ? 'PM' : 'AM';

  return (
    <div className="bg-white rounded-lg overflow-hidden flex p-4 gap-5 mb-5">
      <div className="flex justify-center items-center border rounded-lg">
        <img src={order.orderItems[0].product.imageUrl} alt="food" className={`w-28 h-28 object-contain brightness-75 contrast-125`} />
      </div>

      <div className="w-full">
        <h1 className="text-lg  flex justify-between mb-3">
          <span className="font-semibold text-orange">OrderID#{order.id}</span>
          <span className="text-sm text-gray-700">{`${monthName} ${day}, ${formattedHour}:${minute} ${ampm}`}</span>
        </h1>

        {order.orderItems.map(item =>
          <p key={item.id} className="text-gray-600 flex justify-between">
            <span>{item.product.name} x {item.quantity}</span>
            <span>₹{item.product.price * item.quantity}</span>
          </p>
        )}
        <div className="flex justify-between items-center mt-2">
          <span>{order.delivered ?
            <span className="text-green-800">&#9679; delivered</span> :
            <span className="text-red-800">&#9679; in preparation</span>}
          </span>

          <span className="flex flex-col items-end ">
            <span className="text-lg font-bold text-orange">₹ {order.totalAmount}</span>
            <span className="text-sm text-gray-600">(via {JSON.parse(order.method).method})</span>
          </span>

          {/* {isSoldOut ?
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
          } */}
        </div>
      </div>
    </div>
  )
}