import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cricketProducts } from "../data/products";

export default function EquipmentShop() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const cartRef = useRef(null);

  useEffect(() => {
    setProducts(cricketProducts);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      return existingProduct
        ? prevCart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...prevCart, { ...product, quantity: 1 }];
    });
    scrollToCart();
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const productInCart = prevCart.find((item) => item.id === productId);
      return productInCart.quantity === 1
        ? prevCart.filter((item) => item.id !== productId)
        : prevCart.map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );
    });
  };

  const scrollToCart = () => {
    cartRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto px-4 py-6 sm:py-12">
      <motion.h1
        className="text-3xl sm:text-4xl font-bold text-center mb-6 sm:mb-8 text-green-700"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Cricket Equipment Shop
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        <motion.div
          className="md:col-span-2"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {products.map((product) => (
              <motion.div
                key={product.id}
                className="bg-white rounded-lg shadow-md p-4 transition-all duration-300 hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-32 sm:h-40 object-cover rounded-lg mb-4"
                />
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-gray-600">₹{product.price.toFixed(2)}</p>
                <button
                  onClick={() => addToCart(product)}
                  className="mt-4 bg-green-600 text-white w-full py-2 rounded-lg hover:bg-green-700 transition-all duration-300"
                >
                  Add to Cart
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="bg-white rounded-lg shadow-md p-4 sm:p-6 transition-all duration-300 hover:shadow-xl"
          ref={cartRef}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-green-600 text-center">
            Shopping Cart
          </h2>
          {cart.length === 0 ? (
            <p className="text-center">Your cart is empty</p>
          ) : (
            <>
              {cart.map((item) => (
                <motion.div
                  key={item.id}
                  className="flex justify-between items-center mb-4"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="font-medium">
                    {item.name} (x{item.quantity})
                  </span>
                  <div>
                    <span className="mr-2">
                      ₹{item.price.toFixed(2)} x {item.quantity} = ₹
                      {(item.price * item.quantity).toFixed(2)}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </motion.div>
              ))}
              <div className="mt-4 pt-4 border-t text-lg sm:text-xl">
                <strong>Total: ₹{totalPrice.toFixed(2)}</strong>
              </div>
              <button className="mt-4 bg-green-600 text-white w-full py-2 rounded-lg hover:bg-green-700 transition-all duration-300">
                Checkout
              </button>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
