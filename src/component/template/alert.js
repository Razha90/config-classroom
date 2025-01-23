import React, { useState, useEffect } from "react";

const Alert = ({ message, type }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 5000); // Sembunyikan alert setelah 5 detik
    return () => clearTimeout(timer); // Bersihkan timer saat komponen unmount
  }, []);

  if (!isVisible) return null;

  const getAlertClass = () => {
    switch (type) {
      case "error":
        return "border-red-300 bg-red-500 text-background";
      case "success":
        return "border-green-500 bg-accent text-background";
      case "warning":
        return "border-yellow-300 bg-yellow-500 text-background";
      default:
        return "border-blue-300 bg-blue-500 text-background";
    }
  };

  return (
    <div
      className={`flex items-center p-4 mb-4 border-t-4 fixed z-[100] bottom-[10px] right-[10px] animate-fade-left animate-fill-both ${getAlertClass()}`}
      role="alert"
    >
      <svg
        className="flex-shrink-0 w-4 h-4"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      <div className="ms-3 text-sm font-medium mr-4 font-inter">{message}</div>
      <button
        type="button"
        className="ms-auto -mx-1.5 -my-1.5 bg-yellow-50 text-yellow-500 rounded-lg focus:ring-2 focus:ring-yellow-400 p-1.5 hover:bg-yellow-200 inline-flex items-center justify-center h-8 w-8 "
        data-dismiss-target="#alert-border-4"
        aria-label="Close"
        onClick={() => setIsVisible(false)}
      >
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
      </button>
    </div>
  );
};

export default Alert;
