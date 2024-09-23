import { motion } from "framer-motion";
import { useState } from "react";
import { blogPosts } from "../data/blogPosts";

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <div className="container mx-auto px-6 py-12">
      <motion.h1
        className="text-5xl font-extrabold text-center mb-10 text-green-600"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Latest Cricket Blogs
      </motion.h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <motion.div
          className="lg:col-span-1"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">
            Recent Posts
          </h2>
          <ul className="space-y-6">
            {blogPosts.map((post) => (
              <li key={post.id}>
                <button
                  onClick={() => setSelectedPost(post)}
                  className="w-full text-left bg-gray-100 p-4 rounded-lg hover:bg-green-100 transition ease-in-out duration-300"
                >
                  <h3 className="font-semibold text-xl text-gray-900 hover:text-green-600">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-500">{post.date}</p>
                </button>
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div
          className="lg:col-span-2 bg-gray-50 border border-gray-200 rounded-lg shadow-lg p-8"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {selectedPost ? (
            <>
              <h2 className="text-4xl font-semibold mb-4 text-gray-900">
                {selectedPost.title}
              </h2>
              <p className="text-gray-500 text-sm mb-6">{selectedPost.date}</p>
              <div
                className="text-lg leading-relaxed text-gray-800 mb-6"
                dangerouslySetInnerHTML={{ __html: selectedPost.content }}
              />
            </>
          ) : (
            <p className="text-xl text-center text-gray-600">
              Select a post to read
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
