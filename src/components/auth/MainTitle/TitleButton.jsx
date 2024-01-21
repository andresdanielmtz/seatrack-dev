// TitleButton.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./TitleButton.css"; // Keep this import if needed for specific styles

const TitleButton = ({ children, address, color }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    try {
      if (address === "/" || address === "") {
        navigate("/");
      } else {
        navigate(`/${address}`);
      }
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };

  return (
    <div className="m-2">
      <button
        onClick={handleClick}
        className={`transition-all ease-out inline-block ${color} text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`}
      >
        {children}
      </button>
    </div>
  );
};

export default TitleButton;
