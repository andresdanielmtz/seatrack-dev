import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { animated, useSpring, config, useTransition } from "@react-spring/web";
import { Link } from "react-router-dom";
import SettingsIcon from "../../icons/SettingsIcon.jsx";
import MapUploadView from "../../Map/MapUploadView.jsx";
import UploadCoordsForm from "../../Map/UploadCoords.jsx";

function MainView({ username, handleLogout, toggleMap }) {
  const [showMapComponent, setShowMapComponent] = useState(false);

  const transitions = useTransition(showMapComponent, {
    from: { opacity: 0, transform: `translateY(20px)` },
    enter: { opacity: 1, transform: `translateY(0px)` },
    leave: { opacity: 0, transform: `translateY(20px)` },
    config: config.stiff,
  });

  function toggleMapComponent() {
    setShowMapComponent(!showMapComponent);
  }

  const mapSpring = useSpring({
    opacity: showMapComponent ? 1 : 0,
    transform: `translateY(${showMapComponent ? 0 : 20}px)`,
    config: config.stiff,
  });

  return (
    <div>
      <div className="max-w-md mx-auto bg-white p-8 rounded-3xl shadow-md mt-10">
        <div className="flex justify-between items-start mb-2 ">
          <h3 className="text-2xl font-semibold mb-4">Welcome, {username}!</h3>
          <Link to="/settings" className="text-blue-500">
            <SettingsIcon />
          </Link>
        </div>
        <i className="block mb-4">
          If this shows the information, the backend is connected with the
          frontend.
        </i>

        <div className="flex flex-row space-x-4">
          <button
            onClick={toggleMap}
            className="bg-slate-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-l"
          >
            Toggle Map
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-500  hover:bg-red-700 text-white py-2 px-4 rounded-l"
          >
            Logout
          </button>
        </div>

        <UploadCoordsForm toggleMapComponent={toggleMapComponent} />
      </div>

      {transitions(
        (styles, item) =>
          item && (
            <animated.div style={{ ...styles, ...mapSpring }}>
              <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-md mt-10">
                <p className="italic text-center mb-2">
                  Pick a location from the map below
                </p>
                <MapUploadView zoom={3} />
              </div>
            </animated.div>
          )
      )}

      <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-md mt-10">
        <p className="italic text-center mb-2">Placeholder</p>
      </div>
      <div>
        <p className="text-center text-gray-500 text-xs mt-2">
          &copy;2024 Andrés Martínez. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default MainView;
