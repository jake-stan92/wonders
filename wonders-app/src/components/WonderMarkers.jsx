import React from "react";
import { Marker, Popup, Polyline } from "react-leaflet";
import { haversineDistance } from "../helpers";

const WonderMarkers = ({ wonders, userLocation }) => {
  return wonders.map((wonder, index) => {
    let distanceAway = haversineDistance(
      [userLocation[0], userLocation[1]],
      [wonder.lat, wonder.lng]
    );
    return (
      <Marker key={index} position={[wonder.lat, wonder.lng]}>
        <Popup>
          {wonder.name}
          <br></br>
          Distance: {distanceAway}
          km
        </Popup>
        <Polyline
          positions={[userLocation, [wonder.lat, wonder.lng]]}
        ></Polyline>
      </Marker>
    );
  });
};

export default WonderMarkers;
