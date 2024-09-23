import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-green-600 text-white py-4">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <p className="text-sm md:text-base">
          &copy; {currentYear} XYZ Organization. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
