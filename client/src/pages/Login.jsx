import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState("Login");
  const { setshowLogin, backendURL, setUser, settoken } = useContext(AppContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const endpoint = state === "Login" ? "/api/user/login" : "/api/user/register";
      const payload = state === "Login" ? { email, password } : { name, email, password };

      const { data } = await axios.post(backendURL + endpoint, payload);

      if (data.success) {
        settoken(data.token);
        setUser(data.user);
        localStorage.setItem("token", data.token);
        setshowLogin(false);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "An error occurred");
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 z-10 right-0 bottom-0 backdrop-blur-sm bg-black/30 flex justify-center items-center">
      <motion.form
        initial={{ opacity: 0.1, y: 100 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        onSubmit={onSubmitHandler}
        className="relative bg-white p-10 rounded-xl text-slate-500"
      >
        <h1 className="text-center text-2xl text-neutral-700 font-medium">{state}</h1>
        <p className="text-sm">Welcome Back! Please Sign in to continue</p>

        {state !== "Login" && (
          <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-5">
            <img src={assets.user_icon} alt="" />
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Full Name"
              className="outline-none text-sm"
              required
            />
          </div>
        )}

        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-5">
          <img src={assets.email_icon} alt="Email Icon" />
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Email Id"
            className="outline-none text-sm"
            required
          />
        </div>

        <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-5">
          <img src={assets.lock_icon} alt="Lock Icon" />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
            className="outline-none text-sm"
            required
          />
        </div>

        <p className="text-sm text-blue-600 my-4 cursor-pointer">Forgot Password?</p>
        <button className="text-white rounded-full w-full bg-blue-600 py-2 cursor-pointer">
          {state === "Login" ? "Login" : "Create Account"}
        </button>

        {state === "Login" ? (
          <p className="mt-5 text-center">
            Don't have an Account?{" "}
            <span onClick={() => setState("Sign Up")} className="cursor-pointer text-blue-600">
              Sign Up
            </span>
          </p>
        ) : (
          <p className="mt-5 text-center">
            Already have an Account?{" "}
            <span onClick={() => setState("Login")} className="cursor-pointer text-blue-600">
              Login
            </span>
          </p>
        )}

        <img
          onClick={() => setshowLogin(false)}
          src={assets.cross_icon}
          className="cursor-pointer absolute top-5 right-5"
          alt="Close"
        />
      </motion.form>
    </div>
  );
};

export default Login;
