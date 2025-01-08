import React, { useState, useEffect } from 'react';
import { MdOutlineMail } from 'react-icons/md';
import { CiLock } from 'react-icons/ci';

const images = ['/image_one.png', '/image_two.png', '/image_three.png'];

const LoginPage = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen">
      {/* Left Side Slider */}
      <div className="relative w-full md:w-1/2 h-1/2 md:h-full overflow-hidden flex justify-center items-center">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`slide-${index}`}
            className={`absolute w-[90%] h-[90vh] object-cover transition-opacity duration-1000  rounded-[3%] ${
              index === currentImage ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}

        {/* Welcome Back and Description */}
        <div className="absolute bottom-20 pl-6 text-white text-center">
          <h2 className="text-5xl font-bold">Welcome Back to SAIL Dashboard</h2>
          <p className="text-lg mt-2 ">
            Access your personalized dashboard to manage tasks, monitor progress, and stay connected
            with SAIL operations.
          </p>
        </div>
      </div>

      {/* Right Side Form */}
      <div className="flex items-center justify-center w-full md:w-1/2 bg-white p-10">
        <div className="w-[65%] outline-none">
          <div className="flex justify-center mb-6">
            <img src="/sail_logo.png" alt="SAIL Logo" className="h-[15rem]" />
          </div>
          <h2 className="text-[2.5rem] font-[600] text-[#053375] text-center mb-4">Sign in Now</h2>
          <form>
            <div className="relative">
              <MdOutlineMail className="absolute text-[2rem] text-[#626262] top-[15%] left-2" />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 border  mb-4 outline-none border-[#B0B0B0] rounded-xl pl-12"
                required
              />
            </div>
            <div className="relative">
              <CiLock className="absolute text-[2rem] text-[#626262] top-[15%] left-2" />
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 border  mb-4 outline-none border-[#B0B0B0] rounded-xl pl-10"
                required
              />
            </div>
            <div className="flex justify-end items-center text-sm mb-4">
              <a href="#" className="text-blue-600">
                Forgot password?
              </a>
            </div>

            <button type="submit" className="w-full bg-[#053375] text-white py-3 rounded-xl mb-4">
              Log in
            </button>
          </form>

          <p className="text-center text-sm mb-4 text-[#626262] text-[1.3rem]">
            Have no account yet?
          </p>
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
