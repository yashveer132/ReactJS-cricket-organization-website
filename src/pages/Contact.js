import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import { MapPin, Phone, Mail, ChevronLeft, ChevronRight } from "lucide-react";
import testimonials from "../data/testimonials";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      });
      toast.success("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      toast.error("Failed to send message. Please try again.");
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () =>
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () =>
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );

  return (
    <div className="container mx-auto px-6 py-6">
      <motion.h1
        className="text-4xl font-bold text-center mb-6 text-green-700"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Contact Us
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          className="bg-white rounded-lg shadow-md p-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-green-600 text-center">
            Get in Touch
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {["name", "email"].map((field) => (
              <div key={field}>
                <label
                  htmlFor={field}
                  className="block text-gray-700 font-bold mb-2"
                >
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </label>
                <input
                  type={field === "email" ? "email" : "text"}
                  id={field}
                  name={field}
                  value={formData[field]}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
            ))}
            <div>
              <label
                htmlFor="message"
                className="block text-gray-700 font-bold mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <motion.button
              type="submit"
              className="w-full bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>

        <motion.div
          className="bg-white rounded-lg shadow-md p-6 text-center flex flex-col justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h2 className="text-3xl font-semibold mb-6 text-green-600">
            Contact Information
          </h2>
          <div className="space-y-4 text-xl">
            <div className="flex items-center justify-center space-x-4">
              <MapPin className="w-8 h-8 text-green-600" />
              <span>123 Cricket Lane, Sports City, 12345</span>
            </div>
            <div className="flex items-center justify-center space-x-4">
              <Phone className="w-8 h-8 text-green-600" />
              <span>9612354678</span>
            </div>
            <div className="flex items-center justify-center space-x-4">
              <Mail className="w-8 h-8 text-green-600" />
              <span>info@xyzorganization.com</span>
            </div>
          </div>
          <div className="mt-10">
            <h3 className="text-2xl font-semibold mb-4 text-green-600">
              Follow Us
            </h3>
            <div className="flex justify-center space-x-6 text-2xl">
              {[FaFacebook, FaInstagram, FaTwitter, FaLinkedin].map(
                (Icon, index) => (
                  <Icon
                    key={index}
                    className={`hover:scale-110 transition-transform ${
                      index === 0
                        ? "text-blue-600"
                        : index === 1
                        ? "text-pink-600"
                        : index === 2
                        ? "text-blue-400"
                        : "text-blue-700"
                    }`}
                  />
                )
              )}
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="mt-6 bg-gradient-to-r from-green-100 via-green-50 to-green-200 rounded-lg shadow-md p-10 flex items-center justify-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <div className="w-full md:w-3/4 lg:w-2/3">
          <h2 className="text-2xl font-semibold mb-4 text-center text-green-700">
            What People Say About Us
          </h2>
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonials[currentTestimonial].image}
                    alt={testimonials[currentTestimonial].name}
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="font-semibold">
                      {testimonials[currentTestimonial].name}
                    </h3>
                    <p className="text-gray-600">
                      {testimonials[currentTestimonial].role}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "{testimonials[currentTestimonial].content}"
                </p>
              </motion.div>
            </AnimatePresence>

            <button
              onClick={prevTestimonial}
              className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2 bg-white rounded-full p-2 shadow-md"
            >
              <ChevronLeft className="w-6 h-6 text-green-600" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2 bg-white rounded-full p-2 shadow-md"
            >
              <ChevronRight className="w-6 h-6 text-green-600" />
            </button>
          </div>
        </div>
      </motion.div>

      <ToastContainer />
    </div>
  );
}
