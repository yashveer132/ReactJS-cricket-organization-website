import { motion } from "framer-motion";
import { FaRunning, FaBowlingBall, FaChartBar } from "react-icons/fa";
import { GiCricketBat, GiTrophy } from "react-icons/gi";
import { BiCricketBall } from "react-icons/bi";
import { players } from "../data/players";

export default function PlayerProfiles() {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.h1
        className="text-4xl font-bold text-center mb-8"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Top Player Profiles
      </motion.h1>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {players.map((player) => (
          <motion.div
            key={player.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row items-center justify-between p-4"
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 10px 20px rgba(0,0,0,0.2)",
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex-grow p-4 text-center md:text-left">
              <h2 className="text-2xl font-semibold mb-2">{player.name}</h2>
              <p className="text-gray-600 mb-4 flex items-center justify-center md:justify-start">
                <GiTrophy className="text-green-500 mr-2" /> {player.role}
              </p>
              <div className="space-y-2">
                <h3 className="font-semibold text-lg flex items-center justify-center md:justify-start">
                  <FaChartBar className="text-blue-500 mr-2" /> Stats:
                </h3>
                <ul className="list-disc list-inside">
                  <li>Matches: {player.stats.matches}</li>
                  {player.stats.runs && (
                    <li className="flex items-center justify-center md:justify-start">
                      <GiCricketBat className="mr-2 text-yellow-600" /> Runs:{" "}
                      {player.stats.runs}
                    </li>
                  )}
                  {player.stats.wickets && (
                    <li className="flex items-center justify-center md:justify-start">
                      <BiCricketBall className="mr-2 text-red-500" /> Wickets:{" "}
                      {player.stats.wickets}
                    </li>
                  )}
                  <li className="flex items-center justify-center md:justify-start">
                    <FaRunning className="mr-2 text-orange-400" /> Average:{" "}
                    {player.stats.average}
                  </li>
                  {player.stats.strikeRate && (
                    <li className="flex items-center justify-center md:justify-start">
                      <FaRunning className="mr-2 text-purple-500" /> Strike
                      Rate: {player.stats.strikeRate}
                    </li>
                  )}
                  {player.stats.economy && (
                    <li className="flex items-center justify-center md:justify-start">
                      <FaBowlingBall className="mr-2 text-blue-700" /> Economy:{" "}
                      {player.stats.economy}
                    </li>
                  )}
                </ul>
              </div>
            </div>
            <img
              src={player.image}
              alt={player.name}
              className="w-24 h-24 object-cover rounded-full border-4 border-green-500 mt-4 md:mt-0 mr-4"
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
