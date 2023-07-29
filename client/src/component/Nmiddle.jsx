import React, { useContext, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { BiSolidSend } from "react-icons/bi";
import axios from "axios";
import { Context } from "../context/Context";
import { useNavigate } from "react-router-dom";

const Nmiddle = () => {
  const navigate = useNavigate();
  const { post, setPost } = useContext(Context);
  const [files, setFile] = useState("");
  const fileInputRef = useRef(null);

  const [blog, setSetBlog] = useState("");

  const handleSUbmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      // 'files' imp!!!!!!!!!!!!!
      if (files) {
        data.set("files", files);
      } else {
        alert("upload a file");
      }

      data.set("blog", blog);
      const res = await axios.post("/userPost", data);
      console.log(res);
      if (res.status === 201) {
        setPost([...post, res.data]);
        setSetBlog("");
        setFile("");
         if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
      setFile("");
     
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fun = async () => {
      try {
        const res = await axios("/getManualUserData");
        console.log(res);
        if (res.status === 201) {
          navigate("/profile");
          setPost(res.data);
        }
      } catch (error) {
        navigate("/login");
        console.log(error);
      }
    };
    fun();
  }, []);

  console.log("post", post);
  console.log("blog", blog);
  console.log("file", files);

  return (
    <motion.div className="flex  flex-col m-7 w-full gap-3">
      <motion.div
        className=" w-full  flex justify-center items-center "
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: false }}
        exit={{ opacity: 0, scale: 0 }}
      >
        <form
          onSubmit={handleSUbmit}
          className=" flex justify-between bg-white shadow-2xl w-full rounded-2xl p-2 "
        >
          <div className=" bg-white flex flex-col md:justify-center md:items-start w-[200px] md:w-full">
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              ref={fileInputRef}
              className="bg-white m-1 md:text-[15px] text-[12px]"
            />
            <input
              type="text"
              onChange={(e) => setSetBlog(e.target.value)}
              value={blog}
              className=" bg-white w-[200px] md:w-full p-2 text-[13px]"
              placeholder="What's Up..!!"
            />
          </div>
          <button className="flex justify-center items-center bg-white ">
            <BiSolidSend className="text-black bg-white hover:text-blue-500 duration-500 text-[25px] md:text-4xl md:m-2" />
          </button>
        </form>
      </motion.div>
      {post
        ? post.map((e,i) => {
            return (
              <motion.div key={i}
                className=" md:flex items-center w-full md:h-[220px] bg-white shadow-2xl "
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: false }}
                exit={{ opacity: 0, scale: 0 }}
              >
                <div className="flex md:flex-row flex-col justify-center items-center  p-2 bg-white ">
                  <img src={e.post} className="h-[190px] w-[190px]" alt="" />
                  <p className="pl-2 bg-white">{e.blog}</p>
                </div>
              </motion.div>
            );
          })
        : "loading"}
    </motion.div>
  );
};

export default Nmiddle;
