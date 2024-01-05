import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function ProfileView() {
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/profile");
        setName(response.data.name);
        setAbout(response.data.about);
      } catch (error) {
        console.error("Error fetching profile content:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h3>Profile</h3>
      {name ? (
        <p>
          {name} <br /> {about}
          <br />
          <Link to="/">Home</Link>
        </p>
      ) : (
        <div>
          <p>Loading profile content...</p>
        </div>
      )}
    </div>
  );
}
