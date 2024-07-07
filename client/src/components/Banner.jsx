// import React from "react";
import BannerCard from "../home/BannerCard";

const Banner = () => {
  return (
    <div className="px-4 lg:px-16 bg-teal-100 flex items-center">
      <div className="flex w-full flex-col md:flex-row justify-between items-center gap-12 py-40">
        {/* Left side */}
        <div className="md:w-1/2 space-y-8 h-full">
          <h2 className="text-6xl font-bold leading-snug text-black">
            NƠI MUA VÀ BÁN SÁCH{" "}
            <span className="text-blue-700">VỚI GIÁ TỐT NHẤT</span>
          </h2>
          <p className="md:w-4/5 text-justify">
            "Sách Điện Tử Việt" không chỉ là cửa hàng sách trực tuyến, mà là
            điểm đến cho những người đam mê tri thức. Với bộ sưu tập sách đa
            dạng và chất lượng, chúng tôi mang đến cho bạn không gian tuyệt vời
            để mua và bán những quyển sách yêu thích. Hãy thả mình vào thế giới
            của chúng tôi và trải nghiệm niềm vui đọc sách không giới hạn tại
            "Sách Điện Tử Việt".
          </p>
          <div>
            <input
              type="search"
              name="search"
              id="search"
              placeholder="Tìm kiếm sách"
              className="py-2 px-2 rounded-s-sm outline-none"
            />
            <button className="bg-blue-700 px-6 py-2 text-white font-medium hover:bg-black transition-all ease-in duration-700">
              Tìm
            </button>
          </div>
        </div>

        {/* Right side */}
        <div>
          <BannerCard></BannerCard>
        </div>
      </div>
    </div>
  );
};

export default Banner;
