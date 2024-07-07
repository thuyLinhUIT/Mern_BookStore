// import { useContext } from "react";
// import { AuthContext } from "../contacts/AuthProvider";
// import { useLocation, useNavigate } from "react-router-dom";
// // import { signOut } from "firebase/auth";

// const Logout = () => {
//   const { logout } = useContext(AuthContext);
//   const location = useLocation();
//   const navigate = useNavigate();

//   const from = location.state?.from?.pathname || "/";

//   const handleLogout = () => {
//     logout()
//       .then(() => {
//         // Sign-out successful.
//         alert("Đăng xuất thành công!");
//         navigate(from, { replace: true });
//       })
//       .catch((error) => {
//         // An error happened.
//       });
//   };

//   return (
//     <div>
//       <button
//         className="bg-amber-800 text-white rounded-md px-8 mx-auto mt-4 block"
//         onClick={handleLogout}
//       >
//         Logout
//       </button>
//     </div>
//   );
// };

// export default Logout;

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contacts/AuthProvider";

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await logout();
        navigate("/");
      } catch (error) {
        console.error("Đăng xuất thất bại:", error);
      }
    };
    performLogout();
  }, [logout, navigate]);

  return (
    <div>
      <p>Đang thực hiện đăng xuất...</p>
    </div>
  );
};

export default Logout;
