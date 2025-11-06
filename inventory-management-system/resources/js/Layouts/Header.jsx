import React from "react";

const Header = () => {
  return (
    <nav className="navbar navbar-light navbar-expand bg-white shadow mb-4 topbar static-top">
      <div className="container-fluid">
       
        <button
          className="btn btn-link d-md-none p-0"
          id="sidebarToggleTop"
          type="button"
        >
          <i className="fas fa-align-left fa-2x"></i>
        </button>

        <form className="d-none d-sm-inline-block me-auto ms-md-3 my-2 my-md-0 mw-100 navbar-search">
          <div className="input-group">
            <input
              className="bg-light form-control border-0 small"
              type="text"
              placeholder="Search for ..."
            />
            <button className="btn btn-primary py-0" type="button">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </form>

        <ul className="navbar-nav flex-nowrap ms-auto">
          <div className="d-none d-sm-block topbar-divider"></div>
          <li className="nav-item dropdown no-arrow">
            <div className="nav-item dropdown no-arrow">
              <a
                className="dropdown-toggle nav-link"
                href="#"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span className="d-none d-lg-inline me-2 text-gray-600 small">
                  {name}
                </span>
                <img
                  className="border rounded-circle img-profile"
                  src="/assets/img/undraw_profile.svg"
                  alt="User Avatar"
                />
              </a>
              <div className="dropdown-menu shadow dropdown-menu-end animated--grow-in">
                <a className="dropdown-item" href="#">
                  <i className="fas fa-user fa-sm fa-fw me-2 text-gray-400"></i>
                  Profile
                </a>

                <div className="dropdown-divider"></div>

                <a className="dropdown-item" href="#">
                  <i className="fas fa-sign-out-alt fa-sm fa-fw me-2 text-gray-400"></i>
                  Logout
                </a>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;