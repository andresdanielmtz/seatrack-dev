import React from "react";
import TitleButton from "./TitleButton.jsx";
import BackgroundImage from "../../../assets/bgmain.png";

export default function MainTitleView() {
  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      <h3 className="text-5xl font-extrabold"> Seatrack </h3>
      <p className="my-5 italic"> Welcome to the future of Debri Tracking </p>
      <div className="flex flex-col max-w-80">
        <TitleButton text="Login" address="login" />
        <TitleButton text="Sign Up" address="register" />
        <TitleButton text="About Us" address="about" />
      </div>
    </div>
  );
}
