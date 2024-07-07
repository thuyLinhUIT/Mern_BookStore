// import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectCoverflow,
} from "swiper/modules";
// Import Swiper styles
import "swiper/css";

import "swiper/css/navigation";
import "./AboutUs.css";

const data = [
  {
    id: 1,
    username: "Dương Bảo Minh",
    tesimonial: "Giám đốc",
    avatar:
      "https://0c8cb687701631b1ff0b-235fb5f4c073f90b275664b2611330fd.ssl.cf5.rackcdn.com/web_re_sized_avatar_1346249632-200x200.jpg",
  },
  {
    id: 2,
    username: "Đinh Hoàng Thùy Linh",
    tesimonial: "Quản lý",
    avatar:
      "https://store-images.s-microsoft.com/image/apps.39495.14055649003808744.17d76fa5-ec2c-49cc-9222-00fbab6b9600.98e33d5d-880e-48ad-b04c-fadc366b8ac2",
  },
  {
    id: 3,
    username: "Lê Ngọc Hân",
    tesimonial: "Thư ký",
    avatar:
      "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-2.webp",
  },
  {
    id: 4,
    username: "Nguyễn Thanh Tuyền",
    tesimonial: "Trưởng phòng",
    avatar:
      "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp",
  },
  {
    id: 5,
    username: "Nguyễn Thị Hồng Ánh",
    tesimonial: "Nhân viên",
    avatar:
      "https://cdn.c21media.net/wp-content/uploads/2021/09/karolinakaminska_avatar_1631187545-300x300.jpg",
  },
  {
    id: 6,
    username: "Nguyễn Hoàng Minh",
    tesimonial: "Nhân viên",
    avatar:
      "https://cdn.home.vn/655360_70849780822755_2053926375391232?wt=698c62e830ab7923e1f635267d4ed611&rt=c39a2597954436f11c453be8073932ad&width=300&height=300",
  },
];
const AboutUs = () => {
  return (
    <div className="About">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, EffectCoverflow]}
        effect={"coverflow"}
        spaceBetween={50}
        slidesPerView={3}
        navigation
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {data.map((user) => (
          <SwiperSlide key={user.id} className="slide">
            <div className="slide-content">
              <div className="user-image">
                <img
                  // src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                  src={user.avatar}
                  alt=" "
                  className="user-photo"
                />
              </div>
              <h5>{user.username}</h5>
              <p className="user-testimonial">
                {" "}
                "<i>{user.tesimonial}</i>"
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default AboutUs;
