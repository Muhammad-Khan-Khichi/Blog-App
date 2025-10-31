import { useForm } from "react-hook-form";
import Button from "./Button";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { login as authLogin } from "../store/authSlice";
import { FiMail, FiLock } from "react-icons/fi";

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin({ userData }));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <span className="text-4xl font-extrabold text-indigo-600 tracking-widest">
            MK
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-2">
          Sign In to Your Account
        </h2>

        <p className="text-center text-gray-600 text-sm mb-6">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-indigo-600 font-medium hover:underline hover:text-indigo-500 transition-all"
          >
            Sign Up
          </Link>
        </p>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-center bg-red-100 py-2 rounded-lg mb-4">
            {error}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(login)} className="space-y-6">
          {/* Email */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <FiMail className="absolute left-3 top-9 text-indigo-500 text-lg pointer-events-none" />
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="Enter your email"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-gray-800 placeholder-gray-400"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <FiLock className="absolute left-3 top-9 text-indigo-500 text-lg pointer-events-none" />
            <input
              {...register("password", { required: true })}
              type="password"
              placeholder="Enter your password"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition text-gray-800 placeholder-gray-400"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 px-4 rounded-xl transition duration-300 shadow-lg hover:shadow-indigo-300/30"
          >
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
