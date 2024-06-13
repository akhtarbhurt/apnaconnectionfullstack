import React, { useState, useEffect } from "react";
import "../App.css";
import { FaFacebookF } from "react-icons/fa";
import { GrGooglePlus } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { IMG60, regImage } from "../assets/images";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import usecotextFunction from "../utils/useContext";
import { Button, Modal, Spin } from "antd";
import Popup from "./Popup";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setemail] = useState();
  const [password, setpassword] = useState();
  const [loader, setloader] = useState(false);
  const [auth, setAuth] = useState({
    email: "",
    password: " ",
  });
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");

  const {
    profile,
    setprofile,
    profilesrc,
    setprofilesrc,
    showLogin,
    setShowLogin,
    dashboard,
    setDashboard,
    setName,
    name,
  } = usecotextFunction();

  // for navbar login signup and role
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/login")

      .then((res) => {

        navigate("/");
        
      })
      .catch((err) => {
        console.log("token not found login page", err);
        setprofile(false);
      });
  }, []);

  const hadlesignin = (e) => {
    e.preventDefault();
    setloader(true);

    axios
      .post("http://localhost:3000/api/v1/login", auth)
      .then((res) => {
        console.log("login successful", res.data);

        const { user, warning } = res.data;

        if (user.role === "admin") {
          localStorage.setItem("apnaconnectionadmin", true);
          setName("riyan");
        } else {
          localStorage.setItem("apnaconnectionadmin", false);
        }

        if (!user.emailVerified) {
          setShowLogin(true);
          toast.error(
            "Please verify your email link has been sent on your email account"
          );
          setloader(false);
        } else {
          localStorage.setItem("tokenapnaconnection", user.profileImageURL);
          localStorage.setItem("apnaconnectionprofile", true);

          setloader(false);
          toast.success("Successfully logged in");

          if (warning) {
            setWarningMessage(warning);
            setIsModalVisible(true);
          } else {
            navigate("/");
          }
        }
      })
      .catch((err) => {
        console.log("error", err);
        setloader(false);
        
        toast.error(err.response.data.message);
      });
  };

  const handleOk = () => {
    setIsModalVisible(false);
    navigate("/");
  };

  return (
    <>
      <Popup />
     
      <div className=" h-full w-full">
        <div className=" h-full w-full flex justify-between overflow-hidden max-[768px]:flex-col">
          <div className=" xs:h-[38.75rem] lg:h-[39.635rem] w-4/12  left flex flex-col justify-around max-[768px]:w-full">
            <div className="flex w-full justify-center items-center max-[768px]:flex-col">
              <div className=" w-9/12 flex justify-center ml-[1.688rem] items-center max-[768px]:ml-[1px]">
                <Link to={"/"}>
                  {" "}
                  <img
                    src="https://www.apnaconnection.com/public/admin-panel/img/logo.png"
                    alt=""
                  />
                </Link>
              </div>
              <div className=" w-3/12 flex justify-center ml-[0.813rem] mt-[0.25rem]  items-center cursor-pointer">
                <Link to={"/"} className=" w-2/12 font-bold text-[22px]">
                  X
                </Link>
              </div>
            </div>
            <div className=" flex justify-center w-full lg:translate-y-[2.25rem]">
              <p className=" w-9/12 flex cursor-pointer items-center bg-[#3c5a9a] text-white p-[0.625rem] rounded-lg max-[320px]:p-[0.375rem] max-[320px]:w-10/12">
                <span>
                  <FaFacebookF />
                </span>
                <span className=" ml-[29px]">Register With Facebook</span>
              </p>
            </div>
            <div className=" flex justify-center w-full lg:translate-y-[1.875rem]">
              <p className=" w-9/12 flex cursor-pointer items-center bg-[#dd4b39] text-white p-[0.625rem] rounded-lg max-[320px]:p-[0.375rem] max-[320px]:w-10/12">
                <span>
                  <GrGooglePlus className=" text-[1.563rem]" />
                </span>
                <span className=" ml-[29px]">Register With Google</span>
              </p>
            </div>

            <div className=" w-full flex justify-center items-center mt-[2.5rem]">
              <p className=" w-4/12 bg-slate-300 h-[1px] flex justify-center items-center max-[320px]:w-5/12"></p>
              <p className=" text-[#767575] flex justify-center items-center h-[1px] w-1/12">
                Or
              </p>
              <p className="bg-slate-300 w-4/12 flex justify-center items-center h-[1px] max-[320px]:w-5/12"></p>
            </div>

            <form onSubmit={hadlesignin}>
              <div className="  flex justify-center w-full  ">
                <div className=" rounded-s-lg w-1/12 flex items-center justify-center border-y-[1px]  border-s-[1px] border-solid h-[2.5rem]">
                  <span>
                    <FaRegCircleUser className=" text-gray-600" />
                  </span>
                </div>
                <input
                  type="email"
                  aria-label="name"
                  onChange={(e) => setAuth({ ...auth, email: e.target.value })}
                  placeholder="Email"
                  className=" rounded-e-lg w-8/12 border-y-[1px]  border-e-[1px] border-solid focus:outline-none  focus:border-s-[2px] focus:border-[#2363ab] focus:border-e-[2px] focus:border-y-[2px]  p-[0.625rem] h-[2.5rem]"
                />
              </div>
              <div className=" flex justify-center w-full mt-[1.25rem]">
                <div className=" rounded-s-lg w-1/12 flex items-center justify-center border-y-[1px]  border-s-[1px] border-solid h-[2.5rem]">
                  <span>
                    <FaRegCircleUser className=" text-gray-600" />
                  </span>
                </div>
                <input
                  type="password"
                  aria-label="password"
                  onChange={(e) =>
                    setAuth({ ...auth, password: e.target.value })
                  }
                  placeholder="Password"
                  className=" rounded-e-lg w-8/12 border-y-[1px]  border-e-[1px] border-solid focus:outline-none  focus:border-s-[2px] focus:border-[#2363ab] focus:border-e-[2px] focus:border-y-[2px]  p-[0.625rem] h-[2.5rem]"
                />
              </div>
              <div className=" flex justify-center w-full mt-[1.25rem]">
                <div className=" w-9/12  rounded-lg  border-solid focus:outline-none focus:border-[2px] focus:border-[#2363ab] p-[0.625rem]">
                  <Spin spinning={loader}>
                    <button
                      type="submit"
                      className=" bg-[#fa490e] p-[0.625rem] text-white w-full rounded-lg cursor-pointer"
                    >
                      Sign In
                    </button>
                  </Spin>
                </div>
              </div>
            </form>
            <div className=" flex justify-center mt-[1.875rem]">
              <p className=" text-[#2363ab] text-[0.813rem] font-bold cursor-pointer">
                Forgot Your Password?
              </p>
            </div>
            <div className=" flex justify-center mt-[2.25rem]">
              <p className=" text-[0.813rem] text-[#818181]">
                Not a member yet?
                <Link to="/register">
                  <span className=" text-[#fa490e] cursor-pointer">
                    {" "}
                    Join Now
                  </span>
                </Link>
              </p>
            </div>
          </div>
          <div className="w-8/12 right max-[768px]:w-full">
            <img src={regImage} className=" w-full h-full" alt="pic" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
