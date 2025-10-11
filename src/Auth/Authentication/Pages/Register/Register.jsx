import React from "react";
import { useForm } from "react-hook-form";
import { FaUser, FaEnvelope, FaLock, FaImage } from "react-icons/fa";
import Lottie from "lottie-react";
import registerAnimation from "../../../../assets/Lottie/User-Register.json"; 
import GoogleLogin from "../SocialLogin/GoogleLogin";
import { Link } from "react-router";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    alert(`Welcome, ${data.name}`);
  };

  const handleGoogleSuccess = (credentialResponse) => {
    console.log("Google Credential:", credentialResponse);
    alert("Google Signup Successful!");
  };

  const handleGoogleFailure = () => {
    alert("Google Signup Failed. Try Again!");
  };

  // Watch password field for confirmation validation
  const password = watch("password");

  return (
    <div className="flex flex-col-reverse md:flex-row min-h-screen bg-gradient-to-r from-green-50 via-white to-green-100">

      {/* Left Side: Form */}
      <div className="md:w-1/2 flex flex-col justify-center items-center p-5 lg:p-8">
        <div className="w-full max-w-md bg-white p-5 lg:p-12 rounded-3xl shadow-2xl border border-gray-200">
          <h2 className="text-4xl font-extrabold mb-8 text-green-600 text-center">
            Create Account
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">

            {/* Name Field */}
            <div className="flex items-center gap-4 border border-gray-300 rounded-2xl px-5 py-3
                            focus-within:ring-2 focus-within:ring-green-400 transition-shadow duration-300
                            shadow-sm hover:shadow-md">
              <FaUser className="text-gray-400 text-xl" />
              <input
                type="text"
                placeholder="Full Name"
                {...register("name", { required: "Name is required" })}
                className="w-full outline-none text-gray-700 placeholder-gray-400 text-lg"
              />
            </div>
            {errors.name && <span className="text-red-500 text-sm ml-2">{errors.name.message}</span>}

            {/* Email Field */}
            <div className="flex items-center gap-4 border border-gray-300 rounded-2xl px-5 py-3
                            focus-within:ring-2 focus-within:ring-green-400 transition-shadow duration-300
                            shadow-sm hover:shadow-md">
              <FaEnvelope className="text-gray-400 text-xl" />
              <input
                type="email"
                placeholder="Email"
                {...register("email", { required: "Email is required" })}
                className="w-full outline-none text-gray-700 placeholder-gray-400 text-lg"
              />
            </div>
            {errors.email && <span className="text-red-500 text-sm ml-2">{errors.email.message}</span>}

            {/* Photo URL Field */}
            <div className="flex items-center gap-4 border border-gray-300 rounded-2xl px-5 py-3
                            focus-within:ring-2 focus-within:ring-green-400 transition-shadow duration-300
                            shadow-sm hover:shadow-md">
              <FaImage className="text-gray-400 text-xl" />
              <input
                type="text"
                placeholder="Photo URL"
                {...register("photoURL")}
                className="w-full outline-none text-gray-700 placeholder-gray-400 text-lg"
              />
            </div>

            {/* Password Field */}
            <div className="flex items-center gap-4 border border-gray-300 rounded-2xl px-5 py-3
                            focus-within:ring-2 focus-within:ring-green-400 transition-shadow duration-300
                            shadow-sm hover:shadow-md">
              <FaLock className="text-gray-400 text-xl" />
              <input
                type="password"
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
                className="w-full outline-none text-gray-700 placeholder-gray-400 text-lg"
              />
            </div>
            {errors.password && <span className="text-red-500 text-sm ml-2">{errors.password.message}</span>}

            {/* Confirm Password Field */}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-4 border border-gray-300 rounded-2xl px-5 py-3
                              focus-within:ring-2 focus-within:ring-green-400 transition-shadow duration-300
                              shadow-sm hover:shadow-md">
                <FaLock className="text-gray-400 text-xl" />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  {...register("confirmPassword", { 
                    required: "Confirm Password is required",
                    validate: value => value === password || "Passwords do not match"
                  })}
                  className="w-full outline-none text-gray-700 placeholder-gray-400 text-lg"
                />
              </div>
              {errors.confirmPassword && (
                <span className="text-red-500 text-sm ml-2">{errors.confirmPassword.message}</span>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-2xl
                         shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 font-semibold text-lg"
            >
              Register
            </button>

            {/* Already have account */}
            <p className="text-center text-gray-500 text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-green-600 font-semibold cursor-pointer hover:underline">
                Login
              </Link>
            </p>

            {/* Google Signup Button */}
            <div className="flex justify-center mt-2">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleFailure}
              />
            </div>
          </form>
        </div>
      </div>

      {/* Right Side: Lottie Animation */}
      <div className="md:w-1/2 flex justify-center items-center p-8 bg-gradient-to-br from-green-50 to-white">
        <Lottie
          animationData={registerAnimation}
          loop={true}
          className="w-80 h-80 md:w-96 md:h-96"
        />
      </div>
    </div>
  );
};

export default Register;
