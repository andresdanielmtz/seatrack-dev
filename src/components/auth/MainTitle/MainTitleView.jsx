// MainTitleView.jsx
import React from "react";
import TitleButton from "./TitleButton.jsx";

export default function MainTitleView() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-persian-blue-50 text-black">
      <h3 className="text-5xl font-extrabold mb-5">Seatrack</h3>
      <div className="justify-center">
        <p className="text-lg italic mb-8 justify-center">
          Welcome to the future of Debris Tracking
          <br />
          <i className="fas fa-rocket fa-10x mb-2">In development!</i>
        </p>
      </div>

      <div className="flex flex-row">
        <TitleButton text="Login" address="login" color="bg-persian-blue-700" />
        <TitleButton
          text="Sign Up"
          address="register"
          color="bg-persian-blue-500"
        />
        <TitleButton
          text="About Us"
          address="about"
          color="bg-persian-blue-500"
        />
      </div>
    </div>
  );
}
