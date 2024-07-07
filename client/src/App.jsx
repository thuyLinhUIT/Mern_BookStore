import "./App.module.css";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import TopBack from "./components/backToTop";
import AuthProvider from "./contacts/AuthProvider";
// import { useState } from "react";

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen">
        {/* <Navbar user={user} onLogin={handleLogin} onLogout={handleLogout}/> */}
        <Navbar />
        <Outlet />
        <TopBack />
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
