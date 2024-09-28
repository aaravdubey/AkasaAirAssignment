import { useNavigate } from "react-router";
import HomeImage from "../assets/images/home.png";
import Header from "../components/Header";
import { useState } from "react";
import { BiFoodTag } from "react-icons/bi";
import FoodCard from "../components/FoodCard";

export default function Home() {
  const navigate = useNavigate();

  const [selectedCategories, setSelectedCategories] = useState(['All']);

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category]
    );
  };


  return (
    <div>
      <div className="bg-light-blue">
        <Header />

        <section className="bg-transparent">
          <div className="grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto md:gap-8 xl:gap-0 md:py-0 md:grid-cols-12 md:pt-16">
            <div className="mr-auto place-self-center md:col-span-7">
              <h1
                className="max-w-2xl mb-5 text-3xl text-logo-green font-extrabold leading-none tracking-tight md:text-4xl xl:text-5xl ">
                Crave It? <br /><span className="text-orange">Order It!</span> <br /> Fresh Eats <br /> at Your Doorstep.
              </h1>

              <p className="max-w-2xl mb-5  text-gray-500 lg:mb-8 md:text-base lg:text-lg">
                Order from the best local restaurants with easy on-demand delivery.
              </p>

              <div className="space-y-4 sm:flex sm:space-y-0 sm:space-x-4">

                <a href="#heal"
                  className="inline-flex items-center justify-center w-full px-5 py-3 text-sm font-medium text-center text-gray-900 border border-gray-200 rounded-lg sm:w-auto hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 ">
                  Heal Music
                </a>

                <button
                  className="inline-flex items-center justify-center w-full px-5 py-3 mb-2 mr-2 text-sm font-medium text-white bg-my-color border border-gray-200 rounded-lg sm:w-auto focus:outline-none hover:bg-gray-100 hover:text-logo-green focus:z-10 focus:ring-4 focus:ring-gray-200"
                  onClick={() => navigate('/create')}>
                  Create Post
                </button>

              </div>
            </div>

            <div className="hidden md:mt-0 md:col-span-5 md:flex scale-110 relative bottom-10 pr-20">
              <img src={HomeImage} className="object-cover" alt="hero image" />
            </div>

          </div>
        </section>
      </div>


      <div className="py-8 px-28">
        <h2 className="text-2xl font-bold mb-4 px-2">Order our best food options</h2>
        <div className="flex flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => toggleCategory(category)}
              className={`m-2 px-4 py-2 rounded-md transition duration-300 font-semibold
              ${selectedCategories.includes(category) ? 'bg-orange text-white' : 'bg-slate-100 text-gray-800'}`}
            >
              {category === "Veg" ? <span className="flex items-center gap-1"> <BiFoodTag className="text-green-800" /> {category}</span> :
                category === "Non-Veg" ? <span className="flex items-center gap-1"><BiFoodTag className="text-red-800" />{category}</span> :
                  <span>{category}</span>
              }
            </button>
          ))}
        </div>


        <div className="grid grid-cols-4 gap-4 mt-8">
          <FoodCard />
        </div>
      </div>
    </div>
  );
}

const categories = [
  'All',
  'Veg',
  'Non-Veg',
  'Pizza',
  'Burger',
  'Sushi',
  'Salad',
  'Dessert',
  'Pasta',
];