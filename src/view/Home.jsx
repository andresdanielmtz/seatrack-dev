import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MainView({ username }) {
  const [coords, setCoords] = useState(null);
  const [showCoords, setShowCoords] = useState(false);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [name, setName] = useState("");
  const [content, setContent] = useState([]);

  function getCoords() {
    axios({
      method: "GET",
      url: "/coords",
    })
      .then((response) => {
        const res = response.data;
        const names = res.map((item) => item.name); // get only the names
        setContent(names);
        console.log(names);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

  function uploadCoords() {
    axios({
      method: "POST",
      url: "/register_coord",
      data: {
        name: name,
        latitude: latitude,
        longitude: longitude,
      },
    })
      .then((response) => {
        console.log(response);
        getCoords();
        toast.success("Coordinates uploaded successfully!"); // Show success notification
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error uploading coordinates. Please try again."); // Show error notification
      });
  }

  function buttonCoords() {
    getCoords();
    setShowCoords(!showCoords);
  }

  useEffect(() => {
    getCoords();
  }, []);

  return (
    <div>
      <h3> Welcome, {username} </h3>
      <i>
        Sí esto muestra la información, el backend se conectó con el frontend:{" "}
      </i>{" "}
      <br />
      <button onClick={buttonCoords}> Get Coordinates </button>
      <h3> Upload Coordinates </h3>
      <div>
        <input
          type="text"
          placeholder="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Latitude"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
        />
        <input
          type="text"
          placeholder="Longitude"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
        />
        <button onClick={uploadCoords}> Upload </button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default MainView;
