import usecotextFunction from '../utils/useContext';
import React, { useState,useEffect } from 'react'
import { coverImage, insuranceImg, insuranceImg2, logo, parallax } from '../../src/assets/images';
import { Link  } from 'react-router-dom';
import { Button, Dropdown, Space } from "antd";
import { RxHamburgerMenu } from "react-icons/rx";

export default function Navbar() {
 
const [isSticky,setIsSticky] = useState(true)

  const [hambergexp,setHambergexp] = useState(false);
  const [hamberg,setHamberg] = useState(true);
  const { profile, setprofile,profilesrc, setprofilesrc,dashboard,setDashboard } = usecotextFunction();



  // ==================getting data from local storage ========

setprofile(localStorage.getItem("apnaconnectionprofile"));
  setprofilesrc(localStorage.getItem("tokenapnaconnection"));
  setDashboard(localStorage.getItem("apnaconnectionadmin"));

  // ==================getting data from local storage ========

  // =====ant design============


  const items = [
    {
      key: "1",
      label: <Link to={"/userprofile"}>Profile</Link>,
    },
    {
      key: "2",
      label: <Link to={"/logout"}>LogOut</Link>,
    }
  ];


    useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    console.log("setprofilesrc,",profilesrc)
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

function hambergfunc(){
  setHamberg(false)
  setHambergexp(true)
}

function hambergfuncclose(){
  setHamberg(true)
  setHambergexp(false)
}

  return (
    <div className='  h-full'>
      <nav className={`xs:hidden sm:flex  w-full shadow-lg justify-evenly pb-3  items-center pt-4 ${isSticky ? 'fixed top-0 z-50 bg-white shadow-md pt-4 pb-4' : ''}`} >
        <div className=' lg:w-4/12  '>
          <Link to={'/'}>
          <img src={logo} className=" h-12" alt="" />
          </Link>
        </div>
        <ul className="flex  text-lg items-center lg:w-5/12 justify-end gap-6 ">
  
          <li><Link to={'/apnanews'} className=' font-bold hover:text-orange-500 '>News</Link> </li>
          
          <li>
            <div>
             <Link to={'/businesshomepage'}><button className="border border-customOrange p-2  text-black font-bold  hover:bg-orange-500 hover:text-white">For Business</button></Link> 
             
            </div>

           
          </li>
{profile !=="false" && dashboard!=="false"?
          <li className=' font-bold'>
              <Link to={'/dashboard'} className=' hover:text-orange-500'>Dashboard</Link>
            </li>
            :""
}            
          
          {profile!=="false"? <Space direction="vertical" className=' '>
                <Space wrap>
                  <Dropdown
                    menu={{
                      items,
                    }}
                    placement="bottom"
                  >
                    <img
                      className=" h-[40px] w-[40px] cursor-pointer rounded-full"
                      src={profilesrc}
                      alt=""
                    />
                    {/* <Button>bottomq</Button> */}
                  </Dropdown>
                </Space>
              </Space>:
             <>
              <Link to={"/login"} className=" hover:text-orange-500 font-bold">
                login
              </Link>
              <Link to={"/register"} className="hover:text-orange-500 font-bold">
                sign up
              </Link>
              </>  
              }


        </ul>
      </nav>

{
  hamberg?
      <nav onClick={()=>hambergfunc()} className='navhamberg cursor-pointer flex justify-end mr-[4px] mt-[5px] min-[500px]:hidden text-[32px]'>

 <RxHamburgerMenu />
      </nav>
      :""
}
{

hambergexp? 
<div className="border-2 border-black bg-blue-600 relative w-screen h-[17.75rem] flex flex-col justify-around   pl-[0.425rem] md:hidden">
                
                <p className=" text-white">
                  <Link className=" cursor-pointer" to={"/apnanews"}>News</Link>{" "}
                </p>
               
                <p className="">
                  <Link to={"/businesshomepage"} className=" text-white cursor-pointer"> For Business </Link>
                </p>
                <p
                  onClick={() => hambergfuncclose()}
                  className=" text-[1.85rem] cursor-pointer mr-3 absolute right-1 top-2 text-white"
                >
                  x
                </p>
                
{dashboard!=="false"?
                <p className="text-white">
                  <Link className=" cursor-pointer" to={"/dashboard"}> Dashboard </Link>
                </p>:
                ""
}
                {/* ========insert logo========= */}

                {profile!=="false"? <Space direction="vertical">
                <Space wrap>
                  <Dropdown
                    menu={{
                      items,
                    }}
                    placement="right"
                  >
                    <img
                      className=" h-[40px] w-[40px] cursor-pointer rounded-full"
                      src={profilesrc}
                      alt=""
                    />
                    {/* <Button>bottomq</Button> */}
                  </Dropdown>
                </Space>
              </Space>:
             <>
              <Link to={"/login"} className=" hover:text-orange-500">
                login
              </Link>
              <Link to={"/register"} className="hover:text-orange-500">
                sign up
              </Link>
              </>  
              }
               
              </div>
              :""

}


    </div>
  )
}










