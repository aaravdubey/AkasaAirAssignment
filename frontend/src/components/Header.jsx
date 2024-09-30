import { useLocation, useNavigate } from "react-router";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import { MdFastfood } from "react-icons/md";
import { AiFillProfile } from "react-icons/ai";
import { BiSolidLogOut } from "react-icons/bi";
import { useEffect, useState } from "react";
import { isTokenExpired } from "../services/tokenService";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname == '/home';
  // console.log(isHome);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  async function checkLogin() {
    try {
      const response = await axios.get(`${API_URL}/products/categories`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        logout();
      } else {
        console.error("An error occurred:", error);
      }
    }
  }

  useEffect(() => {
    if (isTokenExpired(localStorage.getItem("token"))) {
      logout();
    }
    checkLogin();
  }, [])

  const logout = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate("/");

  }

  return (
    <div>
      <nav className={isHome ? "bg-transparent" : "bg-white shadow"}>
        <div className={`px-4 xl:px-28 flex items-center justify-between  p-4 ${isHome ? "py-5" : "py-3"}`}>
          <a href="/" className="flex items-center text-orange text-lg mb:text-2xl font-bold">
            {/* <img src={Logo} className="h-7" alt="Logo" /> */}
            Akasa Foods
          </a>



          <div className="flex gap-2 xs:gap-5">
            <button className={`block relative ${isHome ? "hover:bg-slate-200" : "hover:bg-slate-100"} rounded-full py-1.5 px-2.5`} onClick={() => navigate("/cart")}>
              <FaShoppingCart className="text-lg mb:text-xl text-gray-800" />
            </button>

            <button className={`w-full flex md:w-auto ${isHome ? "hover:bg-slate-200" : "hover:bg-slate-100"} justify-center rounded-full cursor-pointer mb:pl-4 mb:pr-2 py-1 transition-all duration-150`} onClick={() => setSidebarVisible(true)}>
              <div className="w-full inline-flex justify-between items-center gap-1.5 mr-3 text-sm text-logo-green ">
                <FaUserCircle className="text-2xl text-gray-800" />

                <div>
                  <a href="#" rel="author" className="text-xs mb:text-sm font-medium">{localStorage.getItem('name')}</a>
                </div>
              </div>
            </button>
          </div>

        </div>
      </nav>


      <div
        id='sidebar'
        className={`${sidebarVisible ? 'flex' : 'hidden'} w-full h-full fixed top-0 right-0 transition ease z-40 duration-100 text-gray-900`}
      >
        <div className='flex-1 bg-slate-900 opacity-25' onClick={() => setSidebarVisible(false)}></div>
        <div className=' lg:w-[22.5%] bg-white py-3'>
          <div className='mt-2 border-b border-gray-200 px-2'>
            <div className='flex w-full justify-start items-center'>
              <div className='flex items-center justify-center w-12 m-3 h-12 rounded-full bg-secondary-blue'>
                <FaUserCircle className='align-middle text-3xl mb:text-5xl text-teal-blue' />
              </div>
              <div className='py-4 w-full'>
                <p className='text-lg xs:text-xl font-semibold'>Hello, {localStorage.getItem("name")}</p>
                <span className='text-xs font-standard text-teal-blue'>{localStorage.getItem("email")}</span>
              </div>
            </div>
          </div>
          <div className=''>
            <nav>
              <ul className='flex flex-col items-center px-0.5'>
                {/* <li className='flex justify-start align-middle items-start w-full text-sm py-5 font-standard gap-2 hover:bg-light-blue  rounded-lg cursor-pointer border-b border-gray-200 px-4' onClick={() => navigate("/preferences")}> <AiFillProfile className='text-2xl w-12 text-gray-800' /> Profile</li> */}
                <li className='flex justify-start align-middle items-start w-full text-sm py-5 font-standard gap-2 hover:bg-light-blue rounded-lg cursor-pointer border-b border-gray-200 px-4' onClick={() => navigate("/orders")}> <MdFastfood className='text-xl w-12 text-gray-800' /> Orders</li>
                <li className='flex justify-start align-middle items-start w-full text-sm py-5 font-standard gap-2 hover:bg-red-100 rounded-lg cursor-pointer border-b border-gray-200 px-4' onClick={logout}> <BiSolidLogOut className='text-2xl w-12 text-gray-800' /> Log Out</li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

    </div>
  )
}