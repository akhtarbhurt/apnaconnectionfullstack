

import React, { useState, useEffect } from 'react';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { greenStar, profile } from '../assets/images';
import Looter from './Looter';
import axios from "axios";
import { Button, Modal, Rate } from 'antd';
import "../App.css";
import { Spin } from "antd";
import { IoMdNotificationsOutline } from "react-icons/io";


axios.defaults.withCredentials = true;

export default function UserDashboard() {
  const [togetdata, settogetdata] = useState({});
  const [reviewdata, setreviewdata] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentReview, setCurrentReview] = useState({});
  const [review, setreview] = useState("");
  const [rating, setrating] = useState(0);
  const [id ,setid] = useState("")
const[loading,setloading]= useState(false)

///reviews/:id



  useEffect(() => {
    function apicallinglogin() {
      axios
        .get("http://localhost:3000/api/v1/login")
        .then((res) => {
          console.log("loginresponse ok",res.data.msg._id)
          settogetdata(res.data.msg);
        })
        .catch((err) => {
          console.log("err", err);
        });
    }

    apicallinglogin();
  }, []);

  function apicalling() {
    axios
      .get(`http://localhost:3000/api/v1/userReviews/${togetdata._id}`)
      .then((res) => {
console.log("reveiw",res)
        setreviewdata(res.data.payload);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }

  useEffect(() => {
    if (togetdata._id) {
     
      apicalling();
    }
  }, [togetdata]);

  const getTimeDifference = (createdAt) => {
    const prevDate = new Date(createdAt);
    const currentDate = new Date();
    const diffTime = currentDate - prevDate;
    const diffSeconds = Math.floor(diffTime / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffMonths / 12);

    if (diffYears > 0) return `${diffYears} years ago`;
    if (diffMonths > 0) return `${diffMonths} months ago`;
    if (diffDays > 0) return `${diffDays} days ago`;
    if (diffHours > 0) return `${diffHours} hours ago`;
    if (diffMinutes > 0) return `${diffMinutes} minutes ago`;
    return `${diffSeconds} seconds ago`;
  };

  const showModal = (review) => {

console.log("data",review._id)
setid(review._id)
    setCurrentReview(review);
    setreview(review.review);
    setrating(review.rating);
    setIsModalOpen(true);

  };

  function Deleteblogfunc(dele){
    setloading(true)
console.log("delete",dele._id)
let id = dele._id
// setid()
axios
.delete(`http://localhost:3000/api/v1/reviews/${id}`,{id})
.then((res) => {
  console.log("res",res)
  setloading(false)
  apicalling()
// setid("")
})
.catch((err) => {
  console.log("err", err);
});
  }

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setid("")
  };

  const handleupdatedatafunction = (e) => {
    setloading(true)
    e.preventDefault();
    console.log("Updated review:", review);
    console.log("Updated rating:", rating);

    axios
    .put(`http://localhost:3000/api/v1/reviews/${id}`,{review, rating})
    .then((res) => {
      console.log("res",res)
      apicalling()
setid("")
    })
    .catch((err) => {
      console.log("err", err);
    });
    setloading(false)
    setIsModalOpen(false);
  };

  const handleRatingChange = (value) => {
    setrating(value);
  };

  const updatetextarea = (e) => {
    setreview(e.target.value);
  };

  return (
    <>
      <div className='bg-blue-700 h-[25vh] xs:px-3'>
        <div className='max-w-4xl m-auto'>
          <div className='flex justify-between items-center pt-16 text-white'>
            <div className='flex gap-5 items-center'>
              <img src={profile} className='object-contain h-20 w-20' alt="user profile" />
              <span className='text-nowrap'>Zeeshan Adil</span>
            </div>
            <div className='flex gap-3'>
              <div>
                <div className=' flex justify-center relative'>
              <IoMdNotificationsOutline  className=' text-[30px]'/>
              <div className='bg-customOrange rounded-full h-[25px] w-[25px] text-center absolute left-8 flex justify-center items-center text-[14px]'>12</div>
              </div>
              <p>reviews</p>
              </div>
              
              
            </div>
          </div>
        </div>
      </div>
      <div className='max-w-7xl mx-auto flex gap-3 flex-col sm:flex-col md:flex-col lg:flex-row mt-10'>
        <div className='w-full sm:w-full md:w-full lg:w-5/5'>
          {reviewdata.map((data, ind) => (
            <div key={ind} className='shadow-lg p-2 mt-10 my-2'>
              <div className='flex justify-between'>
                <div className='flex gap-5 items-center'>
                  <img src={togetdata.profileImageURL} alt="user profile" className='h-20 w-20' />
                  <div>
                    <p className='text-customOrange'>{togetdata.name}</p>
                  </div>
                  <div className='flex flex-col gap-1 items-center'>
                    <Rate className='text-[18px]' value={data.rating} disabled></Rate>
                  </div>
                </div>
                <div>
                  <p>{getTimeDifference(data.createdAt)}</p>
                </div>
              </div>
              <div className='mt-2'>
                <p>{data.review}</p>
              </div>
              <div className='flex justify-between mt-3 userdashboardpopup'>
                <div className='relative'>
                  <MdDelete className='absolute top-2 left-1 text-white' />
                  <button className='bg-red-500 p-1 px-5 rounded-sm text-white w-24' id={data._id} onClick={() => Deleteblogfunc(data)}>Delete</button>
                  {loading?
                  <Spin  className=' ml-1'/>:""
                }
                </div>
                <div className='bg-slate-500 flex gap-3 text-white p-1 items-center w-24 justify-center rounded-sm'>
                  <FaEdit />
                  <Button id={data._id} className='' type="primary"  onClick={() => showModal(data)}>
                    Edit
                  </Button>
                  <Modal

        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null} // Hide the default footer
      >
        <form className='flex flex-col justify-center items-center'  onSubmit={handleupdatedatafunction}>
          <textarea
            className='border-2 border-orange-500 w-11/12 h-[19vh]'
            placeholder='Update your review'
            value={review}
            onChange={updatetextarea}

          />
          <Rate className='my-3 text-[22px]' value={rating} onChange={handleRatingChange} />
          <button  className='mt-2 bg-blue-600 px-4 py-2 text-white cursor-pointer' type='submit'>
            Submit
          </button>
          {loading?
          <Spin className=' mt-2'/>:""
        }
        </form>
      </Modal>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
     
      <Looter />
    </>
  );
}

