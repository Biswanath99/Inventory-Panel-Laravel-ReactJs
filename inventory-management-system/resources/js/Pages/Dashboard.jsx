import React, { useEffect } from "react";

const Dashboard = () => {

  return (
    <div className="container-fluid">
      <div className="row mb-3">
        <div className="col-4 col-xl-4 align-self-center">
          <h5 className="text-dark mb-0">
            <strong>Dashboard</strong>
          </h5>
        </div>
      </div>

      <div className="row">
        <div className="col-6 col-md-6 col-xl-3 mb-4">
          <div className="card shadow border-start-warning py-2">
            <div className="card-body">
              <p className="text-uppercase fw-bold text-primary text-sm-start">
                Total Products
                <i className="fas fa-shopping-cart fa-2x float-end"></i>
              </p>
              <div className="text-dark fw-bold h5 mb-0">
                <span>1000</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-6 col-md-6 col-xl-3 mb-4">
          <div className="card shadow border-start-warning py-2">
            <div className="card-body">
              <p className="text-uppercase fw-bold text-primary text-sm-start">
                Active Products
                <i className="fas fa-shopping-cart fa-2x float-end"></i>
              </p>
              <div className="text-dark fw-bold h5 mb-0">
                <span>1000</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-6 col-md-6 col-xl-3 mb-4">
          <div className="card shadow border-start-warning py-2">
            <div className="card-body">
              <p className="text-uppercase fw-bold text-primary text-sm-start">
                Inactive Products
                <i className="fas fa-shopping-cart fa-2x float-end"></i>
              </p>
              <div className="text-dark fw-bold h5 mb-0">
                <span>1000</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;