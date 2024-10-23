import React, { useState, useEffect } from "react";
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

  const addPlayer = () => {
    if (players.length < 11) {
      setPlayers([...players, { name: "", age: "", role: "" }]);
    } else {
      toast.warn("You can only add up to 11 players.");
    }
  };

  const removePlayer = (index) => {
    if (players.length > 1) {
      setPlayers(players.filter((_, i) => i !== index));
    }
  };

  const handlePaymentInfoChange = (e) =>
    setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });

  const validate = () => {
    const newErrors = {};

    if (currentStage === 0) {
      if (!/^[a-zA-Z\s]+$/.test(teamInfo.name)) {
        newErrors.name = "Team name must contain only letters and spaces.";
      }
      if (!teamInfo.category) newErrors.category = "Category is required.";
      if (!/^[a-zA-Z\s]+$/.test(teamInfo.coach)) {
        newErrors.coach = "Coach name must contain only letters and spaces.";
      }
    }

    if (currentStage === 1) {
      players.forEach((player, index) => {
        if (!/^[a-zA-Z\s]+$/.test(player.name)) {
          newErrors[`playerName${index}`] =
            "Player name must contain only letters and spaces.";
        }
        if (isNaN(player.age) || player.age < 11 || player.age > 50) {
          newErrors[`playerAge${index}`] = "Age must be between 11 and 50.";
        }
        if (!player.role) {
          newErrors[`playerRole${index}`] = "Player role is required.";
        }
      });
    }

    if (currentStage === 2) {
      if (!/^\d{16}$/.test(paymentInfo.cardNumber)) {
        newErrors.cardNumber = "Card number must be 16 digits.";
      }
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(paymentInfo.expiry)) {
        newErrors.expiry = "Expiry date must be in MM/YY format.";
      }
      if (!/^\d{3}$/.test(paymentInfo.cvv)) {
        newErrors.cvv = "CVV must be 3 digits.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Submission data:", { teamInfo, players, paymentInfo });
      toast.success("Registration submitted successfully!");
      resetForm();
    }
  };

  const nextStage = () => {
    if (validate()) setCurrentStage(currentStage + 1);
  };

  const prevStage = () => setCurrentStage(currentStage - 1);

  const resetForm = () => {
    setTeamInfo({ name: "", category: "", coach: "" });
    setPlayers([{ name: "", age: "", role: "" }]);
    setPaymentInfo({ cardNumber: "", expiry: "", cvv: "" });
    setCurrentStage(0);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStage]);

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
            <div>
              <h2 className="text-2xl font-semibold mb-4">
                <FaUser className="inline mr-2" /> Team Information
              </h2>
              {["name", "category", "coach"].map((field) => (
                <div key={field} className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  {field === "category" ? (
                    <select
                      name={field}
                      value={teamInfo[field]}
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
          )}

          {currentStage === 1 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">Player Details</h2>
              {players.map((player, index) => (
                <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">
                    Player {index + 1}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={player.name}
                        onChange={(e) => handlePlayerChange(index, e)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      />
                      {errors[`playerName${index}`] && (
                        <p className="text-red-500 text-sm">
                          {errors[`playerName${index}`]}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Age
                      </label>
                      <input
                        type="number"
                        name="age"
                        value={player.age}
                        onChange={(e) => handlePlayerChange(index, e)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      />
                      {errors[`playerAge${index}`] && (
                        <p className="text-red-500 text-sm">
                          {errors[`playerAge${index}`]}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Role
                      </label>
                      <select
                        name="role"
                        value={player.role}
                        onChange={(e) => handlePlayerChange(index, e)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      >
                        <option value="">Select Role</option>
                        <option value="Batsman">Batsman</option>
                        <option value="Bowler">Bowler</option>
                      </select>
                      {errors[`playerRole${index}`] && (
                        <p className="text-red-500 text-sm">
                          {errors[`playerRole${index}`]}
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removePlayer(index)}
                    className={`mt-2 ${
                      players.length <= 1
                        ? "bg-gray-300"
                        : "bg-red-600 hover:bg-red-700"
                    } text-white px-4 py-2 rounded-lg font-semibold`}
                    disabled={players.length <= 1}
                  >
                    Remove Player
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addPlayer}
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700"
                disabled={players.length >= 11}
              >
                Add Player
              </button>
            </div>
          )}

          {currentStage === 2 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4">
                <FaCreditCard className="inline mr-2" /> Payment Information
              </h2>
              {["cardNumber", "expiry", "cvv"].map((field) => (
                <div key={field} className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type="text"
                    name={field}
                    value={paymentInfo[field]}
                    onChange={handlePaymentInfoChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    placeholder={field === "expiry" ? "MM/YY" : ""}
                  />
                  {errors[field] && (
                    <p className="text-red-500 text-sm">{errors[field]}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 flex justify-between">
            {currentStage > 0 && (
              <button
                type="button"
                onClick={prevStage}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-400"
              >
                Previous
              </button>
            )}
            {currentStage < registrationStages.length - 1 ? (
              <button
                type="button"
                onClick={nextStage}
                className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700"
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
