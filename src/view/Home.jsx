import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function MainView({ username }) {
  const [coords, setCoords] = useState(null);
  const [showCoords, setShowCoords] = useState(false);

  const [content, setContent] = useState([]);

  function getCoords() {
    axios({
      method: "GET",
      url: "/coords",
    })
      .then((response) => {
        const res = response.data;
        const names = res.map(item => item.name); // get only the names
        setContent(names);

      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
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

      <p>
        Sí esto muestra la información, el backend se conectó con el frontend:{" "}
      </p>

      <button onClick={buttonCoords}> Get Coordinates </button>

      <h3> Upload Coordinates </h3>
      <form action="/upload_coords" method="POST">
        <label htmlFor="lat">Latitude:</label>
        <input type="text" name="lat" />
        <label htmlFor="long">Longitude:</label>
        <input type="text" name="long" />
        <input type="submit" value="Submit" />
      </form>

    </div>
  );
}

export default MainView;
