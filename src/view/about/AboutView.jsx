import React from "react";
import { Link } from "react-router-dom";
export default function AboutView() {
  return (
    <div>
      <h3> About </h3>
      <p> This is the about page </p>
      <Link to="/">Home</Link>

    </div>
  );
}
