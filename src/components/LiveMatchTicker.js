import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { dummyMatches } from "../data/dummyMatches";

export default function LiveMatchTicker() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
      const apiKey = process.env.REACT_APP_CRICAPI_KEY;
      try {
        const response = await fetch(
          `https://api.cricapi.com/v1/currentMatches?apikey=${apiKey}&offset=0`
        );
        const data = await response.json();

        if (data && data.data) {
          const latestMatches = data.data.slice(0, 4).map((match, index) => ({
            id: index,
            team1: match.teams[0],
            team2: match.teams[1],
            score1: match.score[0]?.r || "N/A",
            score2: match.score[1]?.r || "N/A",
            status: match.status || "In Progress",
          }));
          setMatches(latestMatches);
          setError(null);
        } else {
          throw new Error("No live matches found.");
        }
      } catch (error) {
        console.error("Error fetching matches:", error);
        setMatches(dummyMatches);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
    const interval = setInterval(fetchMatches, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md p-4 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">
        Live Matches
      </h2>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <>
          {error && (
            <div className="text-center text-red-500 text-sm">{error}</div>
          )}
          <div className="flex flex-nowrap overflow-x-auto pb-2 ml-6 px-4">
            {matches.map((match) => (
              <motion.div
                key={match.id}
                className="bg-green-100 rounded-lg p-3 sm:p-4 min-w-[200px] sm:min-w-[250px] mr-4 flex-shrink-0"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="font-semibold text-sm sm:text-base">
                  {match.team1} vs {match.team2}
                </div>
                <div className="text-xs sm:text-sm">
                  {match.team1}: {match.score1}
                </div>
                <div className="text-xs sm:text-sm">
                  {match.team2}: {match.score2}
                </div>
                <div className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-2">
                  {match.status}
                </div>
              </motion.div>
            ))}
          </div>
        </>
      )}
    </motion.div>
  );
}
