import React from "react";
import Google from "../assets/images/google25X25.svg";
import HRL from "../assets/images/hr_or_bar.svg";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { authenticate, signIn } from "../api/Auth_API";
import Banner from "./Banner";

function Login() {
  // Useful hooks for state management
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);

  // Handle change method
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  // Handle submit method
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await signIn(values);
    if (res.error) {
      setLoading(false);
      setError(res.error);
      setRedirect(false);
    } else {
      authenticate(res, () => {
        setError(false);
        setLoading(false);
        setRedirect(true);
      });
    }
  };

  // Redirect function
  const RedirectUser = () => {
    const Navigate = useNavigate();
    if (redirect) {
      setLoading(false);
      return Navigate("/home");
    }
  };
  return (
    <div className="w-3/4 m-2 flex flex-col items-center p-2">
      {error && <Banner message={error} />}
      <h1 className="text-5xl text-center">Welcome back!</h1>
      <h6 className="text-slate-500 text-center text-lg">
        Please enter your details
      </h6>
      <br />
      <button className="py-2 text-lg border bg-slate-50 rounded-md w-3/4">
        <span>
          <img src={Google} alt="google" className="inline-block mx-3" />
        </span>
        Login with Google
      </button>
      <br />
      <br />
      <img src={HRL} alt="hr-line" />
      <br />
      <form className="flex flex-col items-center w-3/4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full outline-none py-2 border-b-2 border-slate-200"
          onChange={handleChange}
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full outline-none py-2 border-b-2 border-slate-200"
          onChange={handleChange}
        />
        <br />
        <br />
        <button
          className="p-2 border bg-black text-white text-xl rounded-md w-full"
          onClick={handleSubmit}
        >
          Login
        </button>
        <br />
      </form>
      {/* Ask for signup */}
      <p className="text-slate-600">
        Don't have an account? <Link to="/signup">Signup</Link>
      </p>
      {RedirectUser()}
    </div>
  );
}

export default Login;
