// import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import AboutUs from "../home/AboutUs";

import { MDBCol, MDBInput, MDBTextArea, MDBBtn } from "mdb-react-ui-kit";

export default function About() {
  return (
    <div>
      <div className="py-20 px-4 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-slate-800 text-center">
          Chào mừng bạn đến với Sách Điện Tử Việt!
        </h1>
        <h2 className="text-2xl font-bold mb-4 text-slate-800">
          Chúng tôi là ai?
        </h2>
        <p className="mb-4 text-slate-700">
          Tại Sách Điện Tử Việt, niềm đam mê với văn học là động lực giúp chúng
          tôi phát triển cộng đồng người đọc đam mê sách. Đội ngũ của chúng tôi
          được hình thành từ những người yêu sách, và chúng tôi tin rằng văn học
          đang lan tỏa sức ảnh hưởng mạnh mẽ đến với người đọc. Rõ ràng, văn học
          không chỉ giúp mọi người tiếp thu được nhiều kiến thức mới mà còn mang
          lại niềm vui cho cuộc sống. Mục tiêu của chúng tôi là xây dựng một
          không gian chào đón và bao dung, nơi mà các độc giả từ khắp nơi trên
          thế giới có thể hội tụ, khám phá các tác phẩm văn học mới, bày tỏ ý
          kiến của mình và xây dựng mối liên kết với những người bạn cùng chung
          niềm đam mê.
        </p>
        <div>
          <AboutUs></AboutUs>
        </div>
        <br /> <br />
        <h2 className="text-2xl font-bold mb-4 text-slate-800 text-center">
          Chúng tôi có niềm tin vào khả năng của sách trong việc thúc đẩy, khai
          sáng và thay đổi cuộc sống. Hãy tham gia cùng chúng tôi trên nền tảng
          Sách Điện Tử Việt và bắt tay vào hành trình khám phá văn học.
        </h2>
      </div>
      <h2 className="text-3xl font-bold mb-4 text-slate-800 text-center">
        Liên hệ
      </h2>
      <p className="mb-4 text-slate-700 text-center">
        Bạn có câu hỏi nào không? Xin vui lòng liên hệ trực tiếp với chúng tôi.
      </p>

      <div className="row px-10 max-w-10xl mx-auto">
        <div className="col-lg-5">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15673.0621565218!2d106.77233848943669!3d10.867396727874524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527e7e8abb0eb%3A0xec43e4b99472c18a!2zVUlUIC0gQ-G7lW5nIEE!5e0!3m2!1sen!2s!4v1701851712726!5m2!1sen!2s"
            className="h-100 w-100"
            style={{ border: "0" }}
            loading="lazy"
          ></iframe>
        </div>
        <div className="col-lg-7">
          <form>
            <div className="row">
              <div className="col-md-9">
                <MDBCol>
                  <MDBInput
                    id="form3FirstName"
                    placeholder="Họ tên"
                    wrapperClass="mb-4"
                  />
                </MDBCol>
                <MDBCol>
                  <MDBInput
                    placeholder="Email"
                    id="form3Email"
                    wrapperClass="mb-4"
                  />
                </MDBCol>
                <MDBInput
                  type="text"
                  placeholder="Tiêu đề"
                  id="form3Subject"
                  wrapperClass="mb-4"
                />
                <MDBTextArea
                  placeholder="Tin nhắn"
                  id="form3Textarea"
                  wrapperClass="mb-4"
                />
                <div className="text-center">
                  <MDBBtn color="primary" className="mb-4">
                    {" "}
                    Gửi ngay{" "}
                  </MDBBtn>
                </div>
              </div>
              <div className="col-md-3 text-center">
                <ul className="list-unstyled">
                  <li>
                    <i className="fas fa-map-marker-alt fa-2x text-primary"></i>
                    <p>
                      <small>Phường Linh Trung, Thủ Đức, TPHCM</small>
                    </p>
                  </li>
                  <li>
                    <i className="fas fa-phone fa-2x text-primary"></i>
                    <p>
                      <small>+ 84 234 567 89</small>
                    </p>
                  </li>
                  <li>
                    <i className="fas fa-envelope fa-2x text-primary"></i>
                    <p>
                      <small>contact@gmail.com</small>
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </form>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}
