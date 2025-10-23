import React from "react";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaLock, FaArrowLeft } from "react-icons/fa";
import Lottie from "lottie-react";
import loginAnimation from "../../../../assets/Lottie/user-login.json";
import GoogleLogin from "../SocialLogin/GoogleLogin";
import { Link, useNavigate, useLocation } from "react-router";
import TechOrbitLogo from "../../../../Shared/TechOrbitLogo/TechOrbitLogo";
import useAuth from "../../../../Hooks/useAuth";
import Swal from "sweetalert2";
import useTitle from "../../../../Hooks/useTitle";

const LoginForm = () => {
  useTitle("Login")
  const { signInUser, setLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const email = data.email;
    const password = data.password;

    try {
      const res = await signInUser(email, password);
      if (res.user) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Logged in Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        setLoading(false);
        navigate(from);
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Login Failed!",
          showConfirmButton: false,
          timer: 1500,
        });
        setLoading(false);
      }
    } catch (err) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: err.message || "Login Failed!",
        showConfirmButton: false,
        timer: 1500,
      });
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col-reverse md:flex-row min-h-screen bg-gradient-to-r from-blue-50 via-white to-blue-100 relative">
      {/* Back Button & Logo */}
      <div className="absolute top-6 left-6 flex items-center gap-3">
        <TechOrbitLogo textColor="text-blue-500"/>
      </div>

      {/* Left Side: Form */}
      <div className="md:w-1/2 flex flex-col  justify-center items-center mt-16 lg:mt-0 p-5 lg:p-8">
        <div className="w-full max-w-md bg-white p-5 lg:p-12 rounded-3xl shadow-2xl border border-gray-200">
          <h2 className="text-4xl font-extrabold mb-8 text-blue-600 text-center">
            Welcome Back
          </h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            {/* Email Field */}
            <div className="flex items-center gap-4 border border-gray-300 rounded-2xl px-5 py-3 focus-within:ring-2 focus-within:ring-blue-400 transition-shadow duration-300 shadow-sm hover:shadow-md">
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
              <div className="flex items-center gap-4 border border-gray-300 rounded-2xl px-5 py-3 focus-within:ring-2 focus-within:ring-blue-400 transition-shadow duration-300 shadow-sm hover:shadow-md">
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
            </div>
            {errors.password && (
              <span className="text-red-500 text-sm ml-2">
                {errors.password.message}
              </span>
            )}

            {/* Forgot Password */}
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
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 font-semibold text-lg"
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

          {/* Google Login */}
          <div className="flex justify-center mt-3">
            <GoogleLogin />
          </div>
        </div>
      </div>

      {/* Right Side: Lottie Animation */}
      <div className="md:w-1/2 pt-16 md:pt-0 flex justify-center items-center p-8 bg-gradient-to-br from-blue-50 to-white">
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
