import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SettingsIcon from "../../icons/SettingsIcon.jsx";
import MapUploadView from "../../map/MapUploadView.jsx";
import UploadCoordsForm from "../../map/UploadCoords.jsx";
import { useTransition, animated, config, useSpring } from "@react-spring/web";

function MainView({ username, handleLogout, toggleMap }) {
  const [loading, setLoading] = useState(true);
  const [showMapComponent, setShowMapComponent] = useState(false);

  useEffect(() => {
    // Simulate a loading delay (you can replace this with your actual data fetching logic)
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 200);

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timeout);
  }, []);

  const toggleMapComponent = () => {
    setShowMapComponent(!showMapComponent);
  };

  const mapTransitions = useTransition(showMapComponent, {
    from: { opacity: 0, transform: `translateY(20px)` },
    enter: { opacity: 1, transform: `translateY(0px)` },
    leave: { opacity: 0, transform: `translateY(20px)` },
    config: config.stiff,
  });

  const mapSpring = useSpring({
    opacity: showMapComponent ? 1 : 0,
    transform: `translateY(${showMapComponent ? 0 : 20}px)`,
    config: config.stiff,
  });

  if (loading) {
    // Render loading skeleton structure
    return (
      <div className="max-w-md mx-auto bg-white p-8 rounded-3xl shadow-md mt-10">
        {/* Loading skeleton structure */}
        <div className="animate-pulse">
          <div className="bg-gray-300 h-6 w-2/3 mb-4 rounded"></div>
          <div className="bg-gray-300 h-4 w-1/2 mb-2 rounded"></div>
          <div className="bg-gray-300 h-4 w-3/4 mb-2 rounded"></div>
          {/* Add more skeleton elements based on your design */}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="max-w-md mx-auto bg-white p-8 rounded-3xl shadow-md mt-10">
        {/* Your main view content goes here */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-2xl font-semibold mb-4">Welcome, {username}!</h3>
          <Link to="/settings" className="text-blue-500">
            <SettingsIcon />
          </Link>
        </div>

        {/* Your actual content */}
        <div className="flex flex-row space-x-4">
          <button
            onClick={toggleMap}
            className="bg-slate-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-l"
          >
            Toggle Map
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-l"
          >
            Logout
          </button>
        </div>

        <UploadCoordsForm username = {username} toggleMapComponent={toggleMapComponent} />
      </div>

      {/* Map component */}
      {mapTransitions(
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

      {/* Placeholder content */}
      {/*       
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-3xl shadow-md mt-10">
        <p className="italic text-center mb-2">Placeholder</p>
      </div>
          */}
      {/* Footer */}
      <div>
        <p className="text-center text-gray-500 text-xs mt-2">
          &copy;2024 Andrés Martínez. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default MainView;
