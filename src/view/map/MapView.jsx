import React, { useEffect, useRef } from "react";
import axios from "axios";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { addMarkerToMap } from "../../utils/api";
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
            addMarkerToMap(mapRef.current, coord);
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
