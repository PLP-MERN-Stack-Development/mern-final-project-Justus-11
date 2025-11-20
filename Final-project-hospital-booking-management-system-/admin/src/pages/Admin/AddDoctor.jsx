import React, { useState, useContext } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/adminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General Physician");
  const [customSpeciality, setCustomSpeciality] = useState("");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const { backendUrl, aToken } = useContext(AdminContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!docImg) return toast.error("Image not selected");
    if (!aToken) return toast.error("You must be logged in as admin!");

    try {
      const formData = new FormData();
      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", fees);
      formData.append("about", about);
      formData.append("speciality", speciality === "other" ? customSpeciality : speciality);
      formData.append("degree", degree);
      formData.append("address", JSON.stringify({ line1: address1, line2: address2 }));

      const { data } = await axios.post(`${backendUrl}/api/admin/add-doctor`, formData, {
        headers: {
          Authorization: `Bearer ${aToken}`, // ✅ token must be sent like this
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.success) {
        toast.success(data.message);

        // Reset form
        setDocImg(null);
        setName("");
        setEmail("");
        setPassword("");
        setExperience("1 Year");
        setFees("");
        setAbout("");
        setSpeciality("General Physician");
        setCustomSpeciality("");
        setDegree("");
        setAddress1("");
        setAddress2("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-6 mt-8 space-y-4">
      <p className="text-xl font-semibold text-gray-800 border-b pb-2">Add Doctor</p>

      {/* Upload Picture */}
      <div className="flex flex-col items-center border-2 border-dashed border-gray-300 p-3 rounded-xl hover:bg-gray-50 transition">
        <label htmlFor="doc-img" className="cursor-pointer text-center">
          <div className="w-20 h-20 border rounded-md overflow-hidden flex items-center justify-center bg-gray-50">
            <img
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </label>
        <input type="file" id="doc-img" hidden onChange={(e) => setDocImg(e.target.files[0])} />
        <p className="text-gray-500 text-xs mt-1">Upload doctor picture</p>
      </div>

      {/* Doctor Details */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Name */}
        <div>
          <p className="text-sm font-medium mb-1">Doctor Name</p>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name"
            required
            className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Email */}
        <div>
          <p className="text-sm font-medium mb-1">Doctor Email</p>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            required
            className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Password */}
        <div>
          <p className="text-sm font-medium mb-1">Doctor Password</p>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            required
            className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Experience */}
        <div>
          <p className="text-sm font-medium mb-1">Experience</p>
          <select
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-500"
          >
            {Array.from({ length: 10 }, (_, i) => (
              <option key={i + 1} value={`${i + 1} Year`}>
                {i + 1} Year
              </option>
            ))}
          </select>
        </div>

        {/* Fees */}
        <div>
          <p className="text-sm font-medium mb-1">Fees</p>
          <input
            value={fees}
            onChange={(e) => setFees(e.target.value)}
            type="number"
            placeholder="Fees"
            required
            className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Speciality */}
        <div>
          <p className="text-sm font-medium mb-1">Speciality</p>
          <select
            value={speciality}
            onChange={(e) => setSpeciality(e.target.value)}
            className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="General Physician">General Physician</option>
            <option value="Gynacologist">Gynacologist</option>
            <option value="Dermatologist">Dermatologist</option>
            <option value="Pediatrician">Pediatrician</option>
            <option value="Neurologist">Neurologist</option>
            <option value="Gastroenterologist">Gastroenterologist</option>
            <option value="other">Other</option>
          </select>

          {speciality === "other" && (
            <input
              value={customSpeciality}
              onChange={(e) => setCustomSpeciality(e.target.value)}
              type="text"
              placeholder="Enter specialization"
              required
              className="mt-2 w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-500"
            />
          )}
        </div>

        {/* Degree */}
        <div>
          <p className="text-sm font-medium mb-1">Education</p>
          <input
            value={degree}
            onChange={(e) => setDegree(e.target.value)}
            type="text"
            placeholder="Education"
            required
            className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        {/* Address */}
        <div className="md:col-span-2">
          <p className="text-sm font-medium mb-1">Address</p>
          <div className="flex flex-col md:flex-row gap-3">
            <input
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
              type="text"
              placeholder="Address 1"
              required
              className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-500"
            />
            <input
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
              type="text"
              placeholder="Address 2"
              required
              className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* About */}
      <div>
        <p className="text-sm font-medium mb-1">About Doctor</p>
        <textarea
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          placeholder="Write about doctor"
          rows={4}
          required
          className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-sm font-medium transition"
      >
        Add Doctor
      </button>
    </form>
  );
};

export default AddDoctor;
