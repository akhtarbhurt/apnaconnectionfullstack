import React from 'react'
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaRegQuestionCircle } from "react-icons/fa";

import { greenStar, profile } from '../assets/images'
import Looter from './Looter';
export default function UserDashboard() {
  return (
    <>
      <div className='bg-blue-700 h-[30vh]   ' >
        <div className=' max-w-4xl m-auto ' >
          <div className='flex justify-between items-center pt-16 text-white ' >
            <div className=' flex gap-5 items-center ' >
              <img src={profile} className='object-contain  h-20 w-20 ' alt=" user profile " />
              <span className=' text-nowrap' > Zeeshan Adil  </span  >
            </div>
            <div className='flex gap-3' >
              <div>
                <div className='bg-customOrange p-5 rounded-full' >12</div>
                <p  >reviews</p>
              </div>
              <div>
                <div className='bg-customOrange p-5 rounded-full' >36</div>
                <p  >reviews</p>
              </div>
              <div>
                <div className='bg-customOrange p-5 rounded-full' >32</div>
                <p  >reviews</p>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className=' max-w-7xl mx-auto flex gap-3 flex-col sm:flex-col md:flex-col lg:flex-row mt-10   ' >
        {/* cards */}
        {/* this is col 1 */}
        <div className='  w-full sm:w-full md:w-full lg:w-4/5 ' >
          <div className='  shadow-md p-2 '  >
            {/* card content here  */}
            <div className=' flex justify-between ' >
              <div className='flex gap-5' >
                <img src={profile} alt="user profile" className='h-20 w-20' />
                <div>
                  <p className=' text-customOrange' >Zeeshan Adil</p>
                  <p className='text-slate-500' > reviewed </p>
                  <p className='text-blue-800' > faysal bank </p>
                </div>
                <div className='flex flex-col gap-1' >
                  <div className='flex' >
                    <img src={greenStar} alt="rating" className='h-5 w-5' />
                    <img src={greenStar} alt="rating" className='h-5 w-5' />
                    <img src={greenStar} alt="rating" className='h-5 w-5' />
                    <img src={greenStar} alt="rating" className='h-5 w-5' />
                    <img src={greenStar} alt="rating" className='h-5 w-5' />
                  </div>
                  <div className='text-end text-sm' >
                    <span>4.50/5.00</span>
                  </div>
                </div>
              </div>
              <div>
                <p> published 54 minutes ago  </p>
              </div>
            </div>
            <div className='mt-2' >
              <p>“Back in 2018, when TLP DHARNA was in progress and whole Karachi was locked their branches were closed.
                I went all 3 days to the nearest branch to pay my credit card bill but the branch was closed
                After 3 days there was weekend on which branch remain closed so I pay the bill on Monday right after the weekend
                They applied a penalty of PKR 2500/- against which I submitted complaint mentioning the whole scenario but they regret
                I paid the bill excluding the penalty and cut my credit card to end the service
                They kept applying penalties and take the bill to 14014/- and put my name in defaulter
                Still they are calling me repeatedly...”
              </p>
            </div>
            <div className='flex justify-between mt-3 ' >
              <div className='relative' >
                <MdDelete className=' absolute top-2 left-1 text-white ' />
                <button className=' bg-red-500 p-1 px-5 rounded-sm text-white w-24 ' >Delete</button>
              </div>
              <div className=' bg-slate-500 flex gap-3 text-white p-1 items-center w-24 justify-center rounded-sm ' >
                <FaEdit />
                <span>edit</span>
              </div>
            </div>
          </div>
          <div className='  shadow-lg p-2 mt-10 '  >
            {/* card content here  */}
            <div className=' flex justify-between ' >
              <div className='flex gap-5' >
                <img src={profile} alt="user profile" className='h-20 w-20' />
                <div>
                  <p className=' text-customOrange' >Zeeshan Adil</p>
                  <p className='text-slate-500' > reviewed </p>
                  <p className='text-blue-800' > faysal bank </p>
                </div>
                <div className='flex flex-col gap-1' >
                  <div className='flex' >
                    <img src={greenStar} alt="rating" className='h-5 w-5' />
                    <img src={greenStar} alt="rating" className='h-5 w-5' />
                    <img src={greenStar} alt="rating" className='h-5 w-5' />
                    <img src={greenStar} alt="rating" className='h-5 w-5' />
                    <img src={greenStar} alt="rating" className='h-5 w-5' />
                  </div>
                  <div className='text-end text-sm' >
                    <span>4.50/5.00</span>
                  </div>
                </div>
              </div>
              <div>
                <p> published 54 minutes ago  </p>
              </div>
            </div>
            <div className='mt-2' >
              <p>“Back in 2018, when TLP DHARNA was in progress and whole Karachi was locked their branches were closed.
                I went all 3 days to the nearest branch to pay my credit card bill but the branch was closed
                After 3 days there was weekend on which branch remain closed so I pay the bill on Monday right after the weekend
                They applied a penalty of PKR 2500/- against which I submitted complaint mentioning the whole scenario but they regret
                I paid the bill excluding the penalty and cut my credit card to end the service
                They kept applying penalties and take the bill to 14014/- and put my name in defaulter
                Still they are calling me repeatedly...”
              </p>
            </div>
            <div className='flex justify-between mt-3 ' >
              <div className='relative' >
                <MdDelete className=' absolute top-2 left-1 text-white ' />
                <button className=' bg-red-500 p-1 px-5 rounded-sm text-white w-24 ' >Delete</button>
              </div>
              <div className=' bg-slate-500 flex gap-3 text-white p-1 items-center w-24 justify-center rounded-sm ' >
                <FaEdit />
                <span>edit</span>
              </div>
            </div>
          </div>
          <div className='  shadow-lg p-2 mt-10 '  >
            {/* card content here  */}
            <div className=' flex justify-between ' >
              <div className='flex gap-5' >
                <img src={profile} alt="user profile" className='h-20 w-20' />
                <div>
                  <p className=' text-customOrange' >Zeeshan Adil</p>
                  <p className='text-slate-500' > reviewed </p>
                  <p className='text-blue-800' > faysal bank </p>
                </div>
                <div className='flex flex-col gap-1' >
                  <div className='flex' >
                    <img src={greenStar} alt="rating" className='h-5 w-5' />
                    <img src={greenStar} alt="rating" className='h-5 w-5' />
                    <img src={greenStar} alt="rating" className='h-5 w-5' />
                    <img src={greenStar} alt="rating" className='h-5 w-5' />
                    <img src={greenStar} alt="rating" className='h-5 w-5' />
                  </div>
                  <div className='text-end text-sm' >
                    <span>4.50/5.00</span>
                  </div>
                </div>
              </div>
              <div>
                <p> published 54 minutes ago  </p>
              </div>
            </div>
            <div className='mt-2' >
              <p>“Back in 2018, when TLP DHARNA was in progress and whole Karachi was locked their branches were closed.
                I went all 3 days to the nearest branch to pay my credit card bill but the branch was closed
                After 3 days there was weekend on which branch remain closed so I pay the bill on Monday right after the weekend
                They applied a penalty of PKR 2500/- against which I submitted complaint mentioning the whole scenario but they regret
                I paid the bill excluding the penalty and cut my credit card to end the service
                They kept applying penalties and take the bill to 14014/- and put my name in defaulter
                Still they are calling me repeatedly...”
              </p>
            </div>
            <div className='flex justify-between mt-3 ' >
              <div className='relative' >
                <MdDelete className=' absolute top-2 left-1 text-white ' />
                <button className=' bg-red-500 p-1 px-5 rounded-sm text-white w-24 ' >Delete</button>
              </div>
              <div className=' bg-slate-500 flex gap-3 text-white p-1 items-center w-24 justify-center rounded-sm ' >
                <FaEdit />
                <span>edit</span>
              </div>
            </div>
          </div>
        </div>
        {/* this is col 2  */}
        <div className=' w-full sm:w-full md:w-full lg:w-2/5 ' >
          <div className='border  h-[40vh] ' >
            <div className='card  p-4 w-full h-full flex justify-center items-center ' >
              <div className='  ' >
                <div className='flex justify-between' >
                  <h3 className=' text-customOrange text-1xl font-bold ' >Delete a review</h3>
                  <FaRegQuestionCircle />
                </div>
                <div className='mt-5 flex flex-col ' >
                  <p className='text-sm ' >Mucius doctus constituto pri at. At vix utinam corpora, ea oblique moderatius usu. Vix id viris consul honestatis, an constituto deterruisset consectetuer pro quo corrumpit euripidis...</p>

                  <a href="#" className='capitalize mt-10 text-blue-500 ' >Read More</a>
                </div>
              </div>
            </div>
          </div>
          <div className='border  h-[40vh] ' >
            <div className='card  p-4 w-full h-full flex justify-center items-center ' >
              <div className='  ' >
                <div className='flex justify-between' >
                  <h3 className=' text-customOrange text-1xl font-bold ' >Delete a review</h3>
                  <FaRegQuestionCircle />
                </div>
                <div className='mt-5 flex flex-col ' >
                  <p className='text-sm ' >Mucius doctus constituto pri at. At vix utinam corpora, ea oblique moderatius usu. Vix id viris consul honestatis, an constituto deterruisset consectetuer pro quo corrumpit euripidis...</p>

                  <a href="#" className='capitalize mt-10 text-blue-500 ' >Read More</a>
                </div>
              </div>
            </div>
          </div>
          <div className='border  h-[40vh] ' >
            <div className='card  p-4 w-full h-full flex justify-center items-center ' >
              <div className='  ' >
                <div className='flex justify-between' >
                  <h3 className=' text-customOrange text-1xl font-bold ' >Delete a review</h3>
                  <FaRegQuestionCircle />
                </div>
                <div className='mt-5 flex flex-col ' >
                  <p className='text-sm ' >Mucius doctus constituto pri at. At vix utinam corpora, ea oblique moderatius usu. Vix id viris consul honestatis, an constituto deterruisset consectetuer pro quo corrumpit euripidis...</p>

                  <a href="#" className='capitalize mt-10 text-blue-500 ' >Read More</a>
                </div>
              </div>
            </div>
          </div>
          
          <div className='w-full text-center  ' >
            <button className='bg-blue-700 text-white p-2 px-5  text-center mt-10 capitalize ' >View all faq</button>
          </div>
        </div>
      </div>
      <Looter/>
    </>
  )
}