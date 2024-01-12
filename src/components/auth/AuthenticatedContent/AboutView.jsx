import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ProfileView() {
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const redirectToHome = () => {
    try {
      navigate(`/`);
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/profile");
        setName(response.data.name);
        setAbout(response.data.about);
      } catch (error) {
        console.error("Error fetching profile content:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h3 className="text-2xl font-semibold mb-4">Profile</h3>
        {loading ? (
          <p>Loading profile content...</p>
        ) : (
          <p className="text-lg">
            {name} <br /> {about}
            <br />
            {!loading && (
              <p className="text-sm text-gray-500 mt-2">
                If this piece of text loads, everything is working fine.
              </p>
            )}
          </p>
        )}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-xl my-5"
          onClick={redirectToHome}
        >
          Return to Home
        </button>
      </div>
    </div>
  );
}
