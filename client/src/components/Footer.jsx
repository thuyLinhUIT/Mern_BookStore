import { Footer } from "flowbite-react";
import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs";

const MyFooter = () => {
  return (
    <Footer container className=" bg-blue-300">
      <div className="w-full px-4 lg:px-2">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div>
            <Footer.Brand
              href="https://flowbite.com"
              src="https://flowbite.com/docs/images/logo.svg"
              alt="Flowbite Logo"
              name="Sách Điện Tử Việt"
            />
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div className="mr-16">
              <Footer.Title title="về chúng tôi" className="text-black" />
              <Footer.LinkGroup col>
                <Footer.Link href="#" className="text-black">
                  Giới thiệu
                </Footer.Link>
                <Footer.Link href="#" className="text-black">
                  Hệ thống nhà sách
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Sách Điện Tử Việt" className="text-black" />
              <Footer.LinkGroup col>
                <Footer.Link href="#" className="text-black">
                  Facebook
                </Footer.Link>
                <Footer.Link href="#" className="text-black">
                  Instagram
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Hỗ trợ khách hàng" className="text-black" />
              <Footer.LinkGroup col>
                <Footer.Link href="#" className="text-black">
                  Chính sách bảo mật
                </Footer.Link>
                <Footer.Link href="#" className="text-black">
                  Điều khoản sử dụng
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright href="#" by="TeamSecret™" year={2023} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsInstagram} />
            <Footer.Icon href="#" icon={BsTwitter} />
            <Footer.Icon href="#" icon={BsGithub} />
            <Footer.Icon href="#" icon={BsDribbble} />
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default MyFooter;
