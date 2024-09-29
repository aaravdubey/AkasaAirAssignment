import { useEffect, useState } from "react"
import { useNavigate } from "react-router";
import LoginImage from '../assets/images/login.png'
import axios from 'axios';
import { isTokenExpired } from "../services/tokenService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const API_URL = import.meta.env.VITE_API_URL;

export default function Login() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [email1, setEmail1] = useState('');
  const [password1, setPassword1] = useState('');

  const [isLogin, setIslogin] = useState(true);
  const [visible, setVisible] = useState(false);

  const switchSection = () => {
    setVisible(true);

    setTimeout(() => {
      setVisible(false);
      setIslogin(!isLogin);
    }, 250);
  };

  async function signUp(e) {
    e.preventDefault();

    const response = await axios.post(`${API_URL}/signup`, {
      name,
      email,
      password
    });
    if (response.status === 200) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('name', response.data.name);
      localStorage.setItem('email', response.data.email);
      navigate("/home");
      toast.success("Account created successfully!");
      // console.log(response.data);
    }
  }

  async function signIn(e) {
    e.preventDefault();
    toast.info("Signing in...");

    try {
      console.log(`${API_URL}/signin`);
      const response = await axios.post(`${API_URL}/signin`, {
        email: email1,
        password: password1
      });

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('name', response.data.name);
        localStorage.setItem('email', response.data.email);
        navigate("/home");
        console.log(response);
      }
    } catch (error) {
      if (error.response && error.response.status === 401)
        console.log(error);
      toast.error("Invalid Credentials!");
    }
  }

  useEffect(() => {
    if (!isTokenExpired(localStorage.getItem("token"))) {
      navigate("/home");
    }
  }, [])

  return (
    <div className={`flex items-center justify-center min-h-screen bg-gray-100 transition-opacity duration-250 ${visible ? "opacity-0" : "opacity-100"}`} >
      <ToastContainer position="bottom-center" limit={1} />
      <div
        className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0 text-black"
      >
        {isLogin ?
          <div className="flex flex-col justify-center p-8 md:p-14">
            <span className="mb-3 text-4xl font-bold">Welcome back</span>
            <span className="text-orange mb-8">
              Please enter your credentials to continue.
            </span>
            <form onSubmit={signIn}>
              <div className="py-4">
                <span className="mb-2 text-md">Email</span>
                <input
                  required
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-black"
                  name="email1"
                  id="email1"
                  value={email1}
                  onChange={(e) => setEmail1(e.target.value)}
                />
              </div>
              <div className="py-4">
                <span className="mb-2 text-md">Password</span>
                <input
                  required
                  type="password"
                  name="pass1"
                  id="pass1"
                  value={password1}
                  onChange={(e) => setPassword1(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-black"
                />
              </div>
              {/* <div className="flex justify-center w-full py-4">
                <span className="font-bold text-md">Forgot password</span>
              </div> */}
              <button
                className="w-96 bg-orange text-white p-2 rounded-lg my-6 border hover:border-gray-300 hover:bg-dark-orange"
                type='submit'
              >
                Sign in
              </button>
            </form>
            <div className="text-center text-gray-400">
              Dont have an account? {" "}
              <button className="font-bold text-orange" onClick={switchSection}> Sign up</button>
            </div>
          </div> :

          <form onSubmit={signUp} className="flex flex-col justify-center p-8 md:p-14">
            <span className="mb-3 text-4xl font-bold">New here?</span>
            <span className=" text-orange mb-8">
              Sign up now and lets get started!
            </span>
            <div className="py-2">
              <span className="mb-2 text-md">Name</span>
              <input
                required
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-black"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            {/* <div className="py-2">
              <span className="mb-2 text-md">Anonymous Name <span className='text-sm'>(dont include your actual name for anonymity)</span></span>
              <input
                required
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-black"
                name="email"
                id="email"
                value={anonymousName}
                onChange={(e) => setAnonymousName(e.target.value)}
              />
            </div> */}
            <div className="py-2">
              <span className="mb-2 text-md">Email</span>
              <input
                required
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-black"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="py-2 pb-10">
              <span className="mb-2 text-md">Password</span>
              <input
                required
                type="password"
                name="pass"
                id="pass"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-black"
              />
            </div>
            <button
              className="w-96 bg-orange text-white p-2 rounded-lg mb-6 border hover:border-gray-300 hover:bg-dark-orange"
            >
              Sign up
            </button>
            <div className="text-center text-gray-400">
              Dont have an account? {""}
              <button className="font-bold text-orange" onClick={switchSection}> Log In</button>
            </div>
          </form>
        }

        <div className="relative">
          <img
            src={LoginImage}
            alt="img"
            className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
          />
          <div
            className="absolute hidden bottom-10 right-6 p-6 bg-white bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block"
          >
            <span className="text-white text-xl"
            >Crave It? Order It! Fresh Eats at Your Doorstep.
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}