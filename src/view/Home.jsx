import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function MainView({ username }) {
  const [profileData, setProfileData] = useState(null);
  const [coords, setCoords] = useState(null);

  function getData() {
    axios({
      method: "GET",
      url: "/profile",
    })
      .then((response) => {
        const res = response.data;
        setProfileData({
          profile_name: res.name,
          about_me: res.about,
        });
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

  function getCoords() {
    axios({
      method: "GET",
      url: "/coords",
    })
      .then((response) => {
        const res = response.data;
        console.log(res);
        setCoords({
          lat: res[0].latitude,
          long: res[0].longitude,
        });
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

    useEffect(() => {
        getCoords();
    }, []);

    useEffect(() => {
        console.log(coords);
    }, [coords]);

  return (
    <div>
      <h3> Welcome, {username} </h3>

      <p>
        Sí esto muestra la información, el backend se conectó con el frontend:{" "}
      </p>
      <button onClick={getData}>Click me</button>
      {profileData && (
        <div>
          <p>Profile name: {profileData.profile_name}</p>
          <p>About me: {profileData.about_me}</p>
        </div>
      )}
      {coords && (
        <div>
            <p>{coords.lat}</p>
            <p>{coords.long}</p>
         
        </div>
      )}
    </div>
  );
}

export default MainView;
