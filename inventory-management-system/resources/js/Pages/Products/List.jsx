import React from "react";
import { Link } from "@inertiajs/react";

const ProductsList = () => {
  // Sample static product data
  const products = [
    {
      id: 1,
      productId: "PRD-001",
      name: "Wireless Mouse",
      category: "Electronics",
      price: "$25",
      stock: 120,
      status: "Active",
    },
    {
      id: 2,
      productId: "PRD-002",
      name: "Bluetooth Speaker",
      category: "Audio",
      price: "$55",
      stock: 45,
      status: "Inactive",
    },
    {
      id: 3,
      productId: "PRD-003",
      name: "Smartwatch",
      category: "Wearables",
      price: "$99",
      stock: 80,
      status: "Active",
    },
  ];

  return (
    <div className="container-fluid">
      {/* Page header */}
      <div className="row mb-2">
        <div className="col-12 col-xl-4">
          <h5 className="text-dark">Manage Products</h5>
        </div>
        <div className="col-12 col-xl-2 offset-xl-6 align-self-center">
          <Link className="btn btn-primary btn-sm w-100" href="/add-product">
            <i className="fas fa-plus-circle"></i>&nbsp;Add New Product
          </Link>
        </div>
      </div>

      {/* Table card */}
      <div className="card shadow">
        <div className="card-header py-2">
          <p className="text-primary m-0 fw-bold">Product Info</p>
        </div>
        <div className="card-body">
          <div className="table-responsive text-nowrap table mt-3">
            <table className="table table-hover table-sm my-0" id="dataTable">
              <thead>
                <tr>
                  <th>Sl No.</th>
                  <th>Product ID</th>
                  <th>Product Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th className="text-center">Status</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? (
                  products.map((product, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{product.productId}</td>
                      <td>{product.name}</td>
                      <td>{product.category}</td>
                      <td>{product.price}</td>
                      <td>{product.stock}</td>
                      <td className="text-center">
                        {product.status === "Active" ? (
                          <span className="badge rounded-pill bg-success">Active</span>
                        ) : (
                          <span className="badge rounded-pill bg-danger">Inactive</span>
                        )}
                      </td>
                      <td className="text-center">
                        <div className="dropdown">
                          <button
                            className="btn btn-primary btn-sm dropdown-toggle"
                            data-bs-toggle="dropdown"
                            type="button"
                          >
                            <i className="fas fa-cog"></i>
                          </button>
                          <div className="dropdown-menu">
                            <Link className="dropdown-item" href={`/edit-product/${product.id}`}>
                              <i className="fas fa-pen"></i>&nbsp;Edit Product
                            </Link>
                            <button className="dropdown-item text-danger">
                              <i className="fas fa-trash"></i>&nbsp;Delete Product
                            </button>
                         
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center">
                      No products found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsList;
