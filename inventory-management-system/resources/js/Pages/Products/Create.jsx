import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import Api from "../../API/Api";

const CreateProduct = ({ product = {} }) => {
  const [productForm, setProductForm] = useState({
    name: product.name || "",
    quantity: product.quantity || "",
    user_id : localStorage.getItem('user_id') || "",
    status: product.status || "Active",
    variants: product.variants || [{ variant_name: "", price: "" }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleVariantChange = (index, e) => {
    const { name, value } = e.target;
    const updated = [...productForm.variants];
    updated[index][name] = value;
    setProductForm((prev) => ({ ...prev, variants: updated }));
  };

  const addVariant = () =>
    setProductForm((prev) => ({
      ...prev,
      variants: [...prev.variants, { variant_name: "", price: "" }],
    }));

  const removeVariant = (index) =>
    setProductForm((prev) => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index),
    }));

  const saveProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await Api.post("/create-product", productForm);
      alert("Product saved successfully!");
      setProductForm({
        name: "",
        quantity: "",
        status: "Active",
        variants: [{ name: "", price: "" }],
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-12 col-xl-4">
          <h5 className="text-dark">
            {productForm.id ? "Edit Product" : "Add New Product"}
          </h5>
        </div>
      </div>

      <div className="card shadow">
        <div className="card-header py-2">
          <p className="text-primary m-0 fw-bold">Product Info</p>
        </div>

        <div className="card-body">
          <form onSubmit={saveProduct}>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">Product Name:</label>
                <input
                  className="form-control form-control-sm"
                  name="name"
                  value={productForm.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">Quantity:</label>
                <input
                  className="form-control form-control-sm"
                  type="number"
                  name="quantity"
                  value={productForm.quantity}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-4 mb-3">
                <label className="form-label">Status:</label>
                <select
                  className="form-select form-select-sm"
                  name="status"
                  value={productForm.status}
                  onChange={handleChange}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            {/* Variants */}
            <h6 className="text-primary fw-bold mt-4">Product Variants</h6>
            <table className="table table-bordered table-sm align-middle mt-2">
              <thead className="table-light">
                <tr>
                  <th>Variant Name</th>
                  <th>Price</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {productForm.variants.map((variant, i) => (
                  <tr key={i}>
                    <td>
                      <input
                        className="form-control form-control-sm"
                        name="variant_name"
                        placeholder="Variant name..."
                        value={variant.variant_name}
                        onChange={(e) => handleVariantChange(i, e)}
                      />
                    </td>
                    <td>
                      <input
                        className="form-control form-control-sm"
                        name="price"
                        type="number"
                        placeholder="Price..."
                        value={variant.price}
                        onChange={(e) => handleVariantChange(i, e)}
                      />
                    </td>
                    <td className="text-center">
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => removeVariant(i)}
                        disabled={productForm.variants.length === 1}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={addVariant}
            >
              <i className="fas fa-plus-circle"></i> Add Variant
            </button>

            <div className="row mt-4">
              <div className="col-md-6 text-end">
                <button className="btn btn-danger btn-sm me-2" type="reset">
                  <i className="fas fa-times-circle"></i> Reset
                </button>
                <button className="btn btn-primary btn-sm" type="submit">
                  <i className="fas fa-check-circle"></i> Save Changes
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;