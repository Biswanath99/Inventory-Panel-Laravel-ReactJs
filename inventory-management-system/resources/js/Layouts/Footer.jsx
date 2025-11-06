import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white sticky-footer">
      <div className="container my-auto">
        <div className="text-center my-auto copyright">
          <span>
            Copyright © Inventory Panel {new Date().getFullYear()}
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;