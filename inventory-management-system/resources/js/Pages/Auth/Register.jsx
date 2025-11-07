import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import Api from "../../API/Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Register = () => {
  const [authForm, setAuthForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    contact_number: "",
    password: "",
    confirm_password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuthForm((prev) => ({ ...prev, [name]: value }));
  };

  const togglePassword = () => setShowPassword(!showPassword);
  const toggleConfirm = () => setShowConfirm(!showConfirm);

  const register = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await Api.post("/register", authForm);

      if (res.data?.access_token) {
        localStorage.setItem("token", res.data.access_token);
        alert("Registration successful!");
        Inertia.get("/login");
      }
    } catch (err) {
      console.error(err);
      alert("Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center bg-light"
      style={{ minHeight: "100vh" }}
    >
      <div className="card shadow-lg border-0 p-4" style={{ maxWidth: "450px", width: "100%" }}>
        <div className="text-center mb-4">
          <h2 className="text-dark text-uppercase"><strong>Register</strong></h2>
        </div>

        <form onSubmit={register}>
          {/* First Name & Last Name */}
          <div className="row">
            <div className="col mb-3">
              <input
                type="text"
                name="first_name"
                value={authForm.first_name}
                onChange={handleChange}
                className="form-control form-control-user"
                placeholder="First Name"
                required
              />
            </div>
            <div className="col mb-3">
              <input
                type="text"
                name="last_name"
                value={authForm.last_name}
                onChange={handleChange}
                className="form-control form-control-user"
                placeholder="Last Name"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-3">
            <input
              type="email"
              name="email"
              value={authForm.email}
              onChange={handleChange}
              className="form-control form-control-user"
              placeholder="Email Address"
              required
            />
          </div>

          {/* Contact Number */}
          <div className="mb-3">
            <input
              type="tel"
              name="contact_number"
              value={authForm.contact_number}
              onChange={handleChange}
              className="form-control form-control-user"
              placeholder="Contact Number"
              required
            />
          </div>

          {/* Password & Confirm Password Side by Side */}
          <div className="row">
            <div className="col mb-3 position-relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={authForm.password}
                onChange={handleChange}
                className="form-control form-control-user"
                placeholder="Password"
                required
              />
              <span
                onClick={togglePassword}
                style={{
                  position: "absolute",
                  right: "20px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              >
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
              </span>
            </div>
            <div className="col mb-3 position-relative">
              <input
                type={showConfirm ? "text" : "password"}
                name="confirm_password"
                value={authForm.confirm_password}
                onChange={handleChange}
                className="form-control form-control-user"
                placeholder="Confirm Password"
                required
              />
              <span
                onClick={toggleConfirm}
                style={{
                  position: "absolute",
                  right: "20px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              >
                <FontAwesomeIcon icon={showConfirm ? faEye : faEyeSlash} />
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary d-block w-100"
            disabled={loading}
          >
            {loading ? "Please wait..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
