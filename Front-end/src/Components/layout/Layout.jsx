// Layout.jsx
import React from 'react';
import Navbar from "../Navbar/Navbar.jsx";
import Header from "../Header/Header.jsx";
import { Outlet } from 'react-router-dom';
import "./layout.css";

const Layout = () => {
  return (
    <div className="h-screen w-full flex flex-col no-scrollbar fixed">
      <Header />
      <div className="flex flex-1 bg-[#FAFAFA] dark:bg-dark-background no-scrollbar">
        <Navbar />
        <div className="flex-1 overflow-y-auto no-scrollbar">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
