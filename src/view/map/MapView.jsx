import React, { useEffect, useState, useRef } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import Overlay from "ol/Overlay.js";
import { fromLonLat, transform } from "ol/proj.js";

import "./MapView.css";
import "ol/ol.css";

function MapView({zoom = 1}) {
  const ref = useRef(null);

  const mapRef = useRef(null);

  useEffect(() => {
    console.log("I'm mounting!");
    if (ref.current && !mapRef.current) {
      mapRef.current = new Map({
        layers: [new TileLayer({ source: new OSM() })],
        view: new View({ center: [0, 0], zoom: 1 }),
        target: ref.current,
      });
    }
  }, [ref, mapRef]);

  useEffect(() => {
    mapRef.current?.getView().setZoom(zoom);
  }, [mapRef, zoom]);
  return <div ref={ref} style={{ width: "100vw", height: "100vh" }} />;

}

export default MapView;
