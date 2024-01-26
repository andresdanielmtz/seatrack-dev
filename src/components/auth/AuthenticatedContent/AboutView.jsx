import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TitleButton from "../MainTitle/TitleButton";

export default function ProfileView() {
  const navigate = useNavigate();

  const redirectToHome = () => {
    try {
      navigate(`/`);
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen flex-col mx-10">
      <h1 className="text-4xl font-extrabold my-10">About Us</h1>

      <p className="text-lg italic mb-8 justify-center">
        Hello! I'm Andrés Martínez and I'm a Computer Science student @ ITESM.
        <br />
        <br />I created this project for learning and practicing purposes.
        <br /> This project helped me learn about React, Node.js, Express,
        MongoDB, and many other technologies.
      </p>

      <TitleButton address="/" color="bg-persian-blue-700">
        {" "}
        Return to Home{" "}
      </TitleButton>
    </div>
  );
}
