import React, { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";
import Api from "../../API/Api";

const Login = () => {
  const [authForm, setAuthForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      window.location.href = "/";
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuthForm((prev) => ({ ...prev, [name]: value }));
  };

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await Api.post("/login", authForm);

      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user_id", res.data.user.id);
        window.location.href = "/";
      }
    } catch (err) {
      console.error(err);
      alert("Invalid credentials!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="card shadow-lg border-0 p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <div className="text-center mb-4">
          <h2 className="text-dark text-uppercase"><strong>Login</strong></h2>
        </div>

        <form onSubmit={login}>
          <div className="mb-3">
            <input
              className="form-control form-control-user"
              type="email"
              placeholder="Enter Email Address..."
              name="email"
              value={authForm.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <input
              className="form-control form-control-user"
              type="password"
              placeholder="Password"
              name="password"
              value={authForm.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            className="btn btn-primary d-block btn-user w-100"
            type="submit"
            disabled={loading}
          >
            {loading ? "Please wait..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
