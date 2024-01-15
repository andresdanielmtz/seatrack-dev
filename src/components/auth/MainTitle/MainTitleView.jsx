// MainTitleView.jsx
import React from "react";
import TitleButton from "./TitleButton.jsx";

export default function MainTitleView() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-persian-blue-50 text-black">
      <h3 className="text-5xl font-extrabold mb-5">Seatrack</h3>
      <div className="justify-center ">
        <p className="text-lg italic mb-8 justify-center">
          Welcome to the future of Debris Tracking
          <br />
        </p>
      </div>

      <div className="flex flex-row">
        <TitleButton address="login" color="bg-persian-blue-700">
          Login
        </TitleButton>
        <TitleButton address="register" color="bg-persian-blue-500">
          Register
        </TitleButton>
        <TitleButton address="about" color="bg-persian-blue-500">
          About Us
        </TitleButton>

        <TitleButton address="instructions" color="bg-persian-blue-500">
          Instructions
        </TitleButton>
      </div>
    </div>
  );
}
