import React, { useState, useEffect } from "react";
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
        </p>
      ) : (
        <p>Loading profile content...</p>
      )}
    </div>
  );
}
