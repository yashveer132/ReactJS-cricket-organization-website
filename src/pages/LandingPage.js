import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { cardData } from "../data/cardData";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";

const Card = ({ data }) => (
  <motion.div
    className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition-all duration-300 w-full"
    whileHover={{ scale: 1.05 }}
  >
    <h2 className="text-lg sm:text-xl font-semibold mb-4 text-green-700 text-center flex items-center justify-center">
      {data.icon} {data.title}
    </h2>
    <ul className="list-disc list-inside text-left text-sm sm:text-base">
      {data.items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
    <div className="text-center mt-4">
      <Link
        to={data.link}
        className="inline-block bg-green-600 text-white px-3 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-300 text-sm sm:text-base"
      >
        {data.linkIcon} {data.linkText}
      </Link>
    </div>
  </motion.div>
);

export default function LandingPage() {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    const isFirstVisit = !localStorage.getItem("hasVisited");
    if (isFirstVisit) {
      setShowConfetti(true);
      localStorage.setItem("hasVisited", "true");

      const confettiTimer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(confettiTimer);
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6">
      {showConfetti && <Confetti width={width} height={height} gravity={0.2} />}
      <motion.div
        className="relative bg-cover bg-center w-full max-w-4xl mx-auto h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px] rounded-lg mb-8 shadow-lg overflow-hidden"
        style={{ backgroundImage: "url('cricket.avif')" }}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60 rounded-lg flex flex-col justify-center items-center text-center p-4 sm:p-6 md:p-8">
          <motion.h1
            className="text-yellow-300 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 sm:mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Welcome to XYZ Organization
          </motion.h1>
          <motion.p
            className="text-gray-100 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-medium mb-2 sm:mb-4 max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Join us in celebrating the spirit of cricket! Whether you're a
            player, coach, or fan, XYZ Organization offers tournaments, training
            programs, and more to support your cricketing journey.
          </motion.p>
          <motion.p
            className="text-gray-100 text-xs sm:text-sm md:text-base lg:text-lg mb-4 sm:mb-6 max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            From junior camps to professional leagues, we provide opportunities
            for players of all levels to sharpen their skills, compete with
            passion, and grow in the game.
          </motion.p>
          <Link
            to="/register"
            className="bg-green-500 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors duration-300 text-sm sm:text-base"
          >
            Register Now
          </Link>
        </div>
      </motion.div>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-2 md:gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {cardData.map((data, index) => (
          <Card key={index} data={data} />
        ))}
      </motion.div>
    </div>
  );
}
