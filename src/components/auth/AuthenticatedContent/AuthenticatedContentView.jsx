// AuthenticatedContent.jsx
import React from "react";
import MapView from "../../map/MapView.jsx";
import MainView from "./MainView.jsx";
import MainTitleView from "../MainTitle/MainTitleView.jsx";

/*
 *  This component is responsible for rendering the authenticated content.
 * It receives the following props:
 *
 * - isLoggedIn: boolean that indicates whether the user is logged in or not
 * - showMap: boolean that indicates whether the map should be shown or not
 * - username: string that contains the username of the logged in user
 * - handleLogout: function that handles the logout process
 * - toggleMap: function that toggles the map
 */
const AuthenticatedContent = ({
  isLoggedIn,
  showMap,
  username,
  handleLogout,
  toggleMap,
}) => {
  return (
    <div>
      {isLoggedIn ? (
        <div>
          {showMap ? (
            <div>
              <MapView zoom={2} />
              <button onClick={handleLogout}>Logout</button>
              <button onClick={toggleMap}>Toggle Map</button>
            </div>
          ) : (
            <div>
              <MainView username={username} />
              <button onClick={handleLogout}>Logout</button>
              <button onClick={toggleMap}>Toggle Map</button>
            </div>
          )}
        </div>
      ) : (
        <MainTitleView />
      )}
    </div>
  );
};

export default AuthenticatedContent;
