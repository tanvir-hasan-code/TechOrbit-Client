import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const MyProfile = () => {
  const { user, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [photoFile, setPhotoFile] = useState(null);
  const [loading, setLoading] = useState(false);
  // const isSubscribed = false;

  // File change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhotoFile(file);
  };

  // Upload to imgbb
  const uploadImageToImgbb = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    const apiKey = import.meta.env.VITE_IMGBB_API_KEY;

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    return data.data.url;
  };

  // Update Profile
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let finalPhotoURL = photoURL;
      if (photoFile) {
        finalPhotoURL = await uploadImageToImgbb(photoFile);
      }

      await updateUserProfile({
        displayName,
        photoURL: finalPhotoURL,
      });

      setPhotoURL(finalPhotoURL);
      setPhotoFile(null);

      Swal.fire({
        icon: "success",
        title: "Profile Updated!",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Update Failed!",
        text: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  // Navigate to Payment page
  const handleSubscribeClick = () => {
    navigate("/payment");
  };

  const { data: currentUser = {} } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user.email}`);
      return res.data;
    }
  })


  // Form change check
  const isFormChanged = displayName !== user?.displayName || photoFile !== null;

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <div className="card w-full  lg:w-1/2 bg-base-100 shadow-xl border border-gray-200">
        <div className="card-body items-center text-center">
          {/* User Info */}
          <div className="flex flex-col items-center">
            <div className="avatar">
              <div className="w-28 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src={
                    photoFile
                      ? URL.createObjectURL(photoFile)
                      : user?.photoURL ||
                        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
                  }
                  alt="Profile"
                />
              </div>
            </div>

            <h2 className="mt-4 text-2xl font-bold text-blue-600">
              {displayName || "User Name"}
            </h2>

            <p className="text-gray-500">{user?.email}</p>

            {/* Subscription Status */}
            {currentUser?.isVerified ? (
              <button
                disabled
                className="mt-3 btn bg-gradient-to-r from-yellow-400 to-orange-500 border-none text-white font-semibold shadow-lg hover:scale-105 transition-transform duration-300"
              >
                🌟 Premium Member
              </button>
            ) : (
              <button
                onClick={handleSubscribeClick}
                className="mt-3 btn bg-gradient-to-r from-purple-500 to-pink-500 border-none text-white font-semibold shadow-lg hover:scale-105 transition-transform duration-300"
              >
                Subscribe Now $10
              </button>
            )}
          </div>

          {/* Update Form */}
          <form
            onSubmit={handleUpdateProfile}
            className="w-full mt-6 space-y-4 px-2"
          >
            <div>
              <label className="label">
                <span className="label-text font-semibold">Full Name</span>
              </label>
              <input
                type="text"
                defaultValue={user?.displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="input input-bordered w-full"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text font-semibold">Email</span>
              </label>
              <input
                type="text"
                defaultValue={user?.email}
                readOnly
                className="input input-bordered w-full"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text font-semibold">Change Photo</span>
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="file-input file-input-bordered w-full"
              />
            </div>

            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className={`btn btn-primary w-full md:w-1/2 ${
                  !isFormChanged || loading ? "btn-disabled" : ""
                }`}
                disabled={!isFormChanged || loading}
              >
                {loading ? "Updating..." : "Update Profile"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
