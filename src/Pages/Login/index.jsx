import React, { useState, useEffect } from 'react';
import { MdOutlineMail } from 'react-icons/md';
import { CiLock } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';

const images = ['/image_one.png', '/image_two.png', '/image_three.png'];

const LoginPage = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const navigate = useNavigate();

  const token = sessionStorage.getItem('token');
  // console.log(token);

  useEffect(() => {
    if (token) {
      navigate('/');
      return;
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col md:flex-row justify-center items-center h-screen w-screen gap-20 p-4">
      {/* Left Side Slider */}
      <div className="relative w-full md:w-[40%] h-[60vh] md:h-[90vh] flex justify-center items-center overflow-hidden">
        {images.map((image, index) => (
          <div
            key={index}
            className="absolute w-full h-full transition-opacity duration-1000 rounded-[3%] overflow-hidden"
            style={{ opacity: index === currentImage ? 1 : 0 }}>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
            <img src={image} alt={`slide-${index}`} className="w-full h-full object-cover" />
          </div>
        ))}

        <div className="absolute bottom-10 md:bottom-40 pl-6 text-white text-center z-20">
          <h2 className="text-3xl md:text-4xl font-bold">Welcome Back to SAIL Dashboard</h2>
          <p className="text-sm md:text-base mt-2">
            Access your personalized dashboard to manage tasks, monitor progress, and stay connected
            with SAIL operations.
          </p>
        </div>

        <div className="absolute bottom-5 md:bottom-20 flex justify-center w-full space-x-2 z-20">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`w-3 h-3 rounded-full transition-all duration-500 ${
                index === currentImage ? 'bg-white' : 'bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Right Side Form */}
      <div className="flex items-center justify-center w-full md:w-[30%] bg-white p-8 rounded-lg">
        <div className="w-full outline-none">
          <div className="flex justify-center mb-6">
            {/* <img src="/sail_logo.png" alt="SAIL Logo" className="h-[8rem] md:h-[10rem]" /> */}
          </div>
          <h2 className="text-[1.5rem] md:text-[2rem] font-semibold text-[#053375] text-center mb-4">
            Sign in Now
          </h2>
          <form>
            <div className="relative">
              <MdOutlineMail className="absolute text-[1.5rem] md:text-[1.8rem] text-[#626262] top-[20%] left-2" />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 border mb-4 outline-none border-[#B0B0B0] rounded-xl pl-12"
                required
              />
            </div>
            <div className="relative">
              <CiLock className="absolute text-[2rem] text-[#626262] top-[15%] left-2" />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 border mb-4 outline-none border-[#B0B0B0] rounded-xl pl-12"
                required
              />
            </div>
            <div className="flex justify-end items-center text-sm mb-4">
              <a href="#" className="text-blue-600">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-[#053375] text-white py-3 rounded-xl mb-4 "
              onClick={() => {
                navigate('/');
                sessionStorage.setItem('token', 'abcd1234');
              }}>
              Log in
            </button>
          </form>

          <p className="text-center text-sm mb-4 text-[#626262]">Have no account yet?</p>
          <div className="text-center">
            <a
              href="#"
              className="inline-block px-4 py-2 border border-blue-600 text-blue-600 w-[100%] rounded-xl">
              Register Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
