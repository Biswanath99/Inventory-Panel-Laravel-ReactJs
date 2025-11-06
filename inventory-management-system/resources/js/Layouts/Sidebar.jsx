import React from "react";
import { Link } from "@inertiajs/react";

const Sidebar = () => {
  return (
    <nav className="navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0">
      <div className="container-fluid d-flex flex-column p-0">
        <Link
          href="/"
          className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0"
        >
          <div className="sidebar-brand-icon">
            <i className="fas fa-shopping-cart"></i>
          </div>
          <div className="text-start sidebar-brand-text mx-3">
            <span>
              Inventory
              <br />
              Panel
            </span>
          </div>
        </Link>

        <hr className="sidebar-divider my-0" />

        <ul className="navbar-nav text-light" id="accordionSidebar">
          <li className="nav-item">
            <Link className="nav-link" href="/">
              <i className="fas fa-tachometer-alt"></i>
              <span>Dashboard</span>
            </Link>

             <Link className="nav-link" href="/manage-products">
              <i className="fas fa-tachometer-alt"></i>
              <span>Products Management</span>
            </Link>

          </li>
        </ul>

        
      </div>
    </nav>
  );
};

export default Sidebar;
