import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GiTrophy, GiCricketBat } from "react-icons/gi";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaQuestionCircle,
  FaBirthdayCake,
} from "react-icons/fa";
import { BiCricketBall } from "react-icons/bi";
import { MdSportsCricket } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import confetti from "canvas-confetti";

const stages = ["Personal Info", "Contact Details", "Cricket Experience"];

export default function RegistrationForm() {
  const [currentStage, setCurrentStage] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    email: "",
    phone: "",
    experience: "",
    position: "",
    battingStyle: "",
    bowlingStyle: "",
  });
  const [errors, setErrors] = useState({});
  const [showHelp, setShowHelp] = useState(false);

  const validateStage = () => {
    let formErrors = {};
    const {
      firstName,
      lastName,
      dateOfBirth,
      email,
      phone,
      experience,
      position,
      battingStyle,
      bowlingStyle,
    } = formData;

    if (currentStage === 0) {
      if (!firstName.trim()) formErrors.firstName = "First name is required";
      if (!lastName.trim()) formErrors.lastName = "Last name is required";
      if (!dateOfBirth) {
        formErrors.dateOfBirth = "Date of birth is required";
      } else {
        const age =
          new Date().getFullYear() - new Date(dateOfBirth).getFullYear();
        if (age < 5 || age > 100)
          formErrors.dateOfBirth =
            "Please enter a valid date of birth (age between 5 and 100)";
      }
    } else if (currentStage === 1) {
      if (!email || !/\S+@\S+\.\S+/.test(email))
        formErrors.email = "A valid email is required";
      if (!phone || !/^\d{10}$/.test(phone))
        formErrors.phone = "A valid 10-digit phone number is required";
    } else if (currentStage === 2) {
      if (!experience || parseInt(experience) < 0)
        formErrors.experience = "Experience must be a positive number";
      if (!position) formErrors.position = "Please select a position";
      if (!battingStyle)
        formErrors.battingStyle = "Please select your batting style";
      if (!bowlingStyle)
        formErrors.bowlingStyle = "Please select your bowling style";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStage()) return;
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          body: JSON.stringify(formData),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        }
      );
      const data = await response.json();
      console.log("Registration successful:", data);
      toast.success(
        "Howzat! You're registered! We'll contact you soon about fees and next steps.",
        {
          position: "top-center",
          autoClose: 5000,
        }
      );
      triggerConfetti();
      setFormData({
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        email: "",
        phone: "",
        experience: "",
        position: "",
        battingStyle: "",
        bowlingStyle: "",
      });
      setCurrentStage(0);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Stumped! Registration failed. Please try again.", {
        position: "top-center",
        autoClose: 5000,
      });
    }
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#4CAF50", "#FFC107", "#2196F3"],
    });
  };

  const nextStage = () => {
    if (validateStage()) setCurrentStage(currentStage + 1);
  };
  const prevStage = () => {
    if (currentStage > 0) setCurrentStage(currentStage - 1);
  };

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 bg-green-50 relative">
      <ToastContainer />
      <motion.button
        className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 rounded-full p-3 shadow-lg z-10"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowHelp(!showHelp)}
      >
        <FaQuestionCircle size={24} />
      </motion.button>
      <AnimatePresence>
        {showHelp && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 right-4 bg-white p-4 rounded-lg shadow-xl max-w-sm border-2 border-green-600 z-20"
          >
            <h3 className="font-bold mb-2 flex items-center justify-center">
              <FaQuestionCircle className="mr-2 text-green-600" /> Need Help?
            </h3>
            <p className="text-center text-sm">
              If you have any questions about the registration process, please
              contact our support team at support@xyzorganization.com or call us
              at 9876534523.
            </p>
            <button
              onClick={() => setShowHelp(false)}
              className="mt-2 text-sm text-green-600 hover:text-green-800 flex items-center justify-center mx-auto"
            >
              <BiCricketBall className="mr-1" /> Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.h1
        className="text-2xl md:text-4xl font-bold text-center mb-8 text-green-700 flex items-center justify-center"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <GiTrophy className="inline-block mr-2 text-yellow-400" />
        Join the XYZ Organization
        <GiCricketBat className="inline-block ml-2 text-green-600" />
      </motion.h1>

      <div className="flex flex-col md:flex-row gap-8">
        <motion.div
          className="w-full md:w-2/3 bg-white rounded-lg shadow-lg p-6 border-2 border-green-600"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6">
            <div className="flex justify-between mb-2">
              {stages.map((stage, index) => (
                <div
                  key={stage}
                  className={`w-1/3 text-center font-semibold flex flex-col items-center ${
                    index <= currentStage ? "text-green-600" : "text-gray-400"
                  }`}
                >
                  {index === 0 && <FaUser className="mb-1" />}
                  {index === 1 && <FaEnvelope className="mb-1" />}
                  {index === 2 && <MdSportsCricket className="mb-1" />}
                  <span className="text-xs md:text-sm">{stage}</span>
                </div>
              ))}
            </div>
            <div className="relative">
              <div className="h-2 mb-4 flex bg-green-200 rounded">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{
                    width: `${((currentStage + 1) / stages.length) * 100}%`,
                  }}
                  className="bg-green-600 flex-grow rounded"
                ></motion.div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              {currentStage === 0 && (
                <motion.div
                  key="stage0"
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 100, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <InputField
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    error={errors.firstName}
                    icon={<FaUser className="inline-block mr-2" />}
                  />
                  <InputField
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    error={errors.lastName}
                    icon={<FaUser className="inline-block mr-2" />}
                  />
                  <InputField
                    label="Date of Birth"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    error={errors.dateOfBirth}
                    icon={<FaBirthdayCake className="inline-block mr-2" />}
                  />
                </motion.div>
              )}

              {currentStage === 1 && (
                <motion.div
                  key="stage1"
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 100, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <InputField
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={errors.email}
                    icon={<FaEnvelope className="inline-block mr-2" />}
                  />
                  <InputField
                    label="Phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    error={errors.phone}
                    icon={<FaPhone className="inline-block mr-2" />}
                  />
                </motion.div>
              )}

              {currentStage === 2 && (
                <motion.div
                  key="stage2"
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 100, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <InputField
                    label="Cricket Experience (Years)"
                    name="experience"
                    type="number"
                    value={formData.experience}
                    onChange={handleInputChange}
                    error={errors.experience}
                    icon={<GiCricketBat className="inline-block mr-2" />}
                    min="0"
                  />
                  <SelectField
                    label="Preferred Position"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    error={errors.position}
                    icon={<BiCricketBall className="inline-block mr-2" />}
                    options={[
                      { value: "", label: "Select a position" },
                      { value: "Batsman", label: "Batsman" },
                      { value: "Bowler", label: "Bowler" },
                      { value: "All-rounder", label: "All-rounder" },
                      { value: "Wicket-keeper", label: "Wicket-keeper" },
                    ]}
                  />
                  <SelectField
                    label="Batting Style"
                    name="battingStyle"
                    value={formData.battingStyle}
                    onChange={handleInputChange}
                    error={errors.battingStyle}
                    icon={<GiCricketBat className="inline-block mr-2" />}
                    options={[
                      { value: "", label: "Select your batting style" },
                      { value: "Right-handed", label: "Right-handed" },
                      { value: "Left-handed", label: "Left-handed" },
                    ]}
                  />
                  <SelectField
                    label="Bowling Style"
                    name="bowlingStyle"
                    value={formData.bowlingStyle}
                    onChange={handleInputChange}
                    error={errors.bowlingStyle}
                    icon={<BiCricketBall className="inline-block mr-2" />}
                    options={[
                      { value: "", label: "Select your bowling style" },
                      { value: "Fast", label: "Fast" },
                      { value: "Medium", label: "Medium" },
                      { value: "Spin", label: "Spin" },
                      { value: "Not applicable", label: "Not applicable" },
                    ]}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-between mt-6">
              {currentStage > 0 && (
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  onClick={prevStage}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-400 transition-colors duration-300 flex items-center text-sm md:text-base"
                >
                  <BiCricketBall className="mr-2" /> Previous
                </motion.button>
              )}
              {currentStage < stages.length - 1 ? (
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  onClick={nextStage}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-300 flex items-center text-sm md:text-base"
                >
                  Next <GiCricketBat className="ml-2" />
                </motion.button>
              ) : (
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-300 flex items-center text-sm md:text-base"
                >
                  Submit <GiTrophy className="ml-2" />
                </motion.button>
              )}
            </div>
          </form>
        </motion.div>

        <motion.div
          className="w-full md:w-1/3 bg-green-100 rounded-lg shadow-lg p-6 border-2 border-green-600"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-xl md:text-2xl font-bold mb-4 text-green-700 flex items-center">
            <MdSportsCricket className="mr-2" /> Why Join Us?
          </h2>
          <ul className="list-none mb-6 text-green-800 text-sm md:text-base">
            <li className="flex items-center mb-2">
              <GiCricketBat className="mr-2" /> Access to top-notch coaching
            </li>
            <li className="flex items-center mb-2">
              <MdSportsCricket className="mr-2" /> State-of-the-art training
              facilities
            </li>
            <li className="flex items-center mb-2">
              <GiTrophy className="mr-2" /> Opportunities to compete at various
              levels
            </li>
            <li className="flex items-center mb-2">
              <BiCricketBall className="mr-2" /> Networking with cricket
              professionals
            </li>
            <li className="flex items-center mb-2">
              <GiCricketBat className="mr-2" /> Exclusive member benefits and
              discounts
            </li>
          </ul>

          <h3 className="text-lg md:text-xl font-bold mb-2 text-green-700 flex items-center">
            <GiTrophy className="mr-2" /> Testimonials
          </h3>
          <div className="space-y-4">
            <blockquote className="italic text-green-800 bg-white p-4 rounded-lg shadow text-sm md:text-base">
              "Joining XYZ Cricket Club was the best decision of my career. The
              coaching and exposure I received were invaluable."
              <footer className="text-right font-bold mt-2">
                - John Doe, Professional Cricketer
              </footer>
            </blockquote>
            <blockquote className="italic text-green-800 bg-white p-4 rounded-lg shadow text-sm md:text-base">
              "The facilities and training programs at XYZ are world-class. I've
              seen tremendous improvement in my skills."
              <footer className="text-right font-bold mt-2">
                - Jane Smith, Under-19 Player
              </footer>
            </blockquote>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

const InputField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  icon,
  ...props
}) => (
  <div className="mb-4">
    <label
      htmlFor={name}
      className="block text-gray-700 font-bold mb-2 text-sm md:text-base"
    >
      {icon} {label}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 text-sm md:text-base"
      required
      {...props}
    />
    {error && <p className="text-red-500 text-xs md:text-sm">{error}</p>}
  </div>
);

const SelectField = ({
  label,
  name,
  value,
  onChange,
  error,
  icon,
  options,
}) => (
  <div className="mb-4">
    <label
      htmlFor={name}
      className="block text-gray-700 font-bold mb-2 text-sm md:text-base"
    >
      {icon} {label}
    </label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 text-sm md:text-base"
      required
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    {error && <p className="text-red-500 text-xs md:text-sm">{error}</p>}
  </div>
);
