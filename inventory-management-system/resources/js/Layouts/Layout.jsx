import React, { useEffect } from "react";
import { usePage } from "@inertiajs/react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    }
  }, []);

  return (
    <div id="wrapper">
      <Sidebar />
      <div id="content-wrapper" className="d-flex flex-column">
        <div id="content">
          <Header />
          <div className="container-fluid">{children}</div>
        </div>
        <Footer />
      </div>
    </div>
  );
};
export default Layout;