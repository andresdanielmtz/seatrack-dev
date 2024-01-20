import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function UploadCoordsForm({ toggleMapComponent, username }) {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [name, setName] = useState("");

  function handleUploadCoords() {
    // Upload coordinates to database, handle errors and success
    if (latitude === "" || longitude === "" || name === "") {
      toast.error("Please fill out all fields.");
    } else {
      uploadCoords();
    }
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
        toast.success("Coordinates uploaded successfully!"); // Show success notification
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error uploading coordinates. Please try again."); // Show error notification
      });
  }

  return (
    <div>
      <h3 className="text-2xl font-semibold mt-6 mb-4">Upload Coordinates</h3>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Title"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-md border p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Latitude"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          className="rounded-md border p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Longitude"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          className="rounded-md border p-2 w-full"
        />
      </div>
      <div className="flex flex-row my-2">
        <button
          onClick={handleUploadCoords}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Upload
        </button>

        <button
          onClick={toggleMapComponent}
          className="bg-slate-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded ml-2"
        >
          Select Location from Map
        </button>
      </div>
    </div>
  );
}

export default UploadCoordsForm;
