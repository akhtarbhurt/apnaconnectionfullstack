import React from "react";
import Navbar from "./Navbar";
import axios from "axios";
import usecotextFunction from "../utils/useContext";
axios.defaults.withCredentials = true;
import { useState, useEffect } from "react";
import { logo } from "../assets/images";
import { Spin } from "antd";
import Popup from "./Popup";
import { toast } from "react-toastify";



const UserProfile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [file, setFile] = useState(null);
  const [loader, setLoader] = useState(false);
  const [id, setId] = useState('');
  const { profile, setprofile, profilesrc, setprofilesrc } =
    usecotextFunction();

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/profile")
      .then((res) => {
        console.log("token matched", res.data.user,res.data.user._id, "statevalue");
        setprofile(true);
        setprofilesrc(res.data.user.profileImageURL);
        console.log("setprofilesrc", profilesrc);
        setId(res.data.user._id);
        console.log( "my real id is", id)
      })
      .catch((err) => {
        console.log("token not matched", err);
        setprofile(false);
      });
  }, [ id]);

  const handleprofileupdate = (e) => {
    e.preventDefault();
    if (email) {
      setLoader(true);
      const formdata = new FormData();
      formdata.append("name", name);
      formdata.append("email", email);
      formdata.append("password", password);
      formdata.append("profileImageURL", file || profilesrc);
      axios.post(`http://localhost:3000/api/v1/profile/6662edebfbd3b3a241d62aee`, formdata)
        .then((res) => {
          console.log("profile", res);
          setLoader(false);
          toast.success("profile Edited succesfully");
        })
        .catch((err) => {
          console.log("profile error", err);
          setLoader(false);
          toast.error("err.response.data.msg");
        });
    } else {
      alert("please enter email");
    }
  };
  return (
    <>
      <Navbar />
      <div className=" mt-[81px] w-full h-screen flex justify-center items-center">
        <form
          onSubmit={handleprofileupdate}
          encType="multipart/form-data"
          className=" border-[3px] border-blue-500 shadow-lg   xs:w-full xs:h-5/6 lg:flex lg:justify-around lg:w-6/12 lg:h-3/5 items-center"
        >
          <div className=" md:flex md:items-center lg:block">
            <div className="xs:h-[100px] xs:w-[100px] lg:h-[200px] lg:w-[200px] rounded-full  bg-slate-400 flex justify-around items-center  flex-col">
              <img src={profilesrc} alt="" className="h-[150px] w-[150px]" />
            </div>
            <div className=" mt-3">
              <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            </div>
          </div>

          <div className="xs:w-full lg:w-6/12">
            <div className=" w-full">
              <div className=" w-full flex justify-center mt-4 items-center">
                <label htmlFor="name" className=" mr-3 w-3/12">
                  <strong>Name</strong>
                </label>
                <input
                  type="name"
                  placeholder="Enter Name"
                  //   autoComplete="off"
                  aria-label="name"
                  onChange={(e) => setName(e.target.value)}
                  name="name"
                  className="form-control border-2 rounded-0  w-8/12 p-1"
                />
              </div>
              <div className=" w-full flex justify-center mt-4 items-center">
                <label htmlFor="email" className=" mr-3 w-3/12">
                  <strong>Email</strong>
                </label>
                <input
                  type="email"
                  placeholder="Enter Email"
                  aria-label="email"
                  onChange={(e) => setEmail(e.target.value)}
                  //   autoComplete="off"
                  name="email"
                  className="form-control border-2 rounded-0 w-8/12 p-1"
                />
              </div>
              <div className=" w-full flex justify-center mt-4 items-center">
                <label htmlFor="password" className=" mr-3 w-3/12 ">
                  <strong>Change Password</strong>
                </label>
                <input
                  type="password"
                  placeholder="Update password"
                  aria-label="password"
                  onChange={(e) => setPassword(e.target.value)}
                  //   autoComplete="off"
                  name="password"
                  className="form-control border-2 rounded-0 w-8/12 p-1"
                />
              </div>
              <div className=" w-full flex justify-center mt-4 items-center">
                <button
                  type="submit"
                  className="bg-blue-600 p-2 text-white w-10/12 rounded-lg hover:bg-orange-500"
                >
                  Send
                </button>
              </div>

              <div>
                <img
                  src={logo}
                  className=" w-8/12 ml-auto mr-auto h-16 mt-3"
                  alt=""
                />
              </div>

              {loader ? (
                <div className="example text-center mt-1">
                  <Spin />
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};











export default UserProfile;
