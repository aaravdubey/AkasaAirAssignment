import { useEffect, useState } from "react";
import Header from "../components/Header";
import OrderCard from "../components/OrderCard";
import axios from "axios";
import { MdOutlineNoFood } from "react-icons/md";
import { useNavigate } from "react-router";
import Loading from "../components/Loading";
const API_URL = import.meta.env.VITE_API_URL;

export default function Orders() {
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getOrders = async () => {
    setLoading(true);
    const response = await axios.get(`${API_URL}/order`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    });
    // console.log(response.data);
    setOrders(response.data);
    setLoading(false);
  }

  useEffect(() => {
    getOrders();
  }, [])

  return (
    <div className="min-h-screen bg-slate-100">
      {loading && <Loading />}
      <Header />

      <section className=" px-3 xl:px-28 pt-8 pb-10">
        <h2 className="mb:px-2 text-lg mb:text-2xl font-semibold mb-5">Orders ({orders != null && orders.length})</h2>

        {orders != null && orders.length > 0 ?
          <div className="lg:grid mb:grid-cols-2 gap-x-5">
            {orders.map(order => <OrderCard key={order.id} order={order} />)}
          </div>
          :
          <p className="h-96 flex flex-col gap-3 font-semibold justify-center items-center"><MdOutlineNoFood className="text-4xl" /> No Orders Yet
            <button onClick={() => navigate("/home")} className="bg-orange p-2 text-white rounded text-sm">Browse Food Items</button>
          </p>
        }

      </section>
    </div>
  );
}