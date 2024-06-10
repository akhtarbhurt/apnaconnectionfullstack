import React, { useState,useEffect } from 'react'
import  {img20,img21,img1,IMG54,IMG55,IMG56,IMG57,IMG58,IMG59} from '../assets/images';
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { Pagination } from 'antd';
import '../App.css'
import { Card } from 'antd'; 
import Navbar from './Navbar';
import Looter from './Looter';
import axios from "axios";
import usecotextFunction from "../utils/useContext";
axios.defaults.withCredentials = true;

const ApnaNews = () => {

  
  const { profile, setprofile,profilesrc, setprofilesrc } = usecotextFunction();


  // for navbar login signup and role
useEffect(()=>{
  axios
  .get("http://localhost:3001/")
  .then((res) => {
    console.log("token matched", res.data,"statevalue",profile);
    setprofilesrc(res.data.profileImageURL)
    console.log("setprofilesrc",profilesrc)
    setprofile(true)
  })
  .catch((err) => {
    console.log("token not matched", err);
    setprofile(false)
  });
},[])




const [pagenumber, setPagenumber] = useState(1)
  
const [data, setData] = useState([])
const [firstindex,setfirstindex] = useState(0)
const [lastindex,setlastindex] = useState(6)
const [productsdata, setproductsdata] =useState([])

async function fetchdata(){
  try{
    // const response = await fetch('https://fakestoreapi.com/products/');
    // const answer = await response.json();
    let answer =  [
            {bannerimg:IMG54,text:"Quodsi sanctus pro eu, ne audire scripserit quo. Vel an enim offendit salutandi, in eos quod omnes epicurei, ex veri qualisque scriptorem mei",img:img21,admin:"admin",twenty:1},
            {bannerimg:IMG55,text:"Quodsi sanctus pro eu, ne audire scripserit quo. Vel an enim offendit salutandi, in eos quod omnes epicurei, ex veri qualisque scriptorem mei",img:img21,admin:"admin",twenty:2},
            {bannerimg:IMG56,text:"Quodsi sanctus pro eu, ne audire scripserit quo. Vel an enim offendit salutandi, in eos quod omnes epicurei, ex veri qualisque scriptorem mei",img:img21,admin:"admin",twenty:3},
            {bannerimg:IMG57,text:"Quodsi sanctus pro eu, ne audire scripserit quo. Vel an enim offendit salutandi, in eos quod omnes epicurei, ex veri qualisque scriptorem mei",img:img21,admin:"admin",twenty:4},
            {bannerimg:IMG58,text:"Quodsi sanctus pro eu, ne audire scripserit quo. Vel an enim offendit salutandi, in eos quod omnes epicurei, ex veri qualisque scriptorem mei",img:img21,admin:"admin",twenty:5},
            {bannerimg:IMG59,text:"Quodsi sanctus pro eu, ne audire scripserit quo. Vel an enim offendit salutandi, in eos quod omnes epicurei, ex veri qualisque scriptorem mei",img:img21,admin:"admin",twenty:6},
            {bannerimg:IMG54,text:"Quodsi sanctus pro eu, ne audire scripserit quo. Vel an enim offendit salutandi, in eos quod omnes epicurei, ex veri qualisque scriptorem mei",img:img21,admin:"admin",twenty:7},
            {bannerimg:IMG55,text:"Quodsi sanctus pro eu, ne audire scripserit quo. Vel an enim offendit salutandi, in eos quod omnes epicurei, ex veri qualisque scriptorem mei",img:img21,admin:"admin",twenty:8},
            {bannerimg:IMG56,text:"Quodsi sanctus pro eu, ne audire scripserit quo. Vel an enim offendit salutandi, in eos quod omnes epicurei, ex veri qualisque scriptorem mei",img:img21,admin:"admin",twenty:9},
            {bannerimg:IMG57,text:"Quodsi sanctus pro eu, ne audire scripserit quo. Vel an enim offendit salutandi, in eos quod omnes epicurei, ex veri qualisque scriptorem mei",img:img21,admin:"admin",twenty:10},
            {bannerimg:IMG58,text:"Quodsi sanctus pro eu, ne audire scripserit quo. Vel an enim offendit salutandi, in eos quod omnes epicurei, ex veri qualisque scriptorem mei",img:img21,admin:"admin",twenty:11},
            {bannerimg:IMG59,text:"Quodsi sanctus pro eu, ne audire scripserit quo. Vel an enim offendit salutandi, in eos quod omnes epicurei, ex veri qualisque scriptorem mei",img:img21,admin:"admin",twenty:12},
            {bannerimg:IMG54,text:"Quodsi sanctus pro eu, ne audire scripserit quo. Vel an enim offendit salutandi, in eos quod omnes epicurei, ex veri qualisque scriptorem mei",img:img21,admin:"admin",twenty:13},
            {bannerimg:IMG55,text:"Quodsi sanctus pro eu, ne audire scripserit quo. Vel an enim offendit salutandi, in eos quod omnes epicurei, ex veri qualisque scriptorem mei",img:img21,admin:"admin",twenty:14},
            {bannerimg:IMG56,text:"Quodsi sanctus pro eu, ne audire scripserit quo. Vel an enim offendit salutandi, in eos quod omnes epicurei, ex veri qualisque scriptorem mei",img:img21,admin:"admin",twenty:15},
            {bannerimg:IMG57,text:"Quodsi sanctus pro eu, ne audire scripserit quo. Vel an enim offendit salutandi, in eos quod omnes epicurei, ex veri qualisque scriptorem mei",img:img21,admin:"admin",twenty:16},
            {bannerimg:IMG58,text:"Quodsi sanctus pro eu, ne audire scripserit quo. Vel an enim offendit salutandi, in eos quod omnes epicurei, ex veri qualisque scriptorem mei",img:img21,admin:"admin",twenty:17},
            {bannerimg:IMG59,text:"Quodsi sanctus pro eu, ne audire scripserit quo. Vel an enim offendit salutandi, in eos quod omnes epicurei, ex veri qualisque scriptorem mei",img:img21,admin:"admin",twenty:18},
            {bannerimg:IMG54,text:"Quodsi sanctus pro eu, ne audire scripserit quo. Vel an enim offendit salutandi, in eos quod omnes epicurei, ex veri qualisque scriptorem mei",img:img21,admin:"admin",twenty:19},
            {bannerimg:IMG55,text:"Quodsi sanctus pro eu, ne audire scripserit quo. Vel an enim offendit salutandi, in eos quod omnes epicurei, ex veri qualisque scriptorem mei",img:img21,admin:"admin",twenty:20},
            {bannerimg:IMG56,text:"Quodsi sanctus pro eu, ne audire scripserit quo. Vel an enim offendit salutandi, in eos quod omnes epicurei, ex veri qualisque scriptorem mei",img:img21,admin:"admin",twenty:21},
            {bannerimg:IMG57,text:"Quodsi sanctus pro eu, ne audire scripserit quo. Vel an enim offendit salutandi, in eos quod omnes epicurei, ex veri qualisque scriptorem mei",img:img21,admin:"admin",twenty:22},
            {bannerimg:IMG58,text:"Quodsi sanctus pro eu, ne audire scripserit quo. Vel an enim offendit salutandi, in eos quod omnes epicurei, ex veri qualisque scriptorem mei",img:img21,admin:"admin",twenty:23},
            {bannerimg:IMG59,text:"Quodsi sanctus pro eu, ne audire scripserit quo. Vel an enim offendit salutandi, in eos quod omnes epicurei, ex veri qualisque scriptorem mei",img:img21,admin:"admin",twenty:24}
           ]
setData(answer)

setproductsdata(answer.slice(0,6))


  }
  catch (error) {
    // Handle errors gracefully
    console.error('Error fetching data:', error.message);
  }
}

useEffect(()=>{
  fetchdata()
},[])

const handlePageChange = (pageNumber) => {
  setPagenumber( pageNumber)
  console.log("Selected Page:", pageNumber);

if(data.length >= pageNumber*(6) ){


 setproductsdata(data.slice(pageNumber*(6)-6,pageNumber*6))
}
else{
  alert("product finished go back")
  setproductsdata([])
}
}


  return (

    <>
    <Navbar />
    <div className=' mt-[1.45rem] p-0 w-full bg-[#EEF3F7] apnanewspage'>


{/* ================topimage================= */}

<div className='m-0 Apnanewsbgpic w-full mt-[-0.188rem] p-0 flex justify-center items-center bg-[#091b2a]'>
<div>
<h1 className=' text-center text-white font-normal text-[1.875rem] md:text-[2.875rem]'>Apna Connection News</h1>
<p className=' text-center text-white text-[0.9113rem] md:text-[1.313rem]'>Apna Connection helps grow your business using customer reviews</p>
</div>
</div>


{/* ============cards ========== */}
<div className=' w-full flex justify-center mt-[0.625rem]'>
<div className=' w-full  flex justify-center xs:flex-col md:flex-row md:w-11/12 lg:w-9/12'>

<div className='left w-11/12 xs:order-1 xs:ml-auto xs:mr-auto md:w-9/12 md:order-0 md:ml-[0px] md:mr-[0px] '>
<div className=' w-full flex justify-around flex-wrap '>





{/* =============antd================ */}

{
productsdata.map((dat,ind)=>(
<div key={ind} className=' w-11/12 border-2 shadow-lg mt-[0.75rem] md:w-5/12'>
<img src={dat.bannerimg} loading='lazy' className=' w-full' alt="" />
<div className="full flex justify-center">
<div className=' w-full  text-[0.75rem] text-[#555555] font-normal 
md:text-[0.875rem] mb-[1.188rem] ml-[0.75rem] text-left'>{dat.text}</div>
</div>
<hr />
<div className=' flex justify-between px-[0.5rem] items-center py-[0.625rem]'>
    <div className=' flex items-center'>
        <div className=' mx-[0.5rem]'><img loading='lazy' src={dat.img} alt="" /></div>
        <p>{dat.admin}</p>
    </div>
    <div className=' mx-[0.5rem]'>{dat.twenty}</div>
</div>
</div>
))
  }




</div>



{/* =============bottom paination antd============ */}
<div  className='parent flex justify-center mt-[0.75rem]'>

<Pagination  defaultCurrent={1} total={40} onChange={handlePageChange}/>

</div>
</div>  





{/* ===========right data =============== */}
<div className=' mt-[2.188rem] xs:w-11/12 xs:ml-auto xs:mr-auto  right md:w-3/12 md:order-1 md:mr-[0px] md:ml-[0px] md:mt-[1rem]' >
<div className=' w-full relative '>
    <input type="text" aria-label='search-result'  className=' p-[6px] border-[1px] border-gray-200 w-full'/>
    <button className=' text-white bg-[#3578FA] absolute right-[2px] top-[6px] text-[0.813rem] p-[4px] rounded-md md:right-[7px]'>Search</button>
    </div>

<div className=' mt-[0.75rem] text-[0.938rem] font-normal text-[#222222]'>
    Latest News
</div>
<hr className=' my-[0.813rem]'/>

<div className=' w-full'>
<div className=' flex'>
    <div><img loading='lazy' src={img20} alt="" className=' h-[5rem] w-[5rem]' /></div>
    <div className=' ml-[5px]'>
        <p className=' text-[0.875rem] font-normal text-[#555555]'>Category - 11.08.2016</p>
        <p className=' text-[0.875rem] font-normal text-[#555555]'>Verear qualisque ex minimum...</p>
    </div>
</div>
<div className=' flex mt-[0.625rem]'>
    <div><img src={img20} alt="" className=' h-[5rem] w-[5rem]' /></div>
    <div className=' ml-[5px]'>
        <p className='  text-[0.875rem] font-normal text-[#555555]'>Category - 11.08.2016</p>
        <p className='  text-[0.875rem] font-normal text-[#555555]'>Verear qualisque ex minimum...</p>
    </div>
</div>
<div className=' flex mt-[0.625rem]'>
    <div><img loading='lazy' src={img20} alt="" className=' h-[5rem] w-[5rem]' /></div>
    <div className=' ml-[5px]'>
        <p className=' text-[0.875rem] font-normal text-[#555555]'>Category - 11.08.2016</p>
        <p className=' text-[0.875rem] font-normal text-[#555555]'>Verear qualisque ex minimum...</p>
    </div>
</div>

</div>

<div className=' mt-[0.75rem] font-normal text-[1rem]'>
Categories
</div>

<hr className=' my-[0.813rem]'/>

<div className=' w-full flex justify-between text-[0.875rem] text-[#222222] font-normal'>
    <p className=' '>Food</p>
    <p className=' '>(12)</p>
</div>
<div className=' w-full flex justify-between text-[0.875rem] text-[#222222] font-normal'>
    <p>Places to visit</p>
    <p>(21)</p>
</div>
<div className=' w-full flex justify-between text-[0.875rem] text-[#222222] font-normal'>
    <p>New Places</p>
    <p>(44)</p>
</div>
<div className=' w-full flex justify-between mb-[1.875rem] text-[0.875rem] text-[#222222] font-normal'>
    <p>Suggestions and guides</p>
    <p>(31)</p>
</div>
<div className=' mt-[0.75rem] text-[1rem] text-[#222222] font-normal'>
Popular Tags
</div>
<hr className=' my-[0.813rem]'/>

<div className=' w-10/12 flex justify-around flex-wrap '>
<div className=' text-[0.813rem] text-[#222222] font-normal '>Food</div>
<div className=' text-[0.813rem] text-[#222222] font-normal md:ml-[0.563rem]'>Bars</div>
<div className=' text-[0.813rem] text-[#222222] font-normal md:ml-[0.563rem]'>Cooktails</div>
<div className='text-[0.813rem] text-[#222222] font-normal md:ml-[0.563rem]'>Shops</div>
<div className='text-[0.813rem] text-[#222222] font-normal '>Best Offers</div>
<div className='text-[0.813rem] text-[#222222] font-normal '>Transports</div>
<div className='text-[0.813rem] text-[#222222] font-normal '>Restaurants</div>
</div>

</div>

</div>
</div>



<div className=' mt-[1.875rem]'>
    <Looter />
</div>

    </div>
    </>

  )
}

export default ApnaNews