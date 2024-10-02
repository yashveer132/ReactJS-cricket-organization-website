import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCalendarAlt, FaMapMarkerAlt, FaTrophy } from "react-icons/fa";
import { Link } from "react-router-dom";
import LiveMatchTicker from "../components/LiveMatchTicker";
import WeatherWidget from "../components/WeatherWidget";
import { tournaments, pastTournaments } from "../data/tournaments";

export default function TournamentDetails() {
  const [selectedUpcomingTournament, setSelectedUpcomingTournament] = useState(
    tournaments[0]
  );
  const [selectedPastTournament, setSelectedPastTournament] = useState(
    pastTournaments[0]
  );

  const upcomingDetailsRef = useRef(null);
  const pastDetailsRef = useRef(null);

  const scrollToDetails = (type) => {
    if (type === "upcoming") {
      upcomingDetailsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    } else if (type === "past") {
      pastDetailsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  useEffect(() => {
    if (window.innerWidth <= 768) {
      scrollToDetails("upcoming");
    }
  }, [selectedUpcomingTournament]);

  useEffect(() => {
    if (window.innerWidth <= 768) {
      scrollToDetails("past");
    }
  }, [selectedPastTournament]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      <motion.div
        className="mb-4 sm:mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <LiveMatchTicker />
      </motion.div>
      <motion.div
        className="mb-4 sm:mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <WeatherWidget />
      </motion.div>

      <section className="mb-8">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center text-green-700">
          Upcoming Tournaments
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
          <motion.div
            className="space-y-2 sm:space-y-4"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <ul className="space-y-2 sm:space-y-4">
              {tournaments.map((tournament) => (
                <li key={tournament.id}>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedUpcomingTournament(tournament)}
                    className={`w-full text-left px-3 py-2 sm:px-4 sm:py-3 rounded-lg transition-all duration-300 shadow-lg ${
                      selectedUpcomingTournament.id === tournament.id
                        ? "bg-green-600 text-white"
                        : "bg-white hover:bg-green-100"
                    }`}
                  >
                    <span className="text-sm sm:text-base">
                      {tournament.name}
                    </span>
                  </motion.button>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            className="flex flex-col space-y-4 sm:space-y-8"
            ref={upcomingDetailsRef}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <motion.div className="bg-white rounded-lg shadow-md p-4 sm:p-6 lg:p-8 hover:shadow-lg transition-all duration-300">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedUpcomingTournament.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4"
                >
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-700 text-center">
                    {selectedUpcomingTournament.name}
                  </h2>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <FaCalendarAlt className="text-green-600 text-sm sm:text-base" />
                        <p className="text-sm sm:text-base font-medium">
                          <strong>Date:</strong>{" "}
                          {selectedUpcomingTournament.date}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FaTrophy className="text-green-600 text-sm sm:text-base" />
                        <p className="text-sm sm:text-base font-medium">
                          <strong>Format:</strong>{" "}
                          {selectedUpcomingTournament.format}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FaMapMarkerAlt className="text-green-600 text-sm sm:text-base" />
                        <p className="text-sm sm:text-base font-medium">
                          <strong>Venue:</strong>{" "}
                          {selectedUpcomingTournament.venue}
                        </p>
                      </div>
                    </div>
                    <img
                      src={selectedUpcomingTournament.image}
                      alt={selectedUpcomingTournament.name}
                      className="w-full sm:w-40 h-auto object-cover rounded-lg"
                    />
                  </div>
                  <div>
                    <strong className="text-base sm:text-lg text-green-600">
                      Participating Teams:
                    </strong>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      {selectedUpcomingTournament.teams.map((team, index) => (
                        <motion.li
                          key={index}
                          whileHover={{ scale: 1.05 }}
                          className="py-1 text-sm sm:text-base text-gray-700"
                        >
                          {team}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-4 sm:mt-6 text-center">
                    <Link
                      to="/team-registration"
                      className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm sm:text-base font-semibold hover:bg-green-700 transition-colors duration-300"
                    >
                      Register Your Team
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section>
        <h2 className="text-xl sm:text-2xl font-semibold mt-6 sm:mt-12 lg:mt-16 mb-4 text-center text-green-700">
          Past Tournaments
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
          <motion.div
            className="space-y-2 sm:space-y-4"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <ul className="space-y-2 sm:space-y-4">
              {pastTournaments.map((tournament) => (
                <li key={tournament.id}>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedPastTournament(tournament)}
                    className={`w-full text-left px-3 py-2 sm:px-4 sm:py-3 rounded-lg transition-all duration-300 shadow-lg ${
                      selectedPastTournament.id === tournament.id
                        ? "bg-green-600 text-white"
                        : "bg-white hover:bg-green-100"
                    }`}
                  >
                    <span className="text-sm sm:text-base">
                      {tournament.name}
                    </span>
                  </motion.button>
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            className="flex flex-col space-y-4 sm:space-y-8"
            ref={pastDetailsRef}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <motion.div className="bg-white rounded-lg shadow-md p-4 sm:p-6 lg:p-8 hover:shadow-lg transition-all duration-300">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedPastTournament.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4"
                >
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-700 text-center">
                    {selectedPastTournament.name}
                  </h2>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <FaCalendarAlt className="text-green-600 text-sm sm:text-base" />
                      <p className="text-sm sm:text-base font-medium">
                        <strong>Date:</strong> {selectedPastTournament.date}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaTrophy className="text-green-600 text-sm sm:text-base" />
                      <p className="text-sm sm:text-base font-medium">
                        <strong>Format:</strong> {selectedPastTournament.format}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaMapMarkerAlt className="text-green-600 text-sm sm:text-base" />
                      <p className="text-sm sm:text-base font-medium">
                        <strong>Venue:</strong> {selectedPastTournament.venue}
                      </p>
                    </div>
                  </div>
                  <div>
                    <strong className="text-base sm:text-lg text-green-600">
                      Participating Teams:
                    </strong>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      {selectedPastTournament.teams.map((team, index) => (
                        <motion.li
                          key={index}
                          whileHover={{ scale: 1.05 }}
                          className="py-1 text-sm sm:text-base text-gray-700"
                        >
                          {team}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-4 sm:mt-6 text-center">
                    <Link
                      to="/gallery"
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm sm:text-base font-semibold hover:bg-blue-700 transition-colors duration-300"
                    >
                      See Pictures
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
