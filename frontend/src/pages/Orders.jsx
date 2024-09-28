import Header from "../components/Header";
import OrderCard from "../components/OrderCard";

export default function Orders() {
  return (
    <div className="min-h-screen bg-slate-100">
      <Header />

      <section className="px-28 py-10">
        <h2 className="text-xl font-semibold mb-5">Orders</h2>

        <div className="flex flex-col">
          <OrderCard />
        </div>
      </section>
    </div>
  );
}