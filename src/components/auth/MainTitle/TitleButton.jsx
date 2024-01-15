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
        className={`transition-all ease-out inline-block ${color} border border-gray-400 hover:bg-opacity-80 text-white font-semibold px-4 py-2 rounded focus:outline-none`}
      >
        {children}
      </button>
    </div>
  );
};

export default TitleButton;
