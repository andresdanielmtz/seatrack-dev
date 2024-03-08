// MainTitleView.jsx
import React from "react";
import TitleButton from "./TitleButton.jsx";

export default function MainTitleView() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-persian-blue-50 text-black p-4 md:p-8 lg:p-16">
      <h3 className="text-5xl font-extrabold mb-5">Seatrack</h3>
      <div className="text-center mb-8">
        <p className="text-lg italic">
          Welcome to the future of Debris Tracking
          <br />
        </p>
      </div>

      <div className="flex flex-col md:flex-row">
        <TitleButton
          address="login"
          color="bg-persian-blue-700"
          extraClasses="mb-2 md:mb-0 md:mr-2"
        >
          Login
        </TitleButton>
        <TitleButton
          address="register"
          color="bg-persian-blue-500"
          extraClasses="mb-2 md:mb-0 md:mr-2"
        >
          Register
        </TitleButton>
        <TitleButton
          address="about"
          color="bg-persian-blue-500"
          extraClasses="mb-2 md:mb-0 md:mr-2"
        >
          About Us
        </TitleButton>
        <TitleButton
          address="instructions"
          color="bg-persian-blue-500"
          extraClasses="mb-2 md:mb-0"
        >
          Instructions
        </TitleButton>
      </div>
    </div>
  );
}
