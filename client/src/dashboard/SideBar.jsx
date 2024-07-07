// import React from "react";
import { Sidebar } from "flowbite-react";
import { Link } from "react-router-dom";

export const SideBar = () => {
  return (
    <div>
      <Sidebar
        aria-label="Sidebar with logo branding example"
        style={{ marginTop: "80px" }}
      >
        Book Store
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item as={Link} to="/admin/dashboard/manage">
              Quản lý thông tin sách
            </Sidebar.Item>
            <Sidebar.Item as={Link} to="/admin/dashboard/upload-book">
              Upload Sách
            </Sidebar.Item>
            <Sidebar.Item as={Link} to="/admin/dashboard/manage-author">
              Quản lý thông tác giả
            </Sidebar.Item>
            <Sidebar.Item as={Link} to="/admin/dashboard/create-author">
              Tạo thông tin tác giả
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
};
