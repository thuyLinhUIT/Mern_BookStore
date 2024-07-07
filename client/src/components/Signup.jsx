import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../contacts/AuthProvider";
import googleLogo from "../assets/banner-img/googleLogo.png";

const Signup = () => {
  const { createUser, loginWithGoogle } = useContext(AuthContext);
  const [error, serError] = useState("Lỗi");

  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const handleSignUp = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    createUser(email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        alert("Đăng ký tài khoản thành công!");
        navigate(from, { replace: true });
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        serError(errorMessage);
        // ..
      });
  };

  // signup using google account
  const handleRegister = () => {
    loginWithGoogle()
      .then((result) => {
        const user = result.user;
        alert("Đăng ký tài khoản thành công!");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        serError(errorMessage);
        // ..
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div>
              <h1 className="text-3xl font-semibold">Đăng ký tài khoản</h1>
            </div>
            <div className="divide-y divide-gray-200">
              <form
                onSubmit={handleSignUp}
                className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7"
              >
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="text"
                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                    placeholder="Email address"
                  />
                </div>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                    placeholder="Password"
                  />
                </div>
                <div className="flex justify-center py-2">
                  <button className="bg-blue-500 text-white rounded-md px-8 py-2">
                    Đăng ký ngay
                  </button>
                </div>
              </form>
            </div>

            <hr className="border-t-2 border-b-slate-950" />
            <div>
              <button
                onClick={handleRegister}
                className="flex items-center text-xl mt-6"
              >
                <img src={googleLogo} alt="" className="w-6 h-6 mx-2" />
                Đăng nhập với Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
