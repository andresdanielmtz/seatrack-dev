import React, { useEffect, useRef, useState } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import axios from "axios";
import { transform } from "ol/proj"; // Import the transform function
import "ol/ol.css";
import PopUp from "../props/PopUp";

function MapUploadView({ zoom = 1 }) {
  const mapRef = useRef(null);
  const clickStartPosition = useRef(null);

  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const closePopUp = () => {
    setIsPopUpOpen(false);
  };

  useEffect(() => {
    if (!mapRef.current) {
      // Initialize map
      mapRef.current = new Map({
        layers: [new TileLayer({ source: new OSM() })],
        view: new View({ center: [0, 0], zoom: 1 }),
        target: "map",
        wrapX: false,
        noWrap: true,
      });

      // Add pointerdown event listener to the map
      mapRef.current
        .getViewport()
        .addEventListener("pointerdown", handlePointerDown);
      // Add pointerup event listener to the map
      mapRef.current
        .getViewport()
        .addEventListener("pointerup", handlePointerUp);
      // Add pointermove event listener to the map
      mapRef.current
        .getViewport()
        .addEventListener("pointermove", handlePointerMove);
    }
  }, [mapRef]);

  useEffect(() => {
    mapRef.current.getView().setZoom(zoom);
  }, [mapRef, zoom]);

  const handlePointerDown = (event) => {
    clickStartPosition.current = mapRef.current.getEventCoordinate(event);
  };

  const handlePointerUp = (event) => {
    try {
      if (clickStartPosition.current) {
        const coordinate = mapRef.current.getEventCoordinate(event);
        const distance = calculateDistance(
          clickStartPosition.current,
          coordinate
        );

        if (distance < 5) {
          const lonLat = transform(coordinate, "EPSG:3857", "EPSG:4326");
          console.log("Clicked coordinates (lon/lat):", lonLat);
          console.log("Longitude:", lonLat[0], "Latitude:", lonLat[1]);

          setLatitude(lonLat[1]);
          setLongitude(lonLat[0]);
          setIsPopUpOpen(true);
        } else {
          console.log("Drag detected. Ignoring click.");
        }
      }
    } catch (error) {
      console.error("Error during coordinate transformation:", error);
    } finally {
      // Reset the click start position regardless of the error
      clickStartPosition.current = null;
    }
  };

  const handlePointerMove = () => {
    // Reset the click start position if there is pointer movement during the click
    clickStartPosition.current = null;
  };

  const calculateDistance = (coord1, coord2) => {
    const dx = coord1[0] - coord2[0];
    const dy = coord1[1] - coord2[1];
    return Math.sqrt(dx * dx + dy * dy);
  };

  return (
    <div style={{ position: "relative" }}>
      {isPopUpOpen && (
        <PopUp onClose={closePopUp} latitude={latitude} longitude={longitude} />
      )}{" "}
      {/* Pass onClose prop to PopUp component */}
      <div id="map" style={{ width: "38rem", height: "20rem" }} />
    </div>
  );
}

export default MapUploadView;
