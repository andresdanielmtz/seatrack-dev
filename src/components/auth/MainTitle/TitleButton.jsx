import React from "react";
import { useNavigate } from "react-router-dom";
import "./TitleButton.css";

/**
 * TODO: Change to Link component
 */
const TitleButton = ({ text, address }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    try {
      navigate(`/${address}`);
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };

  return (
    <div className="outer">
      <button
        className="button relative overflow-hidden transition-all ease-out"
        onClick={handleClick}
      >
        <span className="text">{text}</span>
      </button>
    </div>
  );
};

export default TitleButton;
