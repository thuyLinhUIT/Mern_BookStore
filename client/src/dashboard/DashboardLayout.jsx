// import React from "react";
import { Outlet } from "react-router-dom";
import { SideBar } from "./SideBar";
import Navbar from "../components/Navbar";

const DashboardLayout = () => {
  return (
    <div className="flex gap-4 flex-col md:flex-row">
      <Navbar />
      <SideBar />
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
