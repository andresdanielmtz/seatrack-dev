import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import Overlay from "ol/Overlay.js";
import { fromLonLat, transform } from "ol/proj.js";

import "./MapView.css";
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

    const markerOverlay = new Overlay({
      position: fromLonLat([coord.longitude, coord.latitude]),
      positioning: "center-center",
      element: marker,
      stopEvent: false,
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
            addMarkerToMap(coord);
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    mapRef.current?.getView().setZoom(zoom);
    addMarkerToMap({ latitude: 0, longitude: 0 });
  }, [mapRef, zoom]);

  useEffect(() => {
    addMarker();
  });

  return <div ref={ref} style={{ width: "100vw", height: "100vh" }} />;
}

export default MapView;
