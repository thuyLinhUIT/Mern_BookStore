// import React, { createContext, useEffect, useState } from "react";
// import app from "../firebase/firebase.config";
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   onAuthStateChanged,
//   GoogleAuthProvider,
//   signInWithPopup,
//   signInWithEmailAndPassword,
//   signOut,
// } from "firebase/auth";

// export const AuthContext = createContext();
// const auth = getAuth(app);
// const googleProvider = new GoogleAuthProvider();

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const createUser = (email, password) => {
//     setLoading(true);
//     return createUserWithEmailAndPassword(auth, email, password);
//   };

//   const loginWithGoogle = () => {
//     setLoading(true);
//     return signInWithPopup(auth, googleProvider);
//   };

//   const login = (email, password) => {
//     setLoading(true);
//     return signInWithEmailAndPassword(auth, email, password);
//   };

//   const logout = () => {
//     return signOut(auth);
//   };

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       //console.log(currentUser);
//       setUser(currentUser);
//       setLoading(false);
//     });
//     return () => {
//       return unsubscribe();
//     };
//   }, []);

//   const authInfo = {
//     user,
//     createUser,
//     loginWithGoogle,
//     loading,
//     login,
//     logout,
//   };

//   return (
//     <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
//   );
// };

// export default AuthProvider;

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = async (username, password, userNickname) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/v1/account/signup", {
        username,
        password,
        userNickname,
      });
      setLoading(false);
      setUser(response.data);
      return response;
    } catch (error) {
      console.error("Error creating user:", error);
    }
    //finally {
    //   setLoading(false);
    // }
  };

  const login = async (username, password) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/v1/account/signin", {
        username,
        password,
      });
      console.log(response.data);
      setLoading(false);
      setUser(response.data);
      return response;
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const logout = async () => {
    try {
      // await axios.post("http://localhost:5000/account/logout");
      if (localStorage.getItem("user")) {
        localStorage.removeItem("user");
      }
      setUser(null);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // const response = await axios.get("/api/v1/account/signin");
        const nickname = localStorage.getItem("user");
        if (nickname) {
          setUser({ userNickname: nickname });
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const authInfo = {
    user,
    createUser,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
