import { useLocation, useNavigate } from "react-router";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import { MdFastfood } from "react-icons/md";
import { AiFillProfile } from "react-icons/ai";
import { BiSolidLogOut } from "react-icons/bi";
import { useState } from "react";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname == '/';
  // console.log(isHome);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const logout = () => { }

  return (
    <div>
      <nav className={isHome ? "bg-transparent" : "bg-white shadow"}>
        <div className={`max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 ${isHome ? "py-5" : "py-3"}`}>
          <a href="/" className="flex items-center text-orange text-2xl font-bold">
            {/* <img src={Logo} className="h-7" alt="Logo" /> */}
            Foody
          </a>

          <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 " aria-controls="navbar-default" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>

          <div className="flex gap-5">
            <button className={`block ${isHome ? "hover:bg-slate-200" : "hover:bg-slate-100"} rounded-full py-1.5 px-2.5`} onClick={() => navigate("/cart")}>
              <FaShoppingCart className="text-xl text-gray-800" />
            </button>

            <button className={`hidden w-full md:flex md:w-auto ${isHome ? "hover:bg-slate-200" : "hover:bg-slate-100"} justify-center rounded-full cursor-pointer pl-4 pr-2 py-1 transition-all duration-150`} onClick={() => setSidebarVisible(true)}>
              <div className="w-full inline-flex justify-between items-center gap-1.5 mr-3 text-sm text-logo-green ">
                <FaUserCircle className="text-2xl text-gray-800" />

                <div>
                  <a href="#" rel="author" className="text-sm text-logo-green">{localStorage.getItem('username')}</a>
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
        <div className='w-[22.5%] bg-white py-3'>
          <div className='mt-2 border-b border-gray-200 px-2'>
            <div className='flex w-full justify-start items-center'>
              <div className='flex items-center justify-center w-12 m-3 h-12 rounded-full bg-secondary-blue'>
                <FaUserCircle className='align-middle text-5xl text-teal-blue' />
              </div>
              <div className='py-4'>
                <p className='text-xl font-semibold'>Hello, {"name"}</p>
                <span className='text-xs font-standard text-teal-blue'>{"email"}</span>
              </div>
            </div>
          </div>
          <div className=''>
            <nav>
              <ul className='flex flex-col items-center px-0.5'>
                <li className='flex justify-start align-middle items-start w-full text-sm py-5 font-standard gap-2 hover:bg-light-blue  rounded-lg cursor-pointer border-b border-gray-200 px-4' onClick={() => navigate("/preferences")}> <AiFillProfile className='text-2xl w-12 text-gray-800' /> Profile</li>
                <li className='flex justify-start align-middle items-start w-full text-sm py-5 font-standard gap-2 hover:bg-light-blue rounded-lg cursor-pointer border-b border-gray-200 px-4' onClick={() => navigate("/orders")}> <MdFastfood className='text-xl w-12 text-gray-800' /> Orders</li>
                {/* <li className='flex justify-start align-middle items-start w-full text-sm py-5 font-standard gap-2 hover:bg-light-blue rounded-lg cursor-pointer border-b border-gray-200 px-4' onClick={() => navigate("/help")}> <IoHelpCircleSharp className='text-2xl w-12 text-gray-800' /> Help  & Support</li> */}
                <li className='flex justify-start align-middle items-start w-full text-sm py-5 font-standard gap-2 hover:bg-red-100 rounded-lg cursor-pointer border-b border-gray-200 px-4' onClick={logout}> <BiSolidLogOut className='text-2xl w-12 text-gray-800' /> Log Out</li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

    </div>
  )
}