// ===========================position fixed alternate professional conding


// import React, { useEffect, useState } from 'react';
// import { coverImage, insuranceImg, insuranceImg2, logo, parallax } from '../assets/images';
// import { Link } from 'react-router-dom';

// export default function Navbar() {
//   const [isSticky, setIsSticky] = useState(false);
//   const [hamburgExp, setHamburgExp] = useState(false);
//   const [hamburg, setHamburg] = useState(true);

//   function hamburgFunc() {
//     setHamburg(false);
//     setHamburgExp(true);
//   }

//   function hamburgFuncClose() {
//     setHamburg(true);
//     setHamburgExp(false);
//   }

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 200) {
//         setIsSticky(true);
//       } else {
//         setIsSticky(false);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);

//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   return (
//     <div className='h-full'>
//       <nav className={`xs:hidden sm:flex w-full justify-evenly items-center ${isSticky ? 'fixed top-0 z-50 bg-white shadow-md p-2' : ''}`}>
//         <div>
//           <Link to={'/'}>
//             <img src={logo} className="h-16" alt="" />
//           </Link>
//         </div>
//         <ul className="flex gap-10 text-lg items-center">
//           <li><Link to={'/login'}>Login</Link></li>
//           <li><Link to={'/apnanews'}>News</Link></li>
//           <li><Link to={'/register'}>Signup</Link></li>
//           <li>
//             <div>
//               <Link to={'/businesshomepage'}>
//                 <button className="border border-customOrange p-2 bg-[#EE6839] text-white">For Business</button>
//               </Link>
//             </div>
//           </li>
//         </ul>
//       </nav>

//       {hamburg ? (
//         <nav onClick={hamburgFunc} className='navhamburg cursor-pointer flex justify-end mr-[4px] mt-[5px] min-[500px]:hidden'>
//           <div className='h-[2.188rem] w-[2.188rem] border-2 border-black flex flex-col justify-around rounded-lg'>
//             <p className='w-full h-[0.063rem] border-[0.063rem] border-black'></p>
//             <p className='w-full h-[0.063rem] border-[0.063rem] border-black'></p>
//             <p className='w-full h-[0.063rem] border-[0.063rem] border-black'></p>
//           </div>
//         </nav>
//       ) : null}

//       {hamburgExp ? (
//         <div className='border-2 border-black w-full h-[18.75rem] flex flex-col justify-around pl-[0.125rem] min-[500px]:hidden'>
//           <p><Link to={'/login'}>Login</Link></p>
//           <p><Link to={'/apnanews'}>News</Link></p>
//           <p><Link to={'/register'}>Signup</Link></p>
//           <p><Link to={'/businesshomepage'}>For Business</Link></p>
//           <p onClick={hamburgFuncClose} className='text-[1.25rem] cursor-pointer'>x</p>
//         </div>
//       ) : null}
//     </div>
//   );
// }