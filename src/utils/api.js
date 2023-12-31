// utils/api.js
import Overlay from "ol/Overlay.js";
import { fromLonLat } from "ol/proj.js";
import { createPopper } from "@popperjs/core";

export const addMarkerToMap = (map, coord) => {
  const marker = document.createElement("div");
  marker.innerHTML = '<img src="https://i.imgur.com/tCxXAkm.png" />';
  marker.className = "marker";

  marker.setAttribute("data-name", coord.name);

  const tooltip = document.createElement("div");
  tooltip.className = "tooltip";
  tooltip.textContent = coord.name;
  tooltip.style.display = "none";

  tooltip.style.color = "white";
  tooltip.style.textShadow = "0 0 5px black, 0 0 5px black, 0 0 5px black";

  marker.appendChild(tooltip);

  const markerOverlay = new Overlay({
    position: fromLonLat([coord.longitude, coord.latitude]),
    positioning: "center-center",
    element: marker,
    stopEvent: false,
  });

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

  map?.addOverlay(markerOverlay);
};
