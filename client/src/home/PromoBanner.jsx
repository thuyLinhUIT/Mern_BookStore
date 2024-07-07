import React from 'react'
import { Link } from 'react-router-dom'
import bookPic from "../assets/banner-img/bookPic.png"

const PromoBanner = () => {
  return (
    <div className='mt-16 py-12 bg-teal-100 px-4 lg:px-24'>
        <div className='flex flex-col md:flex-row justify-between items-center gap-12'>
            <div className='md:w-1/2'>
                <h2 className='text-4xl font-bold mb-6 leading-snug'>Danh sách Giải thưởng Sách Quốc gia <span className='text-green-600'>Năm 2023 cho Tiểu thuyết</span></h2>
                <Link to="/shop" className='mt-12 block'>
                    <button className='bg-blue-700 text-white font-semibold px-5 py-2 rounded hover:bg-black transition-all duration-300'>Tìm hiểu thêm</button>
                </Link>
            </div>

            <div>
                <img src={bookPic} alt="" className='w-96'/>
            </div>
        </div>
    </div>
  )
}

export default PromoBanner