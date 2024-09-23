import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaCreditCard } from "react-icons/fa";
import { GiCricketBat } from "react-icons/gi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const registrationStages = ["Team Info", "Player Details", "Payment"];

export default function TeamRegistration() {
  const [currentStage, setCurrentStage] = useState(0);
  const [teamInfo, setTeamInfo] = useState({
    name: "",
    category: "",
    coach: "",
  });
  const [players, setPlayers] = useState([{ name: "", age: "", role: "" }]);
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [errors, setErrors] = useState({});

  const handleTeamInfoChange = (e) =>
    setTeamInfo({ ...teamInfo, [e.target.name]: e.target.value });
  const handlePlayerChange = (index, e) => {
    const updatedPlayers = [...players];
    updatedPlayers[index] = {
      ...updatedPlayers[index],
      [e.target.name]: e.target.value,
    };
    setPlayers(updatedPlayers);
  };
  const addPlayer = () =>
    players.length < 11
      ? setPlayers([...players, { name: "", age: "", role: "" }])
      : toast.warn("You can only add up to 11 players.");
  const removePlayer = (index) =>
    setPlayers(players.filter((_, i) => i !== index));

  const handlePaymentInfoChange = (e) =>
    setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });

  const validate = () => {
    const newErrors = {};
    if (currentStage === 0) {
      if (!teamInfo.name) newErrors.name = "Team name is required";
      if (!teamInfo.category) newErrors.category = "Category is required";
      if (!teamInfo.coach) newErrors.coach = "Coach name is required";
    }
    if (currentStage === 1) {
      players.forEach((player, index) => {
        if (!player.name)
          newErrors[`playerName${index}`] = "Player name is required";
        if (!player.age || player.age <= 10)
          newErrors[`playerAge${index}`] = "Player age must be greater than 10";
        if (!player.role)
          newErrors[`playerRole${index}`] = "Player role is required";
      });
      if (players.length < 1)
        newErrors.players = "At least one player is required.";
    }
    if (currentStage === 2) {
      if (!paymentInfo.cardNumber)
        newErrors.cardNumber = "Card number is required";
      if (!paymentInfo.expiry) newErrors.expiry = "Expiry date is required";
      if (!paymentInfo.cvv) newErrors.cvv = "CVV is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Submission data:", { teamInfo, players, paymentInfo });
      toast.success("Registration submitted successfully!");
      setTeamInfo({ name: "", category: "", coach: "" });
      setPlayers([{ name: "", age: "", role: "" }]);
      setPaymentInfo({ cardNumber: "", expiry: "", cvv: "" });
      setCurrentStage(0);
    }
  };

  const nextStage = () => {
    if (validate()) setCurrentStage(currentStage + 1);
  };

  const prevStage = () => setCurrentStage(currentStage - 1);

  return (
    <div className="container mx-auto px-4 py-12">
      <ToastContainer />
      <motion.h1
        className="text-4xl font-bold text-center mb-8"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <GiCricketBat className="inline mr-2" /> Team Registration
      </motion.h1>
      <motion.div
        className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="mb-6">
          <div className="flex justify-between">
            {registrationStages.map((stage, index) => (
              <div
                key={stage}
                className={`text-center ${
                  index <= currentStage
                    ? "text-green-600 font-semibold"
                    : "text-gray-400"
                }`}
              >
                {stage}
              </div>
            ))}
          </div>
          <div className="relative pt-1">
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
              <div
                style={{
                  width: `${
                    ((currentStage + 1) / registrationStages.length) * 100
                  }%`,
                }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-600"
              ></div>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          {currentStage === 0 && (
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
            >
              <h2 className="text-2xl font-semibold mb-4">
                <FaUser className="inline mr-2" /> Team Information
              </h2>
              <div className="space-y-4">
                {["name", "category", "coach"].map((field, idx) => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-gray-700">
                      {field === "category"
                        ? "Category"
                        : field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    {field === "category" ? (
                      <select
                        name="category"
                        value={teamInfo.category}
                        onChange={handleTeamInfoChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      >
                        <option value="">Select a category</option>
                        <option value="Under-19">Under-19</option>
                        <option value="Senior">Senior</option>
                        <option value="Women">Women</option>
                      </select>
                    ) : (
                      <input
                        type="text"
                        name={field}
                        value={teamInfo[field]}
                        onChange={handleTeamInfoChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      />
                    )}
                    {errors[field] && (
                      <p className="text-red-500 text-sm">{errors[field]}</p>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
          {currentStage === 1 && (
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
            >
              <h2 className="text-2xl font-semibold mb-4">Player Details</h2>
              {players.map((player, index) => (
                <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">
                    Player {index + 1}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {["name", "age", "role"].map((field) => (
                      <div key={field}>
                        <label className="block text-sm font-medium text-gray-700">
                          {field.charAt(0).toUpperCase() + field.slice(1)}
                        </label>
                        {field === "role" ? (
                          <select
                            name="role"
                            value={player.role}
                            onChange={(e) => handlePlayerChange(index, e)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                          >
                            <option value="">Select a role</option>
                            {[
                              "Batsman",
                              "Bowler",
                              "All-rounder",
                              "Wicket-keeper",
                            ].map((role) => (
                              <option key={role} value={role}>
                                {role}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type={field === "age" ? "number" : "text"}
                            name={field}
                            value={player[field]}
                            onChange={(e) => handlePlayerChange(index, e)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                            min={field === "age" ? "11" : undefined}
                          />
                        )}
                        {errors[
                          `player${
                            field.charAt(0).toUpperCase() + field.slice(1)
                          }${index}`
                        ] && (
                          <p className="text-red-500 text-sm">
                            {
                              errors[
                                `player${
                                  field.charAt(0).toUpperCase() + field.slice(1)
                                }${index}`
                              ]
                            }
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => removePlayer(index)}
                    disabled={players.length <= 1}
                    className={`mt-2 ${
                      players.length <= 1
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-red-600 hover:bg-red-700"
                    } text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-300`}
                  >
                    Remove Player
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addPlayer}
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-300"
                disabled={players.length >= 11}
              >
                Add Player
              </button>
            </motion.div>
          )}
          {currentStage === 2 && (
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
            >
              <h2 className="text-2xl font-semibold mb-4">
                <FaCreditCard className="inline mr-2" /> Payment Information
              </h2>
              <div className="space-y-4">
                {["cardNumber", "expiry", "cvv"].map((field, index) => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-gray-700">
                      {field === "expiry"
                        ? "Expiry Date"
                        : field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                    <input
                      type={field === "expiry" ? "text" : "text"}
                      name={field}
                      value={paymentInfo[field]}
                      onChange={handlePaymentInfoChange}
                      placeholder={field === "expiry" ? "MM/YY" : ""}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    />
                    {errors[field] && (
                      <p className="text-red-500 text-sm">{errors[field]}</p>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
          <div className="mt-8 flex justify-between">
            {currentStage > 0 && (
              <button
                type="button"
                onClick={prevStage}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-400 transition-colors duration-300"
              >
                Previous
              </button>
            )}
            {currentStage < registrationStages.length - 1 ? (
              <button
                type="button"
                onClick={nextStage}
                className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-300"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-300"
              >
                Submit Registration
              </button>
            )}
          </div>
        </form>
      </motion.div>
    </div>
  );
}
