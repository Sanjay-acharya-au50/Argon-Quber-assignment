import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/Context";
import { motion } from "framer-motion";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import Edit from "./Edit";
import ProfileEdit from "./ProfileEdit";
import NormalUser from "./NormalUser";

const Right = () => {
  const [email, setEmail] = useState("");
  // const [Gimage, setGimage] = useState('')
  const [Limage, setLimage] = useState();
  // const [g,setG] = useState('')
  const navigate = useNavigate();
  const [state, setState] = useState();

  const { edit, setEdit } = useContext(Context);
  // console.log(edit)

  const [normalUser, setNormalUser] = useState(true);

  useEffect(() => {
    const fun = async () => {
      try {
        const res = await axios("/");
        console.log(res.data?.cooki);
        if (res.data?.user) {
          console.log("valid User", res.data?.user.photos[0].value);
          // setG(res.data?.user.photos[0].value)
          setLimage(res.data.user.photos[0].value);
          setState(res.data.user);
          setEmail(res.data.user.emails[0].value);
          // setGimage(res.data.user.photos[0].value)
          // setNormalUser(res.data.cooki);
        } 
        else if( res.data?.cooki){
          setNormalUser(true)
        }
        else {
          navigate("/login");
          console.log("not a user redirected to login ");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fun();
  }, []);
  // console.log(g)
  // console.log(email.length)
  // console.log(Gimage)
  // console.log(Limage)
  // console.log(state)

  const logout = async () => {
    try {
      const res = await axios("/logout");
      console.log(res);
      console.log("clicked");
      if (res.status === 200) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className=" h-[40%] w-[98%] m-[2%] sticky top-0 ">
        {state && (
          <div>
            {state ? (
              <motion.div
                className="border p-2 m-5 bg-white shadow-2xl"
                initial={{ opacity: 0.5 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                exit={{ opacity: 0, scale: 0 }}
              >
                <div className="flex justify-around items-center p-3 bg-white ">
                  <div className="bg-black h-[70px] w-[70px] rounded-[50%] text-white flex justify-center items-center overflow-hidden ">
                    {/* <div>
    
              {Gimage && <img src={Gimage} alt="" />}
              </div> */}
                    <div>{Limage && <img src={Limage} alt="" />}</div>
                  </div>
                  <div className="bg-white flex">
                    <Edit />
                    <button
                      className="bg-red-500 text-white p-2 rounded-lg m-1 w-[70px] justify-center items-center"
                      onClick={logout}
                    >
                      Logout
                    </button>
                  </div>
                </div>

                <div className="ml-[40px] font-bold ">
                  <div className="mt-2 bg-white">
                    {state.displayName ? <>{state.displayName}</> : ""}
                  </div>
                  <div className="bg-white">
                    {state.name?.givenName ? (
                      <>First Name : {state.name.givenName}</>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="bg-white">
                    {state.name?.familyName ? (
                      <>Last Name : {state.name.familyName}</>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="bg-white">
                    {state?.firstName ? (
                      <>First Name : {state.firstName}</>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="bg-white">
                    {state?.lastName ? <>Last Name : {state.lastName}</> : ""}
                  </div>
                  <div className="bg-white">
                    {email?.length > 0 && (
                      <>
                        Email : <>{email}</>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="h-[100vh] w-full flex justify-center items-center">
                Loading..
              </div>
            )}
            <>{edit && <ProfileEdit />}</>
          </div>
        )}
        <>
          {normalUser && (
            <NormalUser/>
          )}
        </>
      </div>
    </>
  );
};

export default Right;
