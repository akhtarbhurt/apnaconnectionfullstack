

import React, { useState, useEffect } from 'react';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { greenStar, profile } from '../assets/images';
import Looter from './Looter';
import axios from "axios";
import { Button, Modal, Rate } from 'antd';
import "../App.css";

axios.defaults.withCredentials = true;

export default function UserDashboard() {
  const [togetdata, settogetdata] = useState({});
  const [reviewdata, setreviewdata] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentReview, setCurrentReview] = useState({});
  const [review, setreview] = useState("");
  const [rating, setrating] = useState(0);


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

  useEffect(() => {
    if (togetdata._id) {
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
    setCurrentReview(review);
    setreview(review.review);
    setrating(review.rating);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleupdatedatafunction = (e) => {
    e.preventDefault();
    // Handle the update logic here
    console.log("target id",e.target.id)
    console.log("Updated review:", review);
    console.log("Updated rating:", rating);

    axios
    .put(`http://localhost:3000/api/v1/reviews/${e.target.id}`,{review, rating})
    .then((res) => {
      console.log("res",res)
      // settogetdata(res.data.msg);
    })
    .catch((err) => {
      console.log("err", err);
    });

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
      <div className='bg-blue-700 h-[30vh]'>
        <div className='max-w-4xl m-auto'>
          <div className='flex justify-between items-center pt-16 text-white'>
            <div className='flex gap-5 items-center'>
              <img src={profile} className='object-contain h-20 w-20' alt="user profile" />
              <span className='text-nowrap'>Zeeshan Adil</span>
            </div>
            <div className='flex gap-3'>
              <div>
                <div className='bg-customOrange p-5 rounded-full'>12</div>
                <p>reviews</p>
              </div>
              <div>
                <div className='bg-customOrange p-5 rounded-full'>36</div>
                <p>reviews</p>
              </div>
              <div>
                <div className='bg-customOrange p-5 rounded-full'>32</div>
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
                  <div className='                    flex flex-col gap-1 items-center'>
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
                  <button className='bg-red-500 p-1 px-5 rounded-sm text-white w-24'>Delete</button>
                </div>
                <div className='bg-slate-500 flex gap-3 text-white p-1 items-center w-24 justify-center rounded-sm'>
                  <FaEdit />
                  <Button className='' type="primary" onClick={() => showModal(data)}>
                    Edit
                  </Button>
                  <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null} // Hide the default footer
      >
        <form className='flex flex-col justify-center items-center' id={data._id} onSubmit={handleupdatedatafunction}>
          <textarea
            className='border-2 w-9/12'
            placeholder='Update your review'
            value={review}
            onChange={updatetextarea}
          />
          <Rate className='my-3 text-[22px]' value={rating} onChange={handleRatingChange} />
          <button className='mt-2 bg-blue-600 px-4 py-2 text-white cursor-pointer' type='submit'>
            Submit
          </button>
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

