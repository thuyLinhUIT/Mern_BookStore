import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import { FaStar } from "react-icons/fa6";
import { Avatar } from 'flowbite-react';
import man from '../assets/man.png';
import woman from '../assets/woman.png';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

//import './styles.css';

// import required modules
import { Pagination } from 'swiper/modules';

const Review = () => {
  return (
    <div className='my-8 px-4 lg:px-24'>
      <h2 className='text-5xl font-bold text-center mb-5 leading-snug'>Các đối tác lớn của Sách Điện Tử Việt</h2>

      <div>
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
          }}
          modules={[Pagination]}
          className="mySwiper"
        >

          <SwiperSlide className='shadow-2xl bg-white py-8 px-4 md:m-5 rounded-lg border'>
            <div>
              <div className='mb-4 text-amber-500 flex gap-2'>
                <FaStar></FaStar>
                <FaStar></FaStar>
                <FaStar></FaStar>
                <FaStar></FaStar>
                <FaStar></FaStar>
              </div>

              {/* text */}
              <div className='mb-7'>
                <p className='mb-5 mr-2 text-justify'>Doanh nghiệp trẻ đầy sáng tạo, tôi đánh giá rất cao tinh thần đội ngũ sáng lập, từ Sách Điện Tử Việt giúp nâng cao giá trị sách Việt.</p>
                <Avatar img={man} alt="avatar of Jese" rounded className='w-10 mb-4' />
                <h5 className='text-lg font-medium'>Ông Phan Văn Mãi</h5>
                <p className='text-base'>Chủ tịch UBND TP.Hồ Chí Minh</p>
              </div>

            </div>
          </SwiperSlide>

          <SwiperSlide className='shadow-2xl bg-white py-8 px-4 md:m-5 rounded-lg border'>
            <div>
              <div className='mb-4 text-amber-500 flex gap-2'>
                <FaStar></FaStar>
                <FaStar></FaStar>
                <FaStar></FaStar>
                <FaStar></FaStar>
                <FaStar></FaStar>
              </div>

              {/* text */}
              <div className='mb-7'>
                <p className='mb-5 mr-2 text-justify'>Thật tuyệt vời khi có thể đồng hành và trở thành đối tác tin cậy của Sách Điện Tử Việt. Chúc các bạn sẽ phát triển hơn trong tương lai.</p>
                <Avatar img={man} alt="avatar of Jese" rounded className='w-10 mb-4' />
                <h5 className='text-lg font-medium'>Ông Phạm Minh Thuận</h5>
                <p className='text-base'>CEO, Công ty Cổ phần phát hành sách FAHASA</p>
              </div>

            </div>
          </SwiperSlide>

          <SwiperSlide className='shadow-2xl bg-white py-8 px-4 md:m-5 rounded-lg border'>
            <div>
              <div className='mb-4 text-amber-500 flex gap-2'>
                <FaStar></FaStar>
                <FaStar></FaStar>
                <FaStar></FaStar>
                <FaStar></FaStar>
                <FaStar></FaStar>
              </div>

              {/* text */}
              <div className='mb-7'>
                <p className='mb-5 mr-2 text-justify'>Một mô hình kinh doanh rất hay và sáng tạo của các bạn trẻ. Trong tương lai tới, mô hình này được dự báo sẽ phát triển cực nhanh chóng.</p>
                <Avatar img={man} alt="avatar of Jese" rounded className='w-10 mb-4' />
                <h5 className='text-lg font-medium'>Ông Nguyễn Hữu Hoạt</h5>
                <p className='text-base'>CEO, Nhà sách Phương Nam</p>
              </div>

            </div>
          </SwiperSlide>

          <SwiperSlide className='shadow-2xl bg-white py-8 px-4 md:m-5 rounded-lg border'>
            <div>
              <div className='mb-4 text-amber-500 flex gap-2'>
                <FaStar></FaStar>
                <FaStar></FaStar>
                <FaStar></FaStar>
                <FaStar></FaStar>
                <FaStar></FaStar>
              </div>

              {/* text */}
              <div className='mb-7'>
                <p className='mb-5 mr-2 text-justify'>Nơi uy tín mà ban lãnh đạo nhà trường vẫn luôn khuyến khích các bạn sinh viên truy cập để tìm hiểu những thông tin chính thống tin cậy.</p>
                <Avatar img={man} alt="avatar of Jese" rounded className='w-10 mb-4' />
                <h5 className='text-lg font-medium'>GS.TS.Sử Đình Thành</h5>
                <p className='text-base'>Hiệu trưởng Đại học UEH</p>
              </div>

            </div>
          </SwiperSlide>

          <SwiperSlide className='shadow-2xl bg-white py-8 px-4 md:m-5 rounded-lg border'>
            <div>
              <div className='mb-4 text-amber-500 flex gap-2'>
                <FaStar></FaStar>
                <FaStar></FaStar>
                <FaStar></FaStar>
                <FaStar></FaStar>
                <FaStar></FaStar>
              </div>

              {/* text */}
              <div className='mb-7'>
                <p className='mb-5 mr-2 text-justify'>Đã từng có rất nhiều cơ hội làm việc chung với tập thể Sách Điện Tử Việt, các bạn rất chuyên nghiệp và nhiệt huyết. Website thực sự rất bổ ích!</p>
                <Avatar img={man} alt="avatar of Jese" rounded className='w-10 mb-4' />
                <h5 className='text-lg font-medium'>Ông Trần Đăng Khoa</h5>
                <p className='text-base'>Nhà văn - Nhà thơ</p>
              </div>

            </div>
          </SwiperSlide>

          <SwiperSlide className='shadow-2xl bg-white py-8 px-4 md:m-5 rounded-lg border'>
            <div>
              <div className='mb-4 text-amber-500 flex gap-2'>
                <FaStar></FaStar>
                <FaStar></FaStar>
                <FaStar></FaStar>
                <FaStar></FaStar>
                <FaStar></FaStar>
              </div>

              {/* text */}
              <div className='mb-7'>
                <p className='mb-5 mr-2 text-justify'>Thông qua Sách Điện Tử Việt, tôi đã có thể đưa rất nhiều tác phẩm của bản thân đến với quý độc giả, đặc biệt là các bạn trẻ. Đối tác quá tin cậy.</p>
                <Avatar img={woman} alt="avatar of Jese" rounded className='w-10 mb-4' />
                <h5 className='text-lg font-medium'>Bà Nguyễn Quỳnh Trang</h5>
                <p className='text-base'>Nhà văn</p>
              </div>

            </div>
          </SwiperSlide>

          <SwiperSlide className='shadow-2xl bg-white py-8 px-4 md:m-5 rounded-lg border mr-0'>
            <div>
              <div className='mb-4 text-amber-500 flex gap-2'>
                <FaStar></FaStar>
                <FaStar></FaStar>
                <FaStar></FaStar>
                <FaStar></FaStar>
                <FaStar></FaStar>
              </div>

              {/* text */}
              <div className='mb-7'>
                <p className='mb-5 mr-2 text-justify'>Nơi chắp cánh cho ngòi bút của bản thân mình được bay cao và bay xa đến vậy. Đội ngũ kiểm duyệt nhanh chóng và chuyên nghiệp. Xin cảm ơn!</p>
                <Avatar img={man} alt="avatar of Jese" rounded className='w-10 mb-4' />
                <h5 className='text-lg font-medium'>Ông Trần Hữu Hi</h5>
                <p className='text-base'>Nhà văn trẻ</p>
              </div>

            </div>
          </SwiperSlide>
          <div className='w-full h-12 bg-white'></div>

        </Swiper>
      </div>
    </div>
  )
}

export default Review