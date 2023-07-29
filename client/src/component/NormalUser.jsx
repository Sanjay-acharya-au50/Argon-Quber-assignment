import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AiFillLinkedin } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

const NormalUser = () => {
  const [exist, setExist] = useState();
  const navigate = useNavigate();

  const handleNormalUserLogout = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/normalUserLogout");
      console.log(res);
      if (res.status === 202) {
        navigate("/login");
      }
    } catch (error) {
      navigate("/login");
      console.log(error);
    }
    console.log("logout");
  };

  useEffect(() => {
    const fun = async () => {
      try {
        const res = await axios("/normalUserGet");
        console.log(res);
        if (res.status === 203) {
          setExist(res.data);
        }
      } catch (error) {
        navigate("/login");
        console.log(error);
      }
    };
    fun();
  }, []);

  const handleLinkedinLogin = () => {
    // Redirect the user to the Google OAuth login page
    window.location.href = "http://localhost:5000/auth/linkedin";
  };
  const handleGoogleLogin = () => {
    // Redirect the user to the Google OAuth login page
    window.location.href = "http://localhost:5000/auth/google";
  };

  return (
    <div>
      {exist && (
        <motion.div
          className="border p-2 m-5 bg-white shadow-2xl w-[350px] md:w-[400px] sticky top-0"
          initial={{ opacity: 0.5 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          exit={{ opacity: 0, scale: 0 }}
        >
          <div className="flex justify-around items-center p-3 bg-white ">
            <div className="bg-black h-[70px] w-[70px] rounded-[50%] text-white flex justify-center items-center overflow-hidden "></div>
            <div className="bg-white flex">
              <button
                className="bg-red-500 text-white p-2 rounded-lg m-1 w-[70px] justify-center items-center"
                onClick={handleNormalUserLogout}
              >
                Logout
              </button>
            </div>
          </div>

          <div className="ml-[40px] font-bold ">
            <div className="mt-2 bg-white">userName : {exist.userName}</div>
            <div className="bg-white">firstName : {exist.firstName}</div>
            <div className="bg-white">lastName : {exist.lastName}</div>
            <div className="bg-white">email : {exist.email}</div>
          </div>
          <div className="w-full flex flex-col justify-center items-center bg-white">
            <button
              onClick={handleLinkedinLogin}
              className="m-2 flex justify-center items-center gap-2 border p-2  text-[14px] w-full hover:bg-black hover:text-white duration-700 "
            >
              <AiFillLinkedin className="bg-white text-[20px] text-blue-800 hover:text-white duration-700" />
              Login Linkedin
            </button>
            <button
              onClick={handleGoogleLogin}
              className="m-2 flex justify-center items-center gap-2 border p-2  text-[14px] w-full hover:bg-black hover:text-white duration-700"
            >
              <FcGoogle className="bg-white text-[20px]" />
              Login Google
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default NormalUser;
