import { useNavigate } from "react-router";
import HomeImage from "../assets/images/home.png";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { BiFoodTag } from "react-icons/bi";
import FoodCard from "../components/FoodCard";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "../components/Footer";
import Loading from "../components/Loading";
const API_URL = import.meta.env.VITE_API_URL;

export default function Home() {
  const navigate = useNavigate();
  const [productLoading, setProductLoading] = useState(false);
  const [categoryLoading, setCategoryLoading] = useState(false);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedtType, setSelectedType] = useState("All");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };

  async function fetchProducts() {
    setProductLoading(true);
    const categoriesQuery = selectedCategories.join(',');
    const type = selectedtType === "Non" ? "Non-Veg" : selectedtType;

    const response = await axios.get(`${API_URL}/products`, {
      params: {
        email: localStorage.getItem('email'),
        type,
        categories: categoriesQuery
      },
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    });
    if (response.status === 200) {
      setProducts(response.data);
      setProductLoading(false);
      // console.log(response.data);
    }
  }

  async function fetchCategories() {
    setCategoryLoading(true);
    const response = await axios.get(`${API_URL}/products/categories`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    });
    if (response.status === 200) {
      const categoryNames = response.data.map(item => item.name);
      setCategories(categoryNames);
      // console.log(categoryNames);
      setCategoryLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [selectedCategories, selectedtType]);

  useEffect(() => {
    fetchCategories();
  }, []);


  return (
    <div>
      {productLoading || categoryLoading && <Loading />}
      <ToastContainer position="bottom-right" />
      <div className="bg-light-blue">
        <Header />

        <section className="bg-transparent">
          <div className="grid px-4 py-10 pb-8 xl:px-28 md:gap-8 xl:gap-0 md:grid-cols-12 md:py-8">
            <div className="mr-auto md:col-span-7">
              <h1
                className="max-w-2xl mb-5 text-3xl text-logo-green font-extrabold leading-none tracking-tight md:text-4xl xl:text-5xl ">
                Crave It? <br /><span className="text-orange">Order It!</span> <br /> Fresh Eats <br /> at Your Doorstep.
              </h1>

              <p className="max-w-2xl mb-4 text-gray-500 md:text-base lg:text-lg">
                Order from the best local restaurants with easy on-demand delivery.
              </p>

              <div className="space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                <button onClick={() => navigate('/cart')}
                  className="inline-flex items-center justify-center w-full px-5 py-3 text-sm font-medium text-center text-orange border-[1.5px] border-orange rounded-lg sm:w-auto hover:text-white hover:bg-dark-orange focus:ring-4 focus:ring-gray-100 ">
                  View Cart
                </button>
                <button onClick={() => navigate('/orders')}
                  className="inline-flex items-center justify-center w-full px-5 py-3 text-sm font-medium text-center text-white border bg-orange border-gray-200 rounded-lg sm:w-auto hover:bg-dark-orange focus:ring-4 focus:ring-gray-100 ">
                  Track Orders
                </button>
              </div>
            </div>

            <div className="hidden md:mt-0 md:col-span-5 md:flex justify-end pr-10">
              <img src={HomeImage} className="w-96 object-contain " alt="hero image" />
            </div>

          </div>
        </section>
      </div>


      <div className="py-8 px-2 xl:px-28">
        <h2 className="text-2xl font-bold mb-4 px-2">Order our best food options</h2>
        <div className="flex flex-wrap text-sm md:text-base">
          <button
            onClick={() => setSelectedType("All")}
            className={`m-2 px-4 py-2 rounded-md transition duration-300 font-semibold
              ${selectedtType.includes("All") ? 'bg-orange text-white' : 'bg-slate-100 text-gray-800'}`}
          >
            <span>All</span>
          </button>
          <button
            onClick={() => setSelectedType("Veg")}
            className={`m-2 px-4 py-2 rounded-md transition duration-300 font-semibold
              ${selectedtType.includes("Veg") ? 'bg-orange text-white' : 'bg-slate-100 text-gray-800'}`}
          >
            <span className="flex items-center gap-1"> <BiFoodTag className="text-green-800" /> Veg</span>
          </button>
          <button
            onClick={() => setSelectedType("Non")}
            className={`m-2 px-4 py-2 rounded-md transition duration-300 font-semibold
              ${selectedtType.includes("Non") ? 'bg-orange text-white' : 'bg-slate-100 text-gray-800'}`}
          >
            <span className="flex items-center gap-1"> <BiFoodTag className="text-red-800" /> Non-Veg</span>
          </button>

          <span className="border-l border-gray-300 m-2" />

          {categories.map((category) => (
            <button
              key={category}
              onClick={() => toggleCategory(category)}
              className={`m-2 px-4 py-2 rounded-md transition duration-300 font-semibold
              ${selectedCategories.includes(category) ? 'bg-orange text-white' : 'bg-slate-100 text-gray-800'}`}
            >
              <span>{category}</span>
            </button>
          ))}
        </div>


        {products.length > 0 ? <div className="grid mb:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8 mt-8">
          {
            products.map((product) => (
              <FoodCard key={product._id} product={product} />
            ))
          }
        </div> :
          <p className="w-full h-56 flex justify-center items-center font-semibold text-xl">No products found.</p>
        }

      </div>

      <Footer />
    </div>
  );
}
