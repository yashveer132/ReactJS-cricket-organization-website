import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaUser,
  FaMoneyBillAlt,
  FaMapMarkerAlt,
  FaRunning,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { trainingPrograms } from "../data/trainingPrograms";

export default function TrainingAndCoaching() {
  const [selectedProgram, setSelectedProgram] = useState(null);

  return (
    <div className="container mx-auto px-4 py-12 flex flex-col items-center">
      <motion.h1
        className="text-4xl md:text-5xl font-bold text-center mb-12"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        🏏 Training & Coaching Programs
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        <motion.div
          className="md:col-span-1 bg-white rounded-lg shadow-lg p-6"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Upcoming Programs
          </h2>
          <ul className="space-y-4">
            {trainingPrograms.map((program) => (
              <motion.li
                key={program.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  onClick={() => setSelectedProgram(program)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors duration-300 font-semibold text-lg ${
                    selectedProgram?.id === program.id
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 hover:bg-green-100"
                  }`}
                >
                  {program.name}
                </button>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className="md:col-span-2 bg-white rounded-lg shadow-lg p-8 flex flex-col items-center justify-center"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {selectedProgram ? (
            <>
              <h2 className="text-3xl font-bold mb-6 text-center">
                {selectedProgram.name}
              </h2>
              <div className="space-y-4 text-left text-lg w-full max-w-lg">
                <p className="flex items-center gap-2">
                  <FaCalendarAlt className="text-green-600" />{" "}
                  <strong>Date:</strong> {selectedProgram.date}
                </p>
                <p className="flex items-center gap-2">
                  <FaUser className="text-green-600" />{" "}
                  <strong>Age Group:</strong> {selectedProgram.age}
                </p>
                <p className="flex items-center gap-2">
                  <FaMoneyBillAlt className="text-green-600" />{" "}
                  <strong>Price:</strong> {selectedProgram.price}
                </p>
                <p className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-green-600" />{" "}
                  <strong>Location:</strong> {selectedProgram.location}
                </p>
                <p className="flex items-center gap-2">
                  <FaRunning className="text-green-600" />{" "}
                  <strong>Available Spots:</strong> {selectedProgram.spots}
                </p>
                <p className="text-gray-700">
                  <strong>Description:</strong> {selectedProgram.description}
                </p>
                <div className="text-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-300 mt-6"
                  >
                    Book Now
                  </motion.button>
                </div>
              </div>
            </>
          ) : (
            <p className="text-xl text-center text-gray-600">
              Select a program to view details
            </p>
          )}
        </motion.div>
      </div>

      <motion.div
        className="mt-16 w-full max-w-4xl bg-white rounded-lg shadow-lg p-8 text-center"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <h2 className="text-3xl font-semibold mb-6">🎓 For Coaches</h2>
        <p className="text-lg mb-6">
          Are you an experienced cricket coach? Join our coaching team and help
          develop the next generation of cricket stars!
        </p>
        <div className="flex justify-center space-x-4">
          <Link className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-300">
            Register as a Coach
          </Link>
          <Link className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300">
            Coach Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
