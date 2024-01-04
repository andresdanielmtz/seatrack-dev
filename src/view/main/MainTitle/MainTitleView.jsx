import React from "react";
import { Link } from "react-router-dom";

export default function MainTitleView() {
  return (
    <div>
      <h3 className="text-3xl font-bold underline"> Home </h3>
      <p> This is the home page </p>
      <Link to="/about">About</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </div>
  );
}
