import React, { useState, useEffect } from "react";
import Api from "../../API/Api"; // Your Axios instance
import { Link } from "@inertiajs/react";

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      const res = await Api.get("/products");
      if (res.data.products) {
        setProducts(res.data.products);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await Api.delete(`/products/${id}`); // API delete endpoint
      setProducts(products.filter((p) => p.id !== id)); // remove from UI
      alert("Product deleted successfully!");
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete product.");
    }
  };

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
          {loading ? (
            <p>Loading products...</p>
          ) : (
            <div className="table-responsive text-nowrap table mt-3">
              <table className="table table-hover table-sm my-0">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th className="text-center">Stock Status</th>
                     <th className="text-center">Status</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length > 0 ? (
                    products.map((product, index) => (
                      <tr key={product.id}>
                        <td>{index + 1}</td>
                        <td>{product.name}</td>
                        <td>{product.quantity}</td>
                        <td className="text-center">
                          {product.quantity > 0 ? (
                            <span className="badge rounded-pill bg-primary">In Stock</span>
                          ) : (
                            <span className="badge rounded-pill bg-warning">Out of Stock</span>
                          )}
                        </td>

                        <td className="text-center">
                          {product.status == 'Active'? (
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
                                <i className="fas fa-pen"></i>&nbsp;Edit
                              </Link>
                              <button
                                className="dropdown-item text-danger"
                                onClick={() => deleteProduct(product.id)}
                              >
                                <i className="fas fa-trash"></i>&nbsp;Delete
                              </button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center">
                        No products found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsList;