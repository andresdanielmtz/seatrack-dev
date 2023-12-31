import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import Overlay from "ol/Overlay.js";
import { fromLonLat, transform } from "ol/proj.js";
import { createPopper } from "@popperjs/core";

import "ol/ol.css";

function MapView({ zoom = 1 }) {
  const ref = useRef(null);
  const mapRef = useRef(null);
  useEffect(() => {
    console.log("I'm mounting!");
    if (ref.current && !mapRef.current) {
      // if ref.current is not null and mapRef.current is null (i.e. mapRef.current is not initialized)
      mapRef.current = new Map({
        layers: [new TileLayer({ source: new OSM() })],
        view: new View({ center: [0, 0], zoom: 1 }),
        target: ref.current,
      });
    }
  }, [ref, mapRef]);

  const addMarkerToMap = (coord) => {
    const marker = document.createElement("div");
    marker.innerHTML = '<img src="https://i.imgur.com/tCxXAkm.png" />';
    marker.className = "marker";

    // Add a data attribute to store the name
    marker.setAttribute("data-name", coord.name);

    // Create a tooltip element
    const tooltip = document.createElement("div");
    tooltip.className = "tooltip";
    tooltip.textContent = coord.name;
    tooltip.style.display = "none"; // Hide the tooltip initially

    // Apply a black outline to the tooltip text
    tooltip.style.color = "white"; // Set text color to white
    tooltip.style.textShadow = "0 0 5px black, 0 0 5px black, 0 0 5px black"; // Add a more visible black outline

    // Append the tooltip to the marker
    marker.appendChild(tooltip);

    const markerOverlay = new Overlay({
      position: fromLonLat([coord.longitude, coord.latitude]),
      positioning: "center-center",
      element: marker,
      stopEvent: false,
    });

    // Create a variable to keep track of the Popper instance
    let popperInstance = null;

    marker.addEventListener("mouseover", () => {
      if (!popperInstance) {
        popperInstance = createPopper(marker, tooltip, {
          placement: "top",
        });
      }

      tooltip.style.display = "block";
    });

    marker.addEventListener("mouseout", () => {
      tooltip.style.display = "none";
    });

    mapRef.current?.addOverlay(markerOverlay);
  };

  const addMarker = () => {
    axios
      .post("/coords")
      .then((response) => {
        if (response.status === 200) {
          const coords = response.data;

          coords.forEach((coord) => {
            console.log(
              `Name: ${coord.name}, Lat: ${coord.latitude}, Lon: ${coord.longitude}`
            );
            addMarkerToMap(coord, coord.name);
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    mapRef.current?.getView().setZoom(zoom);
  }, [mapRef, zoom]);

  useEffect(() => {
    addMarker();
  });

  return <div ref={ref} style={{ width: "100vw", height: "100vh" }} />;
}

export default MapView;
