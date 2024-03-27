import MapView from "../../Map/MapView.jsx";
import MainView from "./MainView.jsx";
import MainTitleView from "../MainTitle/MainTitleView.jsx";
import PropTypes from "prop-types";

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
  AuthenticatedContent.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    showMap: PropTypes.bool.isRequired,
    username: PropTypes.string.isRequired,
    handleLogout: PropTypes.func.isRequired,
    toggleMap: PropTypes.func.isRequired,
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          {showMap ? (
            <div>
              <MapView
                zoom={2}
                handleLogout={handleLogout}
                toggleMap={toggleMap}
              />
            </div>
          ) : (
            <div>
              <MainView
                username={username}
                handleLogout={handleLogout}
                toggleMap={toggleMap}
              />
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
