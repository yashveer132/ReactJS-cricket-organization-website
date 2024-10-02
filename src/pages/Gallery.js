import { motion } from "framer-motion";
import { images } from "../data/images";
import { useEffect } from "react";

export default function Gallery() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.h1
        className="text-4xl font-bold text-center mb-8"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Gallery
      </motion.h1>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="relative h-64 rounded-lg overflow-hidden shadow-md"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-110"
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
