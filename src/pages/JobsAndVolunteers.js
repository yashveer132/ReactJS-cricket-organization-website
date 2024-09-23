import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaBriefcase,
  FaUsers,
  FaCalendarAlt,
  FaSignInAlt,
} from "react-icons/fa";
import { jobListings } from "../data/jobListings";
import { volunteerOpportunities } from "../data/volunteerOpportunities";

export default function JobsAndVolunteers() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-screen">
      <motion.h1
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <FaUsers className="inline-block mr-2" /> Jobs & Volunteer Opportunities
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 w-full max-w-6xl">
        <motion.div
          className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center">
            <FaBriefcase className="inline-block mr-2" /> Job Openings
          </h2>
          <ul className="space-y-4 w-full">
            {jobListings.map((job) => (
              <motion.li
                key={job.id}
                className="cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedJob(job)}
              >
                <div
                  className={`p-4 rounded-lg flex items-center space-x-3 ${
                    selectedJob?.id === job.id
                      ? "bg-green-100"
                      : "bg-gray-100 hover:bg-gray-200"
                  } transition-colors duration-300`}
                >
                  <span className="text-2xl">🏏</span>
                  <div>
                    <h3 className="font-semibold text-lg">{job.title}</h3>
                    <p className="text-sm text-gray-600">
                      {job.department} - {job.type}
                    </p>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
          {selectedJob && (
            <motion.div
              className="mt-6 p-6 bg-green-50 rounded-lg shadow-inner w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="font-semibold text-lg">{selectedJob.title}</h3>
              <p className="mb-4 text-gray-700">
                {selectedJob.department} - {selectedJob.type}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-300 w-full"
              >
                <FaSignInAlt className="inline-block mr-2" /> Apply Now
              </motion.button>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center">
            <FaUsers className="inline-block mr-2" /> Volunteer Opportunities
          </h2>
          <ul className="space-y-4 w-full">
            {volunteerOpportunities.map((opportunity) => (
              <motion.li
                key={opportunity.id}
                className="cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedVolunteer(opportunity)}
              >
                <div
                  className={`p-4 rounded-lg flex items-center space-x-3 ${
                    selectedVolunteer?.id === opportunity.id
                      ? "bg-blue-100"
                      : "bg-gray-100 hover:bg-gray-200"
                  } transition-colors duration-300`}
                >
                  <FaCalendarAlt className="text-blue-600" />
                  <div>
                    <h3 className="font-semibold text-lg">
                      {opportunity.title}
                    </h3>
                    <p className="text-sm text-gray-600">{opportunity.event}</p>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
          {selectedVolunteer && (
            <motion.div
              className="mt-6 p-6 bg-blue-50 rounded-lg shadow-inner w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="font-semibold text-lg">
                {selectedVolunteer.title}
              </h3>
              <p className="mb-2 text-gray-700">{selectedVolunteer.event}</p>
              <p className="mb-4 text-gray-700">
                Date: {selectedVolunteer.date}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 w-full"
              >
                <FaSignInAlt className="inline-block mr-2" /> Sign Up
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
