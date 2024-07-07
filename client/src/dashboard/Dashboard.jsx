import "../App.module.css";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TopBack from "../components/backToTop"; // import React from "react";

const Dashboard = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <h1>Dashboard</h1>
      <Outlet />
      <TopBack />
      <Footer />
    </div>
  );
};

export default Dashboard;
