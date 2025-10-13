import React from "react";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaLock } from "react-icons/fa";
import Lottie from "lottie-react";
import loginAnimation from "../../../../assets/Lottie/user-login.json"; // Lottie JSON file path
import GoogleLogin from "../SocialLogin/GoogleLogin";
import { Link, NavLink } from "react-router";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    alert(`Welcome, ${data.email}`);
  };

  const handleGoogleSuccess = (credentialResponse) => {
    console.log("Google Credential:", credentialResponse);
    alert("Google Login Successful!");
  };

  const handleGoogleFailure = () => {
    alert("Google Login Failed. Try Again!");
  };

  return (
    <div className="flex flex-col-reverse md:flex-row min-h-screen bg-gradient-to-r from-blue-50 via-white to-blue-100">
      {/* Left Side: Form */}
      <div className="md:w-1/2 flex flex-col justify-center items-center p-5 lg:p-8">
        <div className="w-full max-w-md bg-white p-5 lg:p-12 rounded-3xl shadow-2xl border border-gray-200">
          <h2 className="text-4xl font-extrabold mb-8 text-blue-600 text-center">
            Welcome Back
          </h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            {/* Email Field */}
            <div
              className="flex items-center gap-4 border border-gray-300 rounded-2xl px-5 py-3
                            focus-within:ring-2 focus-within:ring-blue-400 transition-shadow duration-300
                            shadow-sm hover:shadow-md"
            >
              <FaEnvelope className="text-gray-400 text-xl" />
              <input
                type="email"
                placeholder="Email"
                {...register("email", { required: "Email is required" })}
                className="w-full outline-none text-gray-700 placeholder-gray-400 text-lg"
              />
            </div>
            {errors.email && (
              <span className="text-red-500 text-sm ml-2">
                {errors.email.message}
              </span>
            )}

            {/* Password Field */}
            <div className="flex flex-col gap-1">
              <div
                className="flex items-center gap-4 border border-gray-300 rounded-2xl px-5 py-3
                              focus-within:ring-2 focus-within:ring-blue-400 transition-shadow duration-300
                              shadow-sm hover:shadow-md"
              >
                <FaLock className="text-gray-400 text-xl" />
                <input
                  type="password"
                  placeholder="Password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="w-full outline-none text-gray-700 placeholder-gray-400 text-lg"
                />
              </div>
              {/* Forgot Password */}
            </div>
            {errors.password && (
              <span className="text-red-500 text-sm ml-2">
                {errors.password.message}
              </span>
            )}
            <div className="">
              <button
                type="button"
                className="text-blue-600 text-sm hover:underline font-medium"
              >
                Forgot Password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-2xl
                         shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 font-semibold text-lg"
            >
              Login
            </button>

            {/* Account signup prompt */}
            <p className="text-center text-gray-500 text-sm">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-600 font-semibold cursor-pointer hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </form>
           {/* Google Login Button */}
            <div className="flex justify-center mt-3">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleFailure}
              />
            </div>
        </div>
      </div>

      {/* Right Side: Lottie Animation */}
      <div className="md:w-1/2 flex justify-center items-center p-8 bg-gradient-to-br from-blue-50 to-white">
        <Lottie
          animationData={loginAnimation}
          loop={true}
          className="w-80 h-80 md:w-96 md:h-96"
        />
      </div>
    </div>
  );
};

export default LoginForm;
