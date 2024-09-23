import React from "react";
import { motion } from "framer-motion";
import { milestones, achievements } from "../data/data";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

export default function AboutUs() {
  return (
    <div className="container mx-auto px-6 py-12">
      <motion.h1
        className="text-4xl font-bold text-center mb-8 text-green-700"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        About XYZ Organization
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          className="bg-white rounded-lg shadow-md p-6"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-green-700 text-center">
            Our Story
          </h2>
          <p className="text-gray-700 mb-4">
            Founded in 2003, XYZ Organization is dedicated to elevating cricket
            to new heights. From organizing grassroots tournaments to hosting
            large-scale national and international competitions, we have
            nurtured talent and brought the cricketing spirit to communities
            across the nation.
          </p>
          <p className="text-gray-700 mb-4">
            Our mission is not just to create cricketing champions but also to
            empower youth, promote teamwork, and foster community development
            through the sport. XYZ Organization has become a national symbol of
            cricketing excellence, pride, and future-building.
          </p>
          <p className="text-gray-700 mb-4">
            Over the years, we have expanded our reach, providing
            state-of-the-art training facilities, coaching clinics, and global
            cricketing opportunities. Whether it's discovering the next cricket
            star or organizing thrilling tournaments, XYZ stands committed to
            shaping the future of cricket.
          </p>
          <p className="text-gray-700">
            With every match, we celebrate the values of teamwork, integrity,
            and sportsmanship. We are passionate about building a cricketing
            legacy that transcends generations.
          </p>
        </motion.div>

        <motion.div
          className="bg-white rounded-lg shadow-md p-6"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-green-700 text-center">
            Our Milestones
          </h2>
          <ul className="space-y-4">
            {milestones.map((milestone, index) => (
              <motion.li
                key={index}
                className="flex items-center space-x-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.3 }}
              >
                <div className="flex-shrink-0 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                  {milestone.year}
                </div>
                <div className="flex-grow">
                  <p className="text-gray-700">{milestone.event}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      <motion.div
        className="mt-12 bg-green-600 text-white rounded-lg shadow-md p-6"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Our Achievements
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              className="bg-white text-green-600 rounded-lg p-4 text-center shadow-md flex flex-col items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="text-4xl mb-2">{achievement.icon}</div>
              <p>{achievement.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="mt-12 text-center"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold mb-4 text-green-700">
          Our Vision
        </h2>
        <p className="text-gray-700 max-w-2xl mx-auto">
          At XYZ Organization, we envision a future where cricket is more than
          just a game. It’s a vehicle for growth, inclusion, and excellence. We
          are committed to fostering a spirit of sportsmanship, teamwork, and
          community through cricket, preparing the next generation of leaders
          both on and off the field.
        </p>
      </motion.div>

      <motion.div
        className="mt-12 bg-white rounded-lg shadow-md p-6"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold mb-4 text-center text-green-700">
          Meet Our Leadership
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {["man1.png", "man2.png", "man3.png"].map((img, index) => (
            <motion.div
              key={index}
              className="text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <img
                src={img}
                alt={`Leader ${index + 1}`}
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h3 className="font-semibold text-green-700">
                {["John Doe", "Jane Smith", "Mike Johnson"][index]}
              </h3>
              <p className="text-gray-600">Board Member</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="mt-12 text-center"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold mb-4 text-green-700">
          Follow Us on Social Media
        </h2>
        <div className="flex justify-center space-x-6">
          {[FaFacebook, FaInstagram, FaYoutube].map((Icon, index) => (
            <a
              key={index}
              href={
                [
                  "https://www.facebook.com",
                  "https://www.instagram.com",
                  "https://www.youtube.com",
                ][index]
              }
              target="_blank"
              rel="noreferrer"
            >
              <Icon
                className={`text-4xl hover:scale-110 transition-transform duration-300 ${
                  ["text-blue-600", "text-pink-600", "text-red-600"][index]
                }`}
              />
            </a>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